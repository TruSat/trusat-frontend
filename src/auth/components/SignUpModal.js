import React, { useState } from "react";
import LoginOptions from "../components/LoginOptions";

export default function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  const renderModal = () => {
    return (
      <div className="modal">
        <div className="overlay" onClick={() => setShowModal(false)} />
        <div className="modal_content">
          <LoginOptions />
          <button className="close_modal" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showModal ? (
        renderModal()
      ) : (
        <span onClick={() => setShowModal(true)} className="modal__join-button">
          JOIN
        </span>
      )}
    </React.Fragment>
  );
}
