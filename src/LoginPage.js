import React, { useContext, useRef, useEffect } from 'react';
import { Box, Flex, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const emailRef = useRef(null);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    try {
      const email = emailRef.current.value;
      const password = document.getElementById('password').value;

      const response = await axios.post('https://dummyjson.com/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        loginUser(response.data.token, email);
        navigate('/home');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred while logging in',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Login</Heading>
        <Input mb={4} placeholder="Email" ref={emailRef} />
        <Input mb={4} placeholder="Password" id="password" type="password" />
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default LoginPage;