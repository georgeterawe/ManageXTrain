import React, { useState } from 'react';

function TestError() {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true); // Trigger a state update to cause a re-render
  };

  if (hasError) {
    // Throw the error during rendering
    throw new Error('Test error!');
  }

  return <button onClick={throwError}>Throw Error</button>;
}

export default TestError;
