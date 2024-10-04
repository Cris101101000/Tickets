import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IntegrationManagement = () => {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const { data } = await axios.get('/api/integrations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIntegrations(data);
    } catch (error) {
      console.error('Error fetching integrations:', error);
    }
  };

  const handleDeleteIntegration = async (id) => {
    try {
      await axios.delete(`/api/integrations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchIntegrations();
    } catch (error) {
      console.error('Error deleting integration:', error);
    }
  };

  return (
    <Container>
      <List>
        {integrations.map((integration) => (
          <ListItem key={integration._id}>
            <ListItemText primary={integration.name} />
            <IconButton edge="end" onClick={() => handleDeleteIntegration(integration._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default IntegrationManagement;
