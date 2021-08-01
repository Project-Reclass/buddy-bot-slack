import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, Button, Spinner, Box, Text } from '@chakra-ui/react';

import { useTestAuthToken } from '../common/api/auth-test';

const TokenInput = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState('');

  const handleClick = () => setShow(!show);

  const { data } = useTestAuthToken(token);

  return (
    <Box>
      <Text mb='8px'>Slack API token</Text>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={'text'}
          placeholder="xoxb-**********************"
          onChange={e => setToken(e.currentTarget.value)}
          value={show ? token : '*'.repeat(token.length) }
          disabled={!show}
        />
        <InputRightElement width="5rem">
          <Flex justifyContent='space-between' width='100%'>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Save" : "Edit"}
            </Button>
            <Box margin='auto 0.45rem'>
              {
                data?.ok ? <CheckIcon color="green.500" /> :
                (data?.ok !== undefined && !data.ok) ? <WarningIcon color="red.500" /> :
                <Spinner />
              }
            </Box>
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default TokenInput;