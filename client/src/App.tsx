import React from "react"
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Stack,
  Heading,
} from "@chakra-ui/react"

import { ColorModeSwitcher } from "./ColorModeSwitcher"
import TokenInput from "./components/TokenInput";
import ConfigViewer from "./components/ConfigViewer";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        padding={3}
        marginBottom={3}
        justifyContent='space-between'
      >
        <Heading>Buddy Bot 🤝</Heading>
        <ColorModeSwitcher />
      </Flex>
      <Box fontSize="xl" padding={3}>
        <Stack spacing={5}>
          <TokenInput />
          <ConfigViewer />
        </Stack>
      </Box>
    </ChakraProvider>
  )
}
