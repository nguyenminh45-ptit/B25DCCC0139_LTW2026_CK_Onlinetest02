import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../../templates/AuthLayout/AuthLayout";
import LoginForm from "../../templates/loginForm/loginForm";
import Auth from "../../../helper/Auth";

class LoginPage extends React.Component {
  render() {
    if (this.props.user.isLoggedIn) {
      if (this.props.user.userDetails.type === "TEACHER")
        return <Navigate to="/homeTeacher" />;
      else return <Navigate to="/homeStudent" />;
    } else if (Auth.retriveToken() && Auth.retriveToken() !== "undefined") {
      return <Navigate to="/homeStudent" />;
    }

    return (
      <AuthLayout
        title="Sign in"
        subtitle="Use the email and password of your teacher or student account."
        footer={
          <>
            New student? <Link to="/studentRegisterPage">Create an account</Link>
          </>
        }
      >
        <LoginForm />
      </AuthLayout>
    );
  }
}

const mapStatetoProps = (state) => ({
  user: state.user,
});

export default connect(mapStatetoProps, {})(LoginPage);
