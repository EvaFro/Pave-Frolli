import { Box, Center } from "@chakra-ui/react";

import LineChart from "./chart";

export default function App() {
  return (
    <Box>
      <Center fontWeight="bold">Restaurant Group of San Francisco</Center>
      <Center fontWeight="semibold">Compensation Bands</Center>
      <LineChart />
    </Box>
  );
}
