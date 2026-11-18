import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import SchoolIcon from "@material-ui/icons/School";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from "../../basic/Homepage/main.jpg";
import { MainCard } from "../Card/card";
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";
import "./dashboard.css";

class DashboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expand: "none" };
  }

  logout = () => {
    this.props.logoutUser();
    this.forceUpdate();
  };

  handleTableExpand(type) {
    this.setState((s) => ({ expand: s.expand === type ? "none" : type }));
  }

  // Nút "Show list" / "Hide list" dùng chung cho 3 thẻ
  toggleButton(type) {
    const open = this.state.expand === type;
    return (
      <button
        type="button"
        className="dash-btn dash-btn--ghost"
        aria-expanded={open}
        onClick={() => this.handleTableExpand(type)}
      >
        {open ? "Hide list" : "Show list"}
      </button>
    );
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return <div></div>;
    }

    const d = this.props.dashboardDetails;
    if (!d.retrived) {
      this.props.getDashboardCount();
    }
    const { expand } = this.state;

    let table = null;
    if (expand === "Teacher") table = <TeacherTable />;
    else if (expand === "Student") table = <StudentTable />;
    else if (expand === "Subject") table = <SubjectTable />;

    return (
      <div>
        <HomepageHeader title="Exam Portal" img={logoImg} />
        <main className="dash-page">
          <div className="dash-head">
            <div>
              <h1 className="dash-head__title">Dashboard</h1>
              <p className="dash-head__sub">Manage teachers, students and subjects.</p>
            </div>
            <button type="button" className="dash-btn dash-btn--ghost" onClick={this.logout}>
              Logout
            </button>
          </div>

          <div className="dash-grid">
            <MainCard
              title="Teachers"
              value={d.teacherActive}
              total={d.teacherActive + d.teacherBlocked}
              icon={<PersonIcon fontSize="inherit" />}
              selected={expand === "Teacher"}
            >
              <Link to="/addTeacher" className="dash-btn dash-btn--primary">Add teacher</Link>
              {this.toggleButton("Teacher")}
            </MainCard>

            <MainCard
              title="Students"
              value={d.studentActive}
              total={d.studentActive + d.studentBlocked}
              icon={<SchoolIcon fontSize="inherit" />}
              selected={expand === "Student"}
            >
              {this.toggleButton("Student")}
            </MainCard>

            <MainCard
              title="Subjects"
              value={d.subjectActive}
              total={d.subjectActive + d.subjectBlocked}
              icon={<MenuBookIcon fontSize="inherit" />}
              selected={expand === "Subject"}
            >
              <Link to="/addSubject" className="dash-btn dash-btn--primary">Add subject</Link>
              {this.toggleButton("Subject")}
            </MainCard>
          </div>

          {table && <div className="dash-table-wrap">{table}</div>}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain);
