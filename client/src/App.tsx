import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Spacer,
  Spinner,
} from "@chakra-ui/react"
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';

import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { useTestAuthToken } from "./common/api/auth-test";
import { useState } from "react";

export const App = () => {
  const [show, setShow] = React.useState(false);
  const [token, setToken] = useState('');
  const [delayedToken, setDelayedToken] = useState(token);

  const handleClick = () => setShow(!show);

  const { data, isLoading } = useTestAuthToken(token);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={e => setToken(e.currentTarget.value)}
              value={token}
            />
            <InputRightElement width="10rem">
              <Flex justifyContent='space-between'>
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
                {
                  data?.ok ? <CheckIcon color="green.500" /> :
                  (data?.ok !== undefined && !data.ok) ? <WarningIcon color="red.500" /> :
                  <Spinner />
                }
                
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
