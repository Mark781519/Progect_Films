import { memo } from "react";
import PropTypes from "prop-types";

const TopNavigation = ({ showForm }) => {
  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        Home
      </a>
      <span onClick={showForm} className="item">
        <i className="icon plus" />
        Add new film
      </span>
    </div>
  );
};

TopNavigation.propsTypes = {
  showForm: PropTypes.func.isRequired,
};

export default memo(TopNavigation);
