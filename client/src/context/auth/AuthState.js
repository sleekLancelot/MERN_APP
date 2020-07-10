import React, { useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

// A custom hook to use the authContext
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//load user if token exist
export const loadUser = async dispatch => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//make the client know the media-type of the returned value is a json
const config = {
  header: {
    'Content-Type': 'application/json',
  },
};

//Login
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData, config)
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    // on login,return User details
    loadUser(dispatch)
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    })
  }
}

//register a user
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // on register,return this newUser details
    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//logout
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT })
}

//clear error
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loaded: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //setToken in the header on initial app load
  setAuthToken(state.token);

  //load user on start or on refresh
  if (!state.loaded && state.token) loadUser(dispatch);

  //watch the token,reset if it changes
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
