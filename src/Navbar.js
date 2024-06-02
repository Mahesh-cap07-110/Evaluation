import React, { useContext } from 'react';
import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated, logoutUser, email } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Box bg="gray.100" py={4}>
      <Flex alignItems="center" justifyContent="space-between" mx={8}>
        {isAuthenticated ? (
          <>
            <Text>Logged in as: {email}</Text>
            <Flex>
              <Link to="/home">
                <Button mr={4}>Home</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;