import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, showTaskForm, showAdd }) => {
  // function showTaskForm(e) {
  //     console.log(e)
  // }
  return (
    <div className="header">
      <h1>{title}</h1>
      <Button
        text={showAdd ? "Close" : "Add"}
        onClick={showTaskForm}
        color={showAdd ? "red" : "green"}
      />
    </div>
  );
};

Header.defaultProps = {
  title: " Task Tracker",
};

Header.protoTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
