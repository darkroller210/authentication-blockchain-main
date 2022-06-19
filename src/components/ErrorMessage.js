import React from "react";
import '../bootstrap/bootstrap.min.css';
import '../bootstrap/Format.css';
function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error mt-5">
        <div className="flex-1">
          <label className="lable-error">{message}</label>
        </div>
      </div>
    );
  }

  export default ErrorMessage;
  