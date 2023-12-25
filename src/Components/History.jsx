import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Box from '@mui/material/Box';
import axios from 'axios';
import './History.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#BB86FC',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '90%',
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

  const handleDownload = (entry) => {
    const textData = `
      Identification Number: ${entry.identificationNumber}
      Name: ${entry.name}
      Last Name: ${entry.lastName}
      Date-Of-Birth: ${new Date(entry.dob).toLocaleDateString()}
      Date-Of-Issue: ${new Date(entry.doi).toLocaleDateString()}
      Date-Of-Expiry: ${new Date(entry.doe).toLocaleDateString()}
  `;
  
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entry.identificationNumber}_entry.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-history">
      {/* Top Section */}
      <div className="top-history d-flex justify-content-around">Records</div>

      {/* Bottom Section */}
      <div className="middle-history">
        <Box className="part-history">
          <Stack
            justifyContent='space-around'
            alignItems='center'
            direction={{ xs: 'column', sm: 'column' }}
            spacing={{ xs: 2, sm: 2, md: 2 }}
          >
            {entries.map(entry => (
              <Item key={entry.id} className="paper-item-history">
                <Stack
                  justifyContent='space-around'
                  direction={{ xs: 'column', sm: 'row' }}
                  divider={<Divider orientation="horizontal" flexItem />}
                  spacing={1}
                >
                  <Item className="item-text-history">Identification Number: {entry.identificationNumber}</Item>
                  <Item className="item-text-history">Name: {entry.name}</Item>
                  <Item className="item-text-history">Last Name: {entry.lastName}</Item>
                  <Item className="item-text-history">Date-Of-Birth: {new Date(entry.dob).toLocaleDateString()}</Item>
                  <Item className="item-text-history">Date-Of-Issue: {new Date(entry.doi).toLocaleDateString()}</Item>
                  <Item className="item-text-history">Date-Of-Expiry: {new Date(entry.doe).toLocaleDateString()}</Item>
                  <Item className="download-icon-history">
                    <DownloadOutlinedIcon onClick={() => handleDownload(entry)} />
                  </Item>
                  <Item className="delete-icon-history">
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