import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Table, Thead, Tr, Th, Tbody, Td, Heading, useDisclosure } from '@chakra-ui/react';

import { Channel, Config } from '../common/types';
import { useConfig, useUpdateConfig } from '../common/api/config';

import ConfigEditor from './ConfigEditor';

const ConfigViewer = () => {
  const { data, isLoading } = useConfig();
  const updateConfig = useUpdateConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [config, setConfig] = useState<Config>([]);
  const [modalData, setModalData] = useState<Channel>({
    timezone: '',
    username: '',
    emojiIcon: '',
    channelId: '',
    jobs: [],
  });

  useEffect(() => {
    if (!isLoading && data) {
      setConfig(data);
    }
  }, [data, isLoading]);

  const handleOpenModal = (channel: Channel) => {
    setModalData(channel);
    onOpen();
  }

  const handleSave = async (channel: Channel) => {
    const updateConfigIdx = config.findIndex(c => c.channelId === channel.channelId);
    let configCopy = [...config];
    configCopy[updateConfigIdx] = channel;

    console.log({configCopy, updateConfigIdx, channel})

    if (await updateConfig.mutateAsync(configCopy)) {
      setConfig(configCopy);
      return true;
    }
    return false;
  }

  return (
    <Box>
      <Heading size='sm'>Jobs</Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Channel</Th>
            <Th>Username</Th>
            <Th isNumeric>Jobs #</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {config.map(val => (
            <Tr key={val.channelId}>
              <Td>{val.channelId}</Td>
              <Td>{val.username}</Td>
              <Td isNumeric>{val.jobs.length}</Td>
              <Td>
                <Box
                  cursor='pointer'
                  onClick={() => handleOpenModal(val) }
                >
                  <ExternalLinkIcon />
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ConfigEditor
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        {...modalData}
      />
    </Box>
  );
}

export default ConfigViewer;