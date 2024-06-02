import React, { useState, useEffect } from 'react';
import { Box, Flex, Grid, Heading, Select, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from './ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const sortProducts = (products) => {
    if (sortOrder === 'ascending') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'descending') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const filterProducts = (products) => {
    if (filterCategory) {
      return products.filter((product) => product.category === filterCategory);
    }
    return products;
  };

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Box p={8}>
      <Flex mb={4} justifyContent="space-between">
        <Select placeholder="Sort by Price" onChange={handleSortChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="kids">Kids</option>
          <option value="home-decoration">Home Decor</option>
        </Select>
      </Flex>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;