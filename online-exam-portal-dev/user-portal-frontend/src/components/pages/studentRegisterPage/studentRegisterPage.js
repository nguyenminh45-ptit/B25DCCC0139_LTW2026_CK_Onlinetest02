import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../templates/AuthLayout/AuthLayout";
import StudentRegisterForm from "../../templates/studentRegisterForm/studentRegisterForm";

const StudentRegisterPage = () => (
  <AuthLayout
    title="Create student account"
    subtitle="Teachers are added by the admin, so this form is for students only."
    footer={
      <>
        Already have an account? <Link to="/">Sign in</Link>
      </>
    }
  >
    <StudentRegisterForm />
  </AuthLayout>
);

export default StudentRegisterPage;
