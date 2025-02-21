import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import managexAxios from '../services/api';

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Convert expiration time to milliseconds
  } catch (error) {
    return true; // If decoding fails, assume token is expired
  }
};
// const logoutApiCall = async () => {
//   try {
//     const sessionId = localStorage.getItem('sessionId');
//     const response = await managexAxios.post('/auth/logout', sessionId);

//   } catch (err) {
//     console.log(err);
//   }
// }

// Read token and expiration from localStorage
const storedToken = localStorage.getItem('token');
const storedExpiration = localStorage.getItem('tokenExpiration');

const initialState = {
  isAuthenticated: !!storedToken && !isTokenExpired(storedToken), // Set to true only if valid
  user: storedToken ? JSON.parse(localStorage.getItem('user')) : null,
  token: storedToken,
  tokenExpiration: storedExpiration ? new Date(parseInt(storedExpiration)) : null,
};

// If token is expired at app start, remove from localStorage
if (storedToken && isTokenExpired(storedToken)) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpiration');
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Decode token to get expiration time
      const decodedToken = jwtDecode(action.payload.token);
      const tokenExpiration = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

      state.tokenExpiration = tokenExpiration;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      if (tokenExpiration) {
        localStorage.setItem('tokenExpiration', tokenExpiration.getTime()); // Store as timestamp
      }
    },

    logout: (state) => {
      // logoutApiCall();
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiration = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('sessionId');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
