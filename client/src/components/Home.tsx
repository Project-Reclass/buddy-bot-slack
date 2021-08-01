import React from 'react';
import { Box, Stack } from '@chakra-ui/layout';

import TokenInput from './TokenInput';
import ConfigViewer from './ConfigViewer';

const Home = () => (
  <Box fontSize="xl" padding={3}>
    <Stack spacing={5}>
      <TokenInput />
      <ConfigViewer />
    </Stack>
  </Box>
);

export default Home;
