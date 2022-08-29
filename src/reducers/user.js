import { LOGIN_FAILURE,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESS,
  FETCH_MY_PROFILE_DETAIL_FAILURE,
  FETCH_MY_PROFILE_DETAIL_REQUESTED,
  FETCH_MY_PROFILE_DETAIL_SUCCESS } from '../actions/user-action-types';

const initialState = {
  fetchProfileStatus: 'pending',
  loginStatus: 'pending',
  logoutStatus: 'pending',
  token: null,
  userDetail: {},
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case FETCH_MY_PROFILE_DETAIL_FAILURE:
      return {
        ...state,
        fetchProfileStatus: 'failure',
      };

    case FETCH_MY_PROFILE_DETAIL_REQUESTED:
      return {
        ...state,
        fetchProfileStatus: 'logout',
      };

    case FETCH_MY_PROFILE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchProfileStatus: 'success',
        userDetail: {
          ...state.userDetail,
          ...payload,
        },
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loginStatus: 'failure',
      };

    case LOGIN_REQUESTED:
      return {
        ...state,
        loginStatus: 'logging',
        userDetail: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        loginStatus: 'success',
        token: payload ? payload.access_token : null,
        userDetail: payload || {},
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutStatus: 'failure',
      };

    case LOGOUT_REQUESTED:
      return {
        ...state,
        logoutStatus: 'logout',
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutStatus: 'success',
        token: null,
        userDetail: {},
      };

    default:
      return state;
  }
}
