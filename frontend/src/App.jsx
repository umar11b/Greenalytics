import React, { useState, useEffect, useCallback } from "react";
import { getMetrics } from "./services/metricsService";
import "./App.css";

// Professional SVG Icons Component
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    leaf: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3S21 5 17 8z"
          fill="currentColor"
        />
        <path
          d="M16 9C7 11 4.9 17.17 2.82 22.34L4.71 23l1-2.3A4.49 4.49 0 0 0 7 21C18 21 21 4 21 4S20 6 16 9z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M15 10C6 12 3.9 18.17 1.82 23.34L3.71 24l1-2.3A4.49 4.49 0 0 0 6 22C17 22 20 5 20 5S19 7 15 10z"
          fill="currentColor"
          opacity="0.1"
        />
      </svg>
    ),
    carbon: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill="currentColor"
        />
      </svg>
    ),
    co2: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill="currentColor"
        />
      </svg>
    ),
    emissions: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M8 14c-2.2 0-4-1.8-4-4s1.8-4 4-4c.6 0 1.2.1 1.7.3C10.9 4.6 12.3 4 14 4c3.3 0 6 2.7 6 6s-2.7 6-6 6H8z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M6 16c-1.1 0-2-.9-2-2s.9-2 2-2c.3 0 .6.1.8.2C7.4 11.3 8.6 11 10 11c1.7 0 3 1.3 3 3s-1.3 3-3 3H6z"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M4 18c-.6 0-1-.4-1-1s.4-1 1-1c.2 0 .3 0 .4.1C4.7 16.7 5.3 16.5 6 16.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H4z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
    lightning: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
      </svg>
    ),
    water: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
          fill="currentColor"
        />
        <path
          d="M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z"
          fill="currentColor"
        />
      </svg>
    ),
    trash: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          fill="currentColor"
        />
      </svg>
    ),
    sun: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    wind: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    refresh: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M1 4v6h6M23 20v-6h-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    moon: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="currentColor"
        />
      </svg>
    ),
    chart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M3 3v18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 17V9M12 17V5M6 17v-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trendUp: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M23 6l-9.5 9.5-5-5L1 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trendDown: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M23 18l-9.5-9.5-5 5L1 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trendNeutral: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path
          d="M1 12h22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return icons[name] || icons.chart;
};

function App() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorMode, setColorMode] = useState("dark");

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getMetrics();
      setMetrics(result.data);
      console.log("Metrics loaded:", result.data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading metrics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("App component mounted");
    fetchMetrics();
  }, [fetchMetrics]);

  // Scroll-triggered animations for chart cards
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all chart cards
    const chartCards = document.querySelectorAll('[data-animate="true"]');
    chartCards.forEach((card) => observer.observe(card));

    return () => {
      chartCards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const handleRefresh = () => {
    fetchMetrics();
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  if (loading) {
    return (
      <div className={`app ${colorMode}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading environmental metrics...</h2>
          <p>Analyzing sustainability data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`app ${colorMode}`}>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Failed to load metrics</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={fetchMetrics}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${colorMode}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <div className="logo">
              <Icon name="leaf" size={28} />
            </div>
            <div className="brand-text">
              <h1>Greenalytics</h1>
              <p>Environmental Intelligence Dashboard</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="btn-secondary" onClick={handleRefresh}>
              <Icon name="refresh" size={18} className="btn-icon" />
              Refresh
            </button>

            <div className="theme-toggle">
              <input
                type="checkbox"
                id="theme-switch"
                checked={colorMode === "dark"}
                onChange={toggleColorMode}
                className="theme-switch-input"
              />
              <label htmlFor="theme-switch" className="theme-switch-label">
                <Icon name="sun" size={16} className="theme-switch-icon" />
                <Icon name="moon" size={16} className="theme-switch-icon" />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Stats Overview */}
        <section className="stats-overview">
          <div className="stats-grid">
            {metrics &&
              Object.entries(metrics).map(([key, metric], index) => (
                <MetricCard
                  key={key}
                  metricKey={key}
                  metric={metric}
                  colorMode={colorMode}
                  index={index}
                />
              ))}
          </div>
        </section>

        {/* Additional Dashboard Sections */}
        <section className="dashboard-sections">
          <div className="section-grid">
            <div className="chart-card">
              <h3>Carbon Emissions Trend</h3>
              <div className="chart-placeholder">
                <div className="chart-line"></div>
                <div className="chart-line"></div>
                <div className="chart-line"></div>
              </div>
            </div>

            <div className="chart-card">
              <h3>Energy Consumption</h3>
              <div className="chart-placeholder">
                <div className="chart-bar"></div>
                <div className="chart-bar"></div>
                <div className="chart-bar"></div>
                <div className="chart-bar"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Enhanced Metric Card Component
const MetricCard = ({ metricKey, metric, colorMode, index }) => {
  const getMetricIcon = (key) => {
    const icons = {
      carbonFootprint: "emissions",
      energyConsumption: "lightning",
      waterUsage: "water",
      wasteProduction: "trash",
      renewableEnergy: "sun",
      airQuality: "wind",
    };
    return icons[key] || "chart";
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "increasing":
      case "improving":
        return "var(--success-color)";
      case "decreasing":
        return "var(--danger-color)";
      case "stable":
      default:
        return "var(--neutral-color)";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
      case "improving":
        return "trendUp";
      case "decreasing":
        return "trendDown";
      case "stable":
      default:
        return "trendNeutral";
    }
  };

  const getMetricTitle = (key) => {
    const titles = {
      carbonFootprint: "Carbon Footprint",
      energyConsumption: "Energy Consumption",
      waterUsage: "Water Usage",
      wasteProduction: "Waste Production",
      renewableEnergy: "Renewable Energy",
      airQuality: "Air Quality Index",
    };
    return titles[key] || key.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div
      className="metric-card"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "both",
      }}
    >
      <div className="metric-header">
        <div className="metric-icon">
          <Icon name={getMetricIcon(metricKey)} size={32} />
        </div>
        <div className="metric-title">{getMetricTitle(metricKey)}</div>
      </div>

      <div className="metric-value">
        <span className="value-number">{metric.value.toLocaleString()}</span>
        <span className="value-unit">{metric.unit}</span>
      </div>

      <div className="metric-trend">
        <div
          className="trend-indicator"
          style={{ backgroundColor: getTrendColor(metric.trend) }}
        >
          <Icon
            name={getTrendIcon(metric.trend)}
            size={16}
            className="trend-arrow"
          />
          <span className="trend-value">
            {Math.abs(metric.change).toFixed(1)}%
          </span>
        </div>
        <span className="trend-period">vs last month</span>
      </div>
    </div>
  );
};

export default App;
