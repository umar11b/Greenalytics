# Greenalytics Frontend

A modern, responsive React dashboard for environmental metrics monitoring built with Chakra UI.

## Features

- 🌿 **Environmental Metrics Dashboard** - Real-time monitoring of carbon footprint, energy consumption, water usage, and more
- 🎨 **Modern UI/UX** - Clean, responsive design with Chakra UI components
- 🌙 **Dark Mode Toggle** - Switch between light and dark themes
- 📊 **Interactive Metrics Cards** - Visual indicators for trends and changes
- 🔄 **Real-time Data** - API integration with fallback to static data
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔔 **Toast Notifications** - User-friendly error handling and status updates

## Environmental Metrics

The dashboard displays the following environmental metrics:

- **Carbon Footprint** - CO2 emissions in kg CO2e
- **Energy Consumption** - Power usage in kWh
- **Water Usage** - Water consumption in liters
- **Waste Production** - Waste generation in kg
- **Renewable Energy** - Percentage of renewable energy usage
- **Air Quality** - Air Quality Index (AQI)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file in the frontend directory to configure the API endpoint:

```env
VITE_API_URL=https://your-api-endpoint.com
```

If no API URL is provided, the app will use mock data.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **React 19** - Latest React with hooks
- **Chakra UI** - Modern component library
- **Vite** - Fast build tool
- **React Icons** - Icon library
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard component
│   └── MetricCard.jsx     # Individual metric card
├── services/
│   └── metricsService.js  # API and data handling
├── App.jsx                # Root component
├── main.jsx              # Entry point
├── theme.js              # Chakra UI theme configuration
└── index.css             # Global styles
```

## API Integration

The app is designed to work with a REST API that returns environmental metrics. The expected API response format:

```json
{
  "carbonFootprint": {
    "value": 245.6,
    "unit": "kg CO2e",
    "trend": "decreasing",
    "change": -12.3
  },
  "energyConsumption": {
    "value": 1250.8,
    "unit": "kWh",
    "trend": "stable",
    "change": 2.1
  }
  // ... other metrics
}
```

## Deployment

The app is ready for deployment to any static hosting service:

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
