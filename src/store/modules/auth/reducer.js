import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signedIn: false,
  loading: false,
  profile: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signedIn = true;
        draft.loading = false;
        draft.profile = action.payload.user;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signedIn = false;
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
