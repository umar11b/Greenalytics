import { Box, Text, VStack } from "@chakra-ui/react";

const MetricsChart = ({ data }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">
        Metrics Data
      </Text>
      <Box p={4} borderWidth={1} borderRadius="md">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </VStack>
  );
};

export default MetricsChart;
