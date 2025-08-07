import React from "react";
import { useState, useEffect, useCallback } from "react";
import { getMetrics } from "./services/metricsService";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorMode, setColorMode] = useState("light");

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
      alert(`Error loading metrics: ${err.message}`);
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
    alert("Refreshing data...");
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: colorMode === "light" ? "#f9fafb" : "#1a202c",
    color: colorMode === "light" ? "#2d3748" : "white",
    padding: "24px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const cardStyle = {
    backgroundColor: colorMode === "light" ? "white" : "#2d3748",
    border: `1px solid ${colorMode === "light" ? "#e2e8f0" : "#4a5568"}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.2s",
  };

  const buttonStyle = {
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <h2 style={{ color: "#718096" }}>Loading environmental metrics...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <h2 style={{ color: "#e53e3e", marginBottom: "16px" }}>
            Failed to load metrics: {error}
          </h2>
          <button style={buttonStyle} onClick={fetchMetrics}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{ color: "#22c55e", marginBottom: "8px", fontSize: "24px" }}
          >
            🌿 Greenalytics Dashboard
          </h1>
          <p style={{ color: "#718096" }}>
            Real-time environmental impact monitoring
          </p>
        </div>
        <div>
          <button style={buttonStyle} onClick={handleRefresh}>
            🔄 Refresh
          </button>
          <button style={buttonStyle} onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"} Toggle Theme
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {metrics &&
          Object.entries(metrics).map(([key, metric]) => (
            <MetricCard
              key={key}
              metricKey={key}
              metric={metric}
              colorMode={colorMode}
              cardStyle={cardStyle}
            />
          ))}
      </div>
    </div>
  );
}

// Metric Card Component
const MetricCard = ({ metricKey, metric, colorMode, cardStyle }) => {
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
        return "#22c55e";
      case "decreasing":
        return "#ef4444";
      case "stable":
      default:
        return "#6b7280";
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

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "24px" }}>{getMetricIcon(metricKey)}</span>
          <span
            style={{
              fontSize: "14px",
              color: colorMode === "light" ? "#718096" : "#a0aec0",
              textTransform: "capitalize",
            }}
          >
            {metricKey.replace(/([A-Z])/g, " $1").trim()}
          </span>
        </div>

        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            {metric.value.toLocaleString()}
          </div>
          <div
            style={{
              color: colorMode === "light" ? "#718096" : "#a0aec0",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            {metric.unit}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: getTrendColor(metric.trend),
                color: "white",
              }}
            >
              {getTrendArrow(metric.trend)} {Math.abs(metric.change).toFixed(1)}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: colorMode === "light" ? "#a0aec0" : "#718096",
              }}
            >
              from last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
