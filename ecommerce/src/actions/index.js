//const domain = 'https://www.kod3rsstore.com';
const domain = 'http://localhost:8000';

export const addToCart = payload => ({
  type: 'ADD_TO_CART',
  payload,
});
export const deleteFromCart = payload => ({
  type: 'DELETE_FROM_CART',
  payload,
});
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => {
        document.cookie = `email=${data.user.userEmail}`;
        document.cookie = `name=${data.user.userName}`;
        document.cookie = `id=${data.user.id}`;
        document.cookie = `token=${data.token}`;

        dispatch(registerRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};


export const loginUser = ({ email, password, rememberMe }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
      data: {
        rememberMe,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.email}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `id=${data.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};
export const logoutUser = (payload) => {
  return (dispatch) => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    dispatch(logoutRequest(payload));
  };
};
export const loginUserGoogle = (redirectUrl) => {
  window.location.href = `${domain}/auth/google-oauth`;
};