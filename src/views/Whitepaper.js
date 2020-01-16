import React from "react";

export default function Whitepaper() {
  return (
    <div className="pdf__wrapper">
      <iframe
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://trusat-assets.s3.amazonaws.com/TruSat+White+Paper_v3.0.pdf"
        type="application/pdf"
        width="100%"
        height="850"
      />
    </div>
  );
}
