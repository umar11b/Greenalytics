import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Spinner, Text, Alert, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import MetricsChart from "../components/MetricsChart";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
console.log("API_URL:", API_URL);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/metrics`)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch metrics data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retry]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <WarningIcon />
        {error}
        <Button ml={4} onClick={() => setRetry((r) => r + 1)}>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Box p={4}>
      {data ? <MetricsChart data={data} /> : <Text>No data available</Text>}
    </Box>
  );
};

export default Dashboard;
