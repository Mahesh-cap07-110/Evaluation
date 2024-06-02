import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast } from '@chakra-ui/react';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    onOpen();
  };

  const confirmAddToCart = () => {
    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Box p={8}>
      <Flex justifyContent="center">
        <Box maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" p={6}>
          <Heading mb={4}>{product.title}</Heading>
          <Text mb={2}>Category: {product.category}</Text>
          <Text mb={2}>Price: ${product.price}</Text>
          <Text mb={4}>{product.description}</Text>
          <Button colorScheme="blue" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Flex>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add to Cart
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to add this item to cart?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={confirmAddToCart} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetailsPage;