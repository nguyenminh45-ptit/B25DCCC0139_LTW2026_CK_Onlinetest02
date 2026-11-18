import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Auth from "../../../helper/Auth";
import { getUserDetails } from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";
import PortalLayout from "../../templates/PortalLayout/PortalLayout";

class TeacherHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      { title: "Home", icon: <HomeIcon fontSize="inherit" />, content: null },
      {
        title: "Add Question",
        description: "Write a new question for your question bank.",
        icon: <PostAddIcon fontSize="inherit" />,
        content: <AddQuestionForm />,
      },
      {
        title: "Questions",
        description: "Browse, search and edit your questions.",
        icon: <FormatListBulletedIcon fontSize="inherit" />,
        content: <QuestionDetails />,
      },
      {
        title: "Create Test",
        description: "Build a new test from your questions.",
        icon: <NoteAddIcon fontSize="inherit" />,
        content: <CreateTestForm />,
      },
      {
        title: "View Tests",
        description: "See the tests you have created.",
        icon: <AssignmentIcon fontSize="inherit" />,
        content: <TestDetails />,
      },
    ];
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return <div></div>;
    } else if (this.props.user.userDetails.type !== "TEACHER") {
      return <Navigate to="/" />;
    }
    return (
      <PortalLayout
        roleLabel="Teacher"
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
})(TeacherHomepage);
