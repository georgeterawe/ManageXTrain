import React, { useState } from 'react';
// import { AiFillAlipaySquare } from "react-icons/ai";

function TestError() {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true); // Trigger a state update to cause a re-render
  };

  if (hasError) {
    // Throw the error during rendering
    throw new Error('Test error!');
  }

  return (
    <>
      {/* <AiFillAlipaySquare /> */}
      <button onClick={throwError}>Throw Error</button>
    </>
  );
}

export default TestError;
