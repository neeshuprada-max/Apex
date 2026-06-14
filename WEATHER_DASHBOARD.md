# Weather Dashboard Feature

## Overview
A comprehensive weather dashboard that fetches real-time weather data from OpenWeatherMap API. Features include current weather display, 5-day forecast, city search, geolocation support, and temperature unit conversion.

## Features

### ✅ Current Weather Display
- Real-time temperature in Celsius/Fahrenheit
- "Feels like" temperature
- Weather condition with icon
- Location display

### ✅ Detailed Metrics
- Humidity percentage
- Atmospheric pressure
- Wind speed (converted to km/h)
- Visibility distance

### ✅ 5-Day Forecast
- Daily temperature predictions
- Weather condition icons
- Date display
- Hover effects for interactivity

### ✅ Search Functionality
- Search by city name
- Recent searches history (last 5)
- Quick access to previously searched cities
- Error handling for invalid cities

### ✅ Temperature Conversion
- Toggle between Celsius and Fahrenheit
- All temperatures automatically converted
- Persistent unit preference

### ✅ User Experience
- Loading states with spinner
- Error messages with alerts
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Dark theme optimized for eye comfort

## Setup

### 1. Environment Variables
Create a `.env.local` file in the project root:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

### 2. Get API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add to `.env.local`

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

## API Integration

### OpenWeatherMap API Endpoints

**Current Weather:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}
```

**Forecast (5 days):**
```
https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}
```

## Data Caching

- Weather data cached for 10 minutes
- Reduces API calls and improves performance
- Stored in browser's localStorage
- Automatic refresh after cache expiration

## Temperature Conversion

**Celsius to Fahrenheit:**
```javascript
F = (C × 9/5) + 32
```

**Kelvin (API returns) to Celsius:**
```javascript
C = K - 273.15
```

## Components

### WeatherDashboard
Main component handling:
- API calls
- State management
- Search functionality
- Temperature conversion
- Data caching

### WeatherIcon
Dynamic icon display based on weather condition:
- Rain → CloudRain icon
- Cloud → Cloud icon
- Clear/Sunny → Sun icon
- Default → Cloud icon

### DetailCard
Reusable card component for displaying:
- Humidity
- Pressure
- Wind speed
- Visibility

## Error Handling

- **Invalid City**: Displays user-friendly error message
- **API Errors**: Graceful fallback to demo data
- **Network Issues**: Clear error notification
- **Missing API Key**: Demo mode enabled

## Browser Storage

**localStorage Keys:**
- `weather_dashboard_cache`: Cached weather data
- `weather_recent_searches`: Recent search history

## Performance Optimizations

✅ Lazy loading with React.lazy
✅ Memoized components to prevent re-renders
✅ Optimized animations with Framer Motion
✅ Data caching to reduce API calls
✅ Responsive images and icons
✅ Code splitting for smaller bundles

## Responsive Design

**Mobile (< 768px)**
- Single column layout
- Stacked cards
- Touch-friendly buttons

**Tablet (768px - 1024px)**
- 2-column forecast grid
- Optimized spacing

**Desktop (> 1024px)**
- Full grid layout
- 5-column forecast
- Enhanced details section

## Future Enhancements

- [ ] Hourly forecast
- [ ] Weather alerts and warnings
- [ ] Map integration
- [ ] Multiple locations comparison
- [ ] Weather history graphs
- [ ] Air quality index
- [ ] UV index display
- [ ] Precipitation probability
- [ ] Sunrise/Sunset times
- [ ] Dark/Light theme toggle
- [ ] Push notifications for weather alerts
- [ ] Voice search functionality

## Testing

### Demo Mode
Without API key, the app runs in demo mode with mock data for:
- Kambil
- Any searched city

### API Key Setup
To use real data:
1. Set `VITE_WEATHER_API_KEY` in `.env.local`
2. Restart development server
3. Dashboard will fetch live data

## Troubleshooting

### "City not found" error
- Check spelling of city name
- Try alternate city names
- Ensure API key is valid

### No data displaying
- Verify API key in environment variables
- Check browser console for errors
- Ensure internet connection
- Try refreshing the page

### Slow loading
- Clear browser cache
- Check API rate limits (Free tier: 60 calls/min)
- Verify network speed

## API Rate Limits

**Free Tier:**
- 60 calls/minute
- 1,000,000 calls/month

**Pro Tier:**
- Higher limits with subscription

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check troubleshooting section
2. Review OpenWeatherMap documentation
3. Check browser console for errors
4. Open an issue on GitHub

---

**Weather Dashboard** - Built with React, Tailwind CSS, and Framer Motion 🌤️
