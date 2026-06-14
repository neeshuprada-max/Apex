import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Search, Loader, AlertCircle, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
const WEATHER_CACHE_KEY = 'weather_dashboard_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const WeatherIcon = ({ weatherMain, size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const iconClass = sizes[size];
  const weatherMain_lower = weatherMain?.toLowerCase() || '';

  if (weatherMain_lower.includes('rain')) {
    return <CloudRain className={`${iconClass} text-blue-400`} />;
  } else if (weatherMain_lower.includes('cloud')) {
    return <Cloud className={`${iconClass} text-gray-400`} />;
  } else if (weatherMain_lower.includes('clear') || weatherMain_lower.includes('sunny')) {
    return <Sun className={`${iconClass} text-yellow-400`} />;
  }
  return <Cloud className={`${iconClass} text-gray-300`} />;
};

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState('Kambil');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weather_recent_searches');
    return saved ? JSON.parse(saved) : [];
  });

  // Convert temperature
  const convertTemp = (kelvin) => {
    const celsius = kelvin - 273.15;
    return isCelsius ? Math.round(celsius) : Math.round((celsius * 9/5) + 32);
  };

  const getTempUnit = () => isCelsius ? '°C' : '°F';

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (OPENWEATHER_API_KEY === 'demo') {
        // Mock data for demo
        setCurrentWeather({
          name: cityName,
          main: {
            temp: 298.15,
            feels_like: 297,
            humidity: 65,
            pressure: 1013
          },
          weather: [{ main: 'Partly Cloudy', description: 'partly cloudy' }],
          wind: { speed: 5.5 },
          visibility: 10000,
          sys: { sunrise: 1623758400, sunset: 1623811200 }
        });
        setForecast([]);
        setCity(cityName);
      } else {
        // Real API call
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}`
        );

        if (!currentRes.ok) {
          throw new Error('City not found');
        }

        const currentData = await currentRes.json();
        setCurrentWeather(currentData);
        setCity(currentData.name);

        // Fetch forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OPENWEATHER_API_KEY}`
        );
        const forecastData = await forecastRes.json();
        setForecast(forecastData.list.slice(0, 5));

        // Cache the data
        const cacheData = {
          current: currentData,
          forecast: forecastData.list.slice(0, 5),
          timestamp: Date.now()
        };
        localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cacheData));
      }

      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [cityName, ...prev.filter(s => s !== cityName)].slice(0, 5);
        localStorage.setItem('weather_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with default city
  useEffect(() => {
    fetchWeather('Kambil');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
    }
  };

  const handleRecentSearch = (searchCity) => {
    fetchWeather(searchCity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
            <Cloud className="w-10 h-10" />
            Weather Dashboard
          </h1>
          <p className="text-blue-200">Get real-time weather updates for any location</p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="mb-8"
        >
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-400/30 focus:border-blue-400 focus:outline-none transition-all"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-blue-300" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
            <button
              type="button"
              onClick={() => setIsCelsius(!isCelsius)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all"
            >
              {isCelsius ? '°C' : '°F'}
            </button>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() => handleRecentSearch(search)}
                  className="px-3 py-1 bg-blue-600/50 hover:bg-blue-500/70 text-blue-100 text-sm rounded transition-all"
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </motion.form>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Weather */}
        <AnimatePresence>
          {currentWeather && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-2xl border border-blue-500/30">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left side - Main weather info */}
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5" />
                      <h2 className="text-3xl font-bold">{city}</h2>
                    </div>
                    <div className="mb-6">
                      <WeatherIcon weatherMain={currentWeather.weather[0]?.main} size="xl" />
                    </div>
                    <p className="text-blue-200 capitalize text-lg mb-4">
                      {currentWeather.weather[0]?.description}
                    </p>
                    <div className="text-6xl font-bold mb-2">
                      {convertTemp(currentWeather.main.temp)}{getTempUnit()}
                    </div>
                    <p className="text-blue-300">
                      Feels like {convertTemp(currentWeather.main.feels_like)}{getTempUnit()}
                    </p>
                  </div>

                  {/* Right side - Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <DetailCard
                      icon={<Droplets className="w-6 h-6" />}
                      label="Humidity"
                      value={`${currentWeather.main.humidity}%`}
                    />
                    <DetailCard
                      icon={<Gauge className="w-6 h-6" />}
                      label="Pressure"
                      value={`${currentWeather.main.pressure} mb`}
                    />
                    <DetailCard
                      icon={<Wind className="w-6 h-6" />}
                      label="Wind Speed"
                      value={`${(currentWeather.wind.speed * 3.6).toFixed(1)} km/h`}
                    />
                    <DetailCard
                      icon={<Eye className="w-6 h-6" />}
                      label="Visibility"
                      value={`${(currentWeather.visibility / 1000).toFixed(1)} km`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forecast */}
        {forecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-700/50 rounded-lg p-4 text-white text-center hover:bg-blue-600/70 transition-all border border-blue-500/30"
                >
                  <p className="text-sm text-blue-200 mb-3">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="flex justify-center mb-3">
                    <WeatherIcon weatherMain={day.weather[0]?.main} size="md" />
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    {convertTemp(day.main.temp)}{getTempUnit()}
                  </p>
                  <p className="text-xs text-blue-300 capitalize">
                    {day.weather[0]?.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div className="bg-blue-600/30 rounded-lg p-4 border border-blue-500/20">
    <div className="flex items-center gap-2 mb-2 text-blue-300">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default WeatherDashboard;
