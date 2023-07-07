import PropTypes from 'prop-types';
import React from 'react';
import '../styles/components/errorMessage.css'

export default function ErrorMessage({ requestErrorMessage = null }) {
  return (
    <div className="error-message">
      <span>
        {requestErrorMessage}
      </span>
    </div>
  );
}

ErrorMessage.propTypes = {
  requestErrorMessage: PropTypes.string.isRequired,
};