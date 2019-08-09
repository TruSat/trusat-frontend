import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function EmailForm() {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div>
      {showSignupForm ? <SignupForm /> : null}
      {showLoginForm ? <LoginForm /> : null}
      {showLoginForm || showSignupForm ? null : (
        <div>
          <span onClick={() => setShowSignupForm(true)}>Sign Up</span>
          <span onClick={() => setShowLoginForm(true)}>Login</span>
        </div>
      )}
    </div>
  );
}
