import { Box, Heading, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { FaSun, FaMoon, FaRedo } from "react-icons/fa";
import { getMetrics } from "../services/metricsService";
import MetricCard from "./MetricCard";

const Dashboard = () => {
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
      // Simple alert for now since toast is not available
      alert(`Error loading metrics: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Dashboard component mounted");
    fetchMetrics();
  }, [fetchMetrics]);

  const handleRefresh = () => {
    fetchMetrics();
    alert("Refreshing data...");
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  console.log(
    "Dashboard render - loading:",
    loading,
    "error:",
    error,
    "metrics:",
    metrics
  );

  if (loading) {
    return (
      <Box textAlign="center" py={20} bg="white" minH="50vh">
        <Text fontSize="lg" color="gray.600">
          Loading environmental metrics...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={20} bg="white" minH="50vh">
        <Text color="red.500" mb={4}>
          Failed to load metrics: {error}
        </Text>
        <button
          onClick={fetchMetrics}
          style={{
            padding: "8px 16px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </Box>
    );
  }

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "white"}
      p={6}
      minH="50vh"
    >
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg" color="green.600" mb={2}>
            🌿 Greenalytics Dashboard
          </Heading>
          <Text color="gray.600">
            Real-time environmental impact monitoring
          </Text>
        </Box>
        <Flex gap={2}>
          <button
            onClick={handleRefresh}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px solid #22c55e",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#22c55e",
            }}
            title="Refresh data"
          >
            <FaRedo />
          </button>
          <button
            onClick={toggleColorMode}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px solid #22c55e",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#22c55e",
            }}
            title="Toggle color mode"
          >
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {metrics &&
          Object.entries(metrics).map(([key, metric]) => (
            <GridItem key={key}>
              <MetricCard
                metricKey={key}
                metric={metric}
                colorMode={colorMode}
              />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
