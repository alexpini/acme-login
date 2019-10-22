import React from 'react';
import { connect } from 'react-redux';
import { actions } from './store';

/* Login */
class _Login extends React.Component{
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(ev) {

    this.setState({ [ev.target.name]: ev.target.value });
  }

  async login(ev) {
    ev.preventDefault();
    await this.props.attemptLogin(this.state.username);
  }

  render(){
    const { username, password } = this.state;
    const { onChange, login } = this;
    const { attemptLogin } = this.props;
    return (
      <div>
        <div>
          <button onClick={ ()=> attemptLogin('moe')}>Login As Moe</button>
          <button onClick={ ()=> attemptLogin('lucy')}>Login As Lucy</button>
        </div>
        <div>
          <form onSubmit={ login }>
            <input name="username" value={ username } onChange={ onChange } />
            <input name="password" value={ password } onChange={ onChange } />
            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

const Login = connect(
  ()=> {
    return {

    };
  },
  (dispatch, { history })=> {
    return {
      attemptLogin: (username)=> dispatch(actions.attemptLogin(username, history))
    }
  }
)(_Login);

export default Login;
