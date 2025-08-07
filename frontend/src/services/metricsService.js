// Mock environmental metrics data
const mockMetrics = {
  carbonFootprint: {
    value: 245.6,
    unit: "kg CO2e",
    trend: "decreasing",
    change: -12.3,
  },
  energyConsumption: {
    value: 1250.8,
    unit: "kWh",
    trend: "stable",
    change: 2.1,
  },
  waterUsage: {
    value: 89.3,
    unit: "liters",
    trend: "decreasing",
    change: -8.7,
  },
  wasteProduction: {
    value: 45.2,
    unit: "kg",
    trend: "decreasing",
    change: -15.4,
  },
  renewableEnergy: {
    value: 78.5,
    unit: "%",
    trend: "increasing",
    change: 5.2,
  },
  airQuality: {
    value: 42,
    unit: "AQI",
    trend: "improving",
    change: -8,
  },
};

// API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.greenalytics.com";

export const fetchMetrics = async () => {
  try {
    // Try to fetch from API first
    const response = await fetch(`${API_BASE_URL}/metrics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.warn("API call failed, using mock data:", error.message);
    // Return mock data as fallback
    return { success: true, data: mockMetrics };
  }
};

export const getMetrics = async () => {
  try {
    const result = await fetchMetrics();
    return result;
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    throw new Error("Failed to load environmental metrics");
  }
};
