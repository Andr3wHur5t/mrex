import React from "react";
import PropTypes from "prop-types";

const SubmitBtn = ({ disabled, onClick, showLoader, text }) => {
  if (showLoader) {
    return (
      <button className="submit-btn-submitting" disabled>
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </button>
    );
  }

  return (
    <button className="submit-btn btn-confirm" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

SubmitBtn.defaultProps = {
  disabled: false,
  showLoader: false,
};

SubmitBtn.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showLoader: PropTypes.bool,
};

export default SubmitBtn;
