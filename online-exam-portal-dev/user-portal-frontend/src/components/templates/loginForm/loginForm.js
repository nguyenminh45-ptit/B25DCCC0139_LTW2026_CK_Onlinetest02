import React from "react";
import { connect } from "react-redux";
import { loginRequestAction } from "../../../redux/actions/loginAction";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  emailInputHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordInputHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.loginRequestAction(this.state);
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={this.state.email}
            onChange={this.emailInputHandler}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.passwordInputHandler}
            required
          />
        </div>
        <button type="submit" className="auth-submit">
          Sign in
        </button>
      </form>
    );
  }
}

const mapStatetoProps = (state) => ({
  state: state.user,
});

export default connect(mapStatetoProps, {
  loginRequestAction,
})(LoginForm);
