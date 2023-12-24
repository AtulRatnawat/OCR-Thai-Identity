import React, { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Box from '@mui/material/Box';
import axios from 'axios';
import './History.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#BB86FC',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width:'90%',
}));

export default function History() {
    const [entries, setEntries] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API
      axios.get('http://localhost:3001/api/entries')
        .then(response => setEntries(response.data))
        .catch(error => console.error(error));
    }, []);
  
    const handleDelete = (identificationNumber) => {
      console.log('Deleting entry with Identification Number:', identificationNumber);
  
      axios.delete(`http://localhost:3001/api/entries/${encodeURIComponent(identificationNumber)}`)
        .then(response => {
          console.log('Delete successful:', response.data);
          setEntries(entries.filter(entry => entry.identificationNumber !== identificationNumber));
        })
        .catch(error => console.error('Delete error:', error));
    };
  
    return (
      <div className="container-history d-flex flex-column justify-content-center ">
        {/* Top Section */}
        <div className="top d-flex justify-content-center align-items-center">Records</div>
  
        {/* Bottom Section */}
        <div className="middle">
          <Box className="part" sx={{ width: '100%', padding: '10px' }}>
            <Stack
              justifyContent='space-around'
              alignItems='center'
              direction={{ xs: 'column', sm: 'column' }}
              spacing={{ xs: 2, sm: 2, md: 2 }}
            >
              {entries.map(entry => (
                <Item key={entry.id}>
                  <Stack
                    justifyContent='space-around'
                    direction={{ xs: 'column', sm: 'row' }}
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={1}
                  >
                    <Item>Identification Number: {entry.identificationNumber}</Item>
                    <Item>Name: {entry.name}</Item>
                    <Item>Last Name: {entry.lastName}</Item>
                    <Item>Date-Of-Birth: {new Date(entry.dob).toLocaleDateString()}</Item>
                    <Item>Date-Of-Issue: {new Date(entry.doi).toLocaleDateString()}</Item>
                    <Item>Date-Of-Expiry: {new Date(entry.doe).toLocaleDateString()}</Item>
                    <Item>
                      <DeleteOutlinedIcon onClick={() => handleDelete(entry.identificationNumber)} />
                    </Item>
                  </Stack>
                </Item>
              ))}
            </Stack>
          </Box>
        </div>
      </div>
    );
}