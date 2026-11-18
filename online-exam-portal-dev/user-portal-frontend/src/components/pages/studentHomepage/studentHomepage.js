import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Auth from "../../../helper/Auth";
import { getUserDetails } from "../../../redux/actions/loginAction";
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";
import PortalLayout from "../../templates/PortalLayout/PortalLayout";

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      { title: "Home", icon: <HomeIcon fontSize="inherit" />, content: null },
      {
        title: "View All tests",
        description: "Browse every available test.",
        icon: <AssignmentIcon fontSize="inherit" />,
        content: <TestDetailsStudent />,
      },
      {
        title: "Upcoming Tests",
        description: "Tests you registered for that are coming up.",
        icon: <EventNoteIcon fontSize="inherit" />,
        content: <UpcomingStudentTestsDetails />,
      },
      {
        title: "Completed Tests",
        description: "Review the tests you have finished.",
        icon: <CheckCircleOutlineIcon fontSize="inherit" />,
        content: <CompletedTestsDetailsStudent />,
      },
    ];
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return <div></div>;
    } else if (this.props.user.userDetails.type !== "STUDENT") {
      return <Navigate to="/" />;
    }
    return (
      <PortalLayout
        roleLabel="Student"
        username={this.props.user.userDetails.username}
        menu={this.menu}
      />
    );
  }
}

const mapStatetoProps = (state) => ({
  user: state.user,
});

export default connect(mapStatetoProps, {
  getUserDetails,
})(StudentHomepage);
