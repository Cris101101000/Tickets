import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.put('/api/categories', { category: newCategory }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCategories();
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await axios.delete(`/api/categories/${category}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Container>
      <TextField
        label="Nueva Categoría"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddCategory} variant="contained" color="primary" fullWidth>
        Añadir Categoría
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <ListItemText primary={category} />
            <IconButton edge="end" onClick={() => handleDeleteCategory(category)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoryManagement;
