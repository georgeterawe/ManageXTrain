import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
} from '@mui/material';
import managexAxios from '../../services/api';

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    setError(''); // Clear previous error before making a new request

    try {
      const response = await managexAxios.get('/auth/user-list', {
        params: { page, limit: 10 }, // Adjust limit as needed
      });

      const data = response?.data.data || []; // Default to an empty array if data is missing
      const total = response?.data.total || 0; // Default to 0 if total is missing
      console.log(data);
      setUsers((prev) => (page === 1 ? data : [...prev, ...data]));
      setTotalRecords(total);

      // FIX: Disable "Next" button when we reach the total number of users
      setHasMore(page * 10 < total);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom textAlign="center">
        User List
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!hasMore && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No more users to load.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" disabled={page === 1 || loading} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          Page {page} of {Math.ceil(totalRecords / 10)} (Total: {totalRecords} users)
        </Typography>
        <Button variant="contained" disabled={!hasMore || loading} onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </TableContainer>
  );
};

export default UserListTable;
