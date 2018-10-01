import React from 'react';

const Error = () => {
  return (
    <div className="card mx-auto">
      <div className="card-header">ERROR!</div>
      <div className="card-body error-body">
        <p>
          <small>Please refresh the page or try again later, thank you</small>
        </p>
      </div>
    </div>
  );
};

export default Error;
