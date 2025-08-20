import React, { useState, useEffect, useCallback } from "react";
import { getMetrics } from "./services/metricsService";
import "./App.css";

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
              <span className="logo-icon">🌿</span>
            </div>
            <div className="brand-text">
              <h1>Greenalytics</h1>
              <p>Environmental Intelligence Dashboard</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="btn-secondary" onClick={handleRefresh}>
              <span className="btn-icon">↻</span>
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
                <span className="theme-switch-icon">☀️</span>
                <span className="theme-switch-icon">🌙</span>
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
              Object.entries(metrics).map(([key, metric]) => (
                <MetricCard
                  key={key}
                  metricKey={key}
                  metric={metric}
                  colorMode={colorMode}
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
const MetricCard = ({ metricKey, metric, colorMode }) => {
  const getMetricIcon = (key) => {
    const icons = {
      carbonFootprint: "🌿",
      energyConsumption: "⚡",
      waterUsage: "💧",
      wasteProduction: "🗑️",
      renewableEnergy: "☀️",
      airQuality: "🌬️",
    };
    return icons[key] || "📊";
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

  const getTrendArrow = (trend) => {
    switch (trend) {
      case "increasing":
      case "improving":
        return "↗";
      case "decreasing":
        return "↘";
      case "stable":
      default:
        return "→";
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
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">{getMetricIcon(metricKey)}</div>
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
          <span className="trend-arrow">{getTrendArrow(metric.trend)}</span>
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
