import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

/* STORE */
const store = createStore(
  combineReducers({
    auth: (state={}, action)=> {
      if(action.type === 'SET_AUTH'){
        return action.auth;
      }
      return state;
    }
  }),
  applyMiddleware(thunk)
);

const actions = {};

actions.attemptLogin = (username, history)=> {
  return async(dispatch)=> {
    const auth = (await axios.post('/api/sessions', { username })).data;
    dispatch({ type: 'SET_AUTH', auth});
    history.push('/');
  };
};

actions.attemptSessionLogin = ()=> {
  return async(dispatch)=> {
    const auth = (await axios.get('/api/sessions')).data;
    dispatch({ type: 'SET_AUTH', auth});
  };
};

actions.logout = ()=> {
  return async(dispatch)=> {
    await axios.delete('/api/sessions');
    dispatch({ type: 'SET_AUTH', auth: {}});
  };
};

export default store;
export { actions };
