import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Channel } from '../common/types';

interface Props extends Channel {
  isOpen: boolean;
  onClose: () => void;
  onSave: (channel: Channel) => Promise<boolean>;
}

const ConfigEditor = ({
  isOpen,
  onClose,
  onSave,
  ...channel
}: Props) => {
  const toast = useToast();
  const [localChannel, setLocalChannel] = useState({...channel});

  const handleUpdate = (key: string, val: any) => {
    setLocalChannel({
      ...localChannel,
      [key]: val,
    })
  }

  const handleJobUpdate = (jobIdx: number, key: string, value: any) => {
    let { jobs } = localChannel;
    jobs[jobIdx] = {
      ...jobs[jobIdx],
      [key]: value,
    };
    setLocalChannel({
      ...localChannel,
      jobs,
    })
  }

  const handleSave = async () => {
    if (await onSave(localChannel)) {
      toast({
        status: 'success',
        title: 'Saved changes!',
        position: 'top-right',
        isClosable: true,
      })
      return;
    }

    toast({
      status: 'error',
      title: 'Unable to save changes.',
      description: 'Please try again later.',
      position: 'top-right',
      isClosable: true,
    })
  }

  useEffect(() => {
    if (isOpen) {
      setLocalChannel({...channel})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      size='xl'
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit {' '}
            <Text as='kbd'>{localChannel.channelId}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Channel ID</FormLabel>
              <Input
                value={localChannel.channelId}
                onChange={e => handleUpdate('channelId', e.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Timezone</FormLabel>
              <Input
                value={localChannel.timezone}
                onChange={e => handleUpdate('timezone', e.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Emoji Icon</FormLabel>
              <Input
                value={localChannel.emojiIcon}
                onChange={e => handleUpdate('emojiIcon', e.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={localChannel.username}
                onChange={e => handleUpdate('username', e.currentTarget.value)}
              />
            </FormControl>
            {localChannel.jobs.map((job, id) => (
              <Box key={job.cronTime}>
                <Heading size='md' marginY={3}>
                  Job {(id + 1).toString()}
                  <Switch id='enabled' marginX={3} defaultChecked={true} onChange={e => {
                    const status = e.currentTarget.checked ? 'Enabled' : 'Disabled';
                    toast({
                      title: `${status} job ${(id + 1).toString()}`,
                      description: 'Please make sure to save your changes.',
                      status: 'info',
                      isClosable: true,
                      position: 'top-right',
                    })
                  }} />
                </Heading>
                <Divider />
                <FormControl mt={4}>
                  <FormLabel>Cron Time</FormLabel>
                  <Input
                    value={job.cronTime}
                    onChange={e => handleJobUpdate(id, 'cronTime', e.currentTarget.value)}
                  />
                </FormControl>
                 <FormControl mt={4}>
                  <FormLabel>Message</FormLabel>
                  <Input
                    value={job.text}
                    onChange={e => handleJobUpdate(id, 'text', e.currentTarget.value)}
                  />
                </FormControl>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue" mr={3}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}

export default ConfigEditor;