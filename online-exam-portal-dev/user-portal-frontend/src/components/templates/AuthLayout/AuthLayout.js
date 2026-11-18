import React from "react";
import AlertBox from "../../atoms/Alertbox/AlertBox";
import "./authLayout.css";

// Khung chung cho trang đăng nhập và đăng ký: nền navy, thẻ ở giữa
const AuthLayout = ({ title, subtitle, footer, children }) => (
  <div className="auth-page">
    <div className="auth-wrap">
      <div className="auth-brand">Exam Portal</div>
      <AlertBox />
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-sub">{subtitle}</p>}
        {children}
      </div>
      {footer && <p className="auth-footer">{footer}</p>}
    </div>
  </div>
);

export default AuthLayout;
