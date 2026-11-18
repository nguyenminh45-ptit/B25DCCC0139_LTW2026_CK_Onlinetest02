import React from "react";
import { connect } from "react-redux";
import { registerStudentAction } from "../../../redux/actions/registerStudentAction";
import { setAlert } from "../../../redux/actions/alertAction";

class StudentRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  // Một handler cho cả 4 ô, dựa vào thuộc tính name của input
  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      this.props.setAlert({
        isAlert: true,
        type: "error",
        title: "Invalid Input",
        message: "Confirm Password does not match",
      });
      return;
    }
    this.props.registerStudentAction({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });
  }

  field(id, name, label, type, placeholder, autoComplete) {
    return (
      <div className="auth-field">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={this.state[name]}
          onChange={this.inputHandler}
          required
        />
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        {this.field("reg-username", "username", "Username", "text", "Your full name", "name")}
        {this.field("reg-email", "email", "Email", "email", "you@example.com", "email")}
        {this.field("reg-password", "password", "Password", "password", "5 to 20 characters", "new-password")}
        {this.field("reg-confirm", "confirmPassword", "Confirm password", "password", "Enter the password again", "new-password")}
        <button type="submit" className="auth-submit">
          Create account
        </button>
      </form>
    );
  }
}

export default connect(null, {
  registerStudentAction,
  setAlert,
})(StudentRegisterForm);
