import React from "react";
import { connect } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AlertBox from "../../atoms/Alertbox/AlertBox";
import { logoutUser } from "../../../redux/actions/loginAction";
import "./portalLayout.css";

/*
  Khung giao diện dùng chung cho trang giáo viên và sinh viên.
  props:
    roleLabel : "Teacher" | "Student"
    username  : tên hiển thị
    menu      : [{ title, description, icon, content }]  (phần tử đầu tiên là Home, content = null)
*/
class PortalLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 0 };
  }

  initial(name) {
    const words = (name || "").trim().split(/\s+/);
    const last = words[words.length - 1] || "?";
    return last.charAt(0).toUpperCase();
  }

  renderHome() {
    const { menu, username } = this.props;
    return (
      <div className="pl-home">
        <h2 className="pl-home__hello">Welcome, {username}</h2>
        <p className="pl-home__sub">Pick a section to get started.</p>
        <div className="pl-tiles">
          {menu.slice(1).map((item, i) => (
            <button
              type="button"
              key={item.title}
              className="pl-tile"
              onClick={() => this.setState({ active: i + 1 })}
            >
              <span className="pl-tile__icon" aria-hidden="true">{item.icon}</span>
              <span className="pl-tile__title">{item.title}</span>
              <span className="pl-tile__desc">{item.description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { menu, roleLabel, username } = this.props;
    const { active } = this.state;
    const current = menu[active];

    return (
      <div className="pl-root">
        <aside className="pl-side">
          <div className="pl-brand">
            <div className="pl-brand__name">Exam Portal</div>
            <div className="pl-brand__role">{roleLabel} workspace</div>
          </div>

          <nav className="pl-nav" aria-label="Main">
            {menu.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={"pl-nav__item" + (index === active ? " pl-nav__item--active" : "")}
                aria-current={index === active ? "page" : undefined}
                onClick={() => this.setState({ active: index })}
              >
                <span className="pl-nav__icon" aria-hidden="true">{item.icon}</span>
                {item.title}
              </button>
            ))}
          </nav>

          <div className="pl-user">
            <div className="pl-user__avatar" aria-hidden="true">{this.initial(username)}</div>
            <div className="pl-user__text">
              <div className="pl-user__name" title={username}>{username}</div>
              <div className="pl-user__role">{roleLabel}</div>
            </div>
            <button
              type="button"
              className="pl-logout"
              onClick={() => this.props.logoutUser()}
              aria-label="Logout"
              title="Logout"
            >
              <ExitToAppIcon fontSize="small" />
            </button>
          </div>
        </aside>

        <main className="pl-main">
          <h1 className="pl-title">{current.title}</h1>
          <div className="pl-panel">
            <AlertBox />
            {active === 0 ? this.renderHome() : current.content}
          </div>
        </main>
      </div>
    );
  }
}

export default connect(null, { logoutUser })(PortalLayout);
