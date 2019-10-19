import React from "react";

export default function Whitepaper() {
  return (
    <div className="pdf__wrapper">
      <embed
        src="https://bitcoin.org/bitcoin.pdf"
        type="application/pdf"
        width="100%"
        height="850"
      />
    </div>
  );
}
