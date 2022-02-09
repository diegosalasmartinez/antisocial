import { Container } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth='xl'>
      <props.element location={location} navigate={navigate}/>
    </Container>
  )
}
