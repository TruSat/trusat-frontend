import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="pdf__wrapper">
      <embed
        src="https://trusat-assets.s3.amazonaws.com/trusat.org_privacy_policy.pdf"
        type="application/pdf"
        width="100%"
        height="850"
      />
    </div>
  );
}
