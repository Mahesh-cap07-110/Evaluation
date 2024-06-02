import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius={8}
      boxShadow="md"
      key={product.id}
    >
      <Heading size="md" mb={2}>
        {product.title}
      </Heading>
      <Text mb={2}>Category: {product.category}</Text>
      <Text mb={4}>Price: ${product.price}</Text>
      <Link to={`/product/${product.id}`}>
        <Button colorScheme="blue">More Details</Button>
      </Link>
    </Box>
  );
};

export default ProductCard;