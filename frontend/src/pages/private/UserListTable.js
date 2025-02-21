import React, { useState, useEffect, useRef } from 'react';
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
} from '@mui/material';
import { styled } from 'styled-components';
import managexAxios from '../../services/api';
import MainContainer from '../../components/common/MainContainer';

const StyledTableContainer = styled(TableContainer)`
  margin: 20px auto;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTableHead = styled(TableHead)`
  background-color: #1976d2;
  & th {
    color: white;
    font-weight: bold;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  &:hover {
    background-color: #e3f2fd;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`;

const PaginationContainer = styled(MainContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const observer = useRef(null);

  const USERS_PER_PAGE = 10;
  const INITIAL_VISIBLE = 7;

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await managexAxios.get('/auth/user-list', {
        params: { page, limit: USERS_PER_PAGE },
      });

      const data = response?.data.data || [];
      const total = response?.data.total || 0;

      setUsers(data);
      setVisibleUsers(data.slice(0, INITIAL_VISIBLE));
      setTotalRecords(total);
      setHasMore(page * USERS_PER_PAGE < total);
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

  useEffect(() => {
    if (!users.length) return;

    observer.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting) {
        setVisibleUsers((prev) => {
          const nextBatch = users.slice(prev.length, prev.length + 2);
          return [...prev, ...nextBatch];
        });
      }
    });

    if (observer.current && visibleUsers.length < USERS_PER_PAGE) {
      observer.current.observe(document.getElementById('loadMoreTrigger'));
    }

    return () => observer.current?.disconnect();
  }, [users, visibleUsers]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
      setVisibleUsers([]);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setVisibleUsers([]);
    }
  };

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h6" gutterBottom align="center">
        User List
      </Typography>
      {error && (
        <Typography color="error" gutterBottom align="center">
          {error}
        </Typography>
      )}
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {visibleUsers.map((user) => (
            <StyledTableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </StyledTableRow>
          ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          <tr id="loadMoreTrigger" style={{ height: '1px' }}></tr>
        </TableBody>
      </Table>
      <PaginationContainer>
        <StyledButton
          variant="contained"
          disabled={page === 1 || loading}
          onClick={handlePreviousPage}
        >
          Previous
        </StyledButton>
        <Typography variant="body1">
          Page {page} of {Math.ceil(totalRecords / USERS_PER_PAGE)} (Total: {totalRecords} users)
        </Typography>
        <StyledButton variant="contained" disabled={!hasMore || loading} onClick={handleNextPage}>
          Next
        </StyledButton>
      </PaginationContainer>
    </StyledTableContainer>
  );
};

export default UserListTable;
