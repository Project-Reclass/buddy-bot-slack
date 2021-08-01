import React from 'react';
import { Flex, Heading } from '@chakra-ui/layout';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useAuthContext } from './AuthProvider';
import { Avatar, Divider, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';

const Header = () => {
  const { isLoggedIn, avatarUrl, username, setValues } = useAuthContext();
  return (
    <Flex
      padding={3}
      marginBottom={3}
      justifyContent='space-between'
    >
      <Heading>Buddy Bot 🤝</Heading>
      <Flex>
        {isLoggedIn &&
          <Menu>
            <MenuButton as={Avatar}
              name={username}
              src={avatarUrl}
              cursor='pointer'
            />
            <MenuList>
              <MenuGroup title={`Signed in as ${username}`}>
                <Divider />
                <MenuItem onClick={() => {
                  localStorage.removeItem('oauth-key');
                  setValues(prevValues => ({
                    ...prevValues,
                    isLoggedIn: false,
                  }))
                }}>
                  Sign out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        }
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export default Header;