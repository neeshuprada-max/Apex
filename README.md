# Apex Gaming Rentals

Premium PS4 console rental booking system for Kambil, Kannur, Kerala.

## Features

- 🎮 Real-time booking management
- 💳 Dynamic pricing (Special rates for Wed/Fri)
- 🔥 Firebase integration with local fallback
- 📱 WhatsApp integration for instant notifications
- 👤 Google Authentication support
- 📊 Admin dashboard for rental operations
- 🎨 Modern UI with Tailwind CSS & Framer Motion

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/neeshuprada-max/Apex.git
cd Apex
npm install
```

### 2. Configure Firebase
Copy `firebase-applet-config.example.json` to `firebase-applet-config.json` and add your Firebase credentials.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Technologies Used

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication)
- **Build**: Vite
- **Icons**: Lucide React
- **Integration**: WhatsApp Business API

## Features

### Booking System
- Create rental bookings with date, time, and duration
- Automatic end-time calculation
- Real-time price calculation based on day type

### Pricing
- **Special Days (Wed & Fri)**: Discounted rates
- **Normal Days**: Regular rates
- **Daily/Weekly**: Extended rental plans

### Authentication
- Google Sign-In support
- Anonymous authentication fallback
- Session persistence with Firebase

### Admin Dashboard
- View all bookings
- Update booking statuses
- Real-time statistics
- Delete booking requests

### Data Persistence
- Firebase Firestore for cloud storage
- Local Storage fallback for offline support
- Automatic sync when connection restored

## Project Structure

```
Apex/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── index.html
├── firebase-applet-config.json
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## Contact

- **Phone**: +91 77366 89545
- **Location**: Kambil, Kannur, Kerala

## License

MIT License - feel free to use this project for your own purposes.

---

**Built with ❤️ for Apex Gaming Rentals**
