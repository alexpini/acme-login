import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { actions } from './store';

import Home from './Home';
import Login from './Login';

/* App */
class _App extends React.Component{
  componentDidMount(){
    this.props.attemptSessionLogin()
      .catch(ex => console.log(ex));
  }
  render(){
    const { loggedIn } = this.props;
    return (
      <div>
        <HashRouter>
          <Switch>
          {
            loggedIn && (<Route path='/' component= { Home } exact/>)
          }
          {
            !loggedIn && (<Route path='/login' component= { Login } exact/>)
          }
          {
            !loggedIn && <Redirect to='/login' />
          }
          {
            loggedIn && <Redirect to='/' />
          }
          </Switch>
        </HashRouter>
      </div>
    );
  }
};

const App = connect(
    ({ auth })=> {
      return {
        loggedIn: !!auth.id
      };
    },
    (dispatch)=> {
      return {
        attemptSessionLogin: ()=> dispatch(actions.attemptSessionLogin())
      };
    }
)(_App);

export default App;
