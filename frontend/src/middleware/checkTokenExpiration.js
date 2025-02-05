export const checkTokenExpiration = (store) => (next) => (action) => {
  const state = store.getState();
  const tokenExpiration = state.auth.tokenExpiration;

  if (tokenExpiration && Date.now() > tokenExpiration) {
    store.dispatch(logout()); // Log out the user if the token has expired
  }

  return next(action);
};
