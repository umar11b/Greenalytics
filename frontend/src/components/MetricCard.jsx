import { Box, Text, Flex } from "@chakra-ui/react";
import {
  FaLeaf,
  FaBolt,
  FaTint,
  FaTrash,
  FaSolarPanel,
  FaWind,
} from "react-icons/fa";

const getMetricIcon = (metricKey) => {
  const icons = {
    carbonFootprint: FaLeaf,
    energyConsumption: FaBolt,
    waterUsage: FaTint,
    wasteProduction: FaTrash,
    renewableEnergy: FaSolarPanel,
    airQuality: FaWind,
  };
  return icons[metricKey] || FaLeaf;
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

const MetricCard = ({ metricKey, metric, colorMode }) => {
  const IconComponent = getMetricIcon(metricKey);
  const trendColor = getTrendColor(metric.trend);
  const trendArrow = getTrendArrow(metric.trend);

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      borderRadius="lg"
      p={6}
      shadow="md"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Flex direction="column" gap={4}>
        <Flex align="center" justify="space-between">
          <IconComponent
            style={{
              color: "#22c55e",
              fontSize: "24px",
            }}
          />
          <Text
            fontSize="sm"
            color={colorMode === "light" ? "gray.500" : "gray.400"}
            textTransform="capitalize"
          >
            {metricKey.replace(/([A-Z])/g, " $1").trim()}
          </Text>
        </Flex>

        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            {metric.value.toLocaleString()}
          </Text>
          <Text
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            fontSize="sm"
            mb={2}
          >
            {metric.unit}
          </Text>
          <Flex align="center" gap={2}>
            <Box
              px={2}
              py={1}
              borderRadius="md"
              fontSize="xs"
              fontWeight="medium"
              bg={trendColor}
              color="white"
            >
              {trendArrow} {Math.abs(metric.change).toFixed(1)}
            </Box>
            <Text
              fontSize="xs"
              color={colorMode === "light" ? "gray.500" : "gray.400"}
            >
              from last month
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MetricCard;
