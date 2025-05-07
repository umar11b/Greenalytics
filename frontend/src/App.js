import React from "react";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading mb={4}>CloudMetrics Dashboard</Heading>
        <Dashboard />
      </Box>
    </ChakraProvider>
  );
}

export default App;
