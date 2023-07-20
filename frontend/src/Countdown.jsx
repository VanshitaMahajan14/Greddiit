import React, { useState, useEffect } from "react";

function Countdown({ onClick, label }) {
  const [buttonLabel, setButtonLabel] = useState(label);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(timer);
    };
  }, [timer]);

  const handleClick = () => {
    if (timer) {
      // User clicked again within the 3 second countdown
      clearTimeout(timer);
      setButtonLabel(label);
      setTimer(null);
    } else {
      // Start the countdown
      setButtonLabel("Cancel in 3 secs");
      setTimer(
        setTimeout(() => {
          // Countdown finished, execute the function
          setButtonLabel(label);
          setTimer(null);
          onClick();
        }, 3000)
      );
    }
  };

  return <button onClick={handleClick}>{buttonLabel}</button>;
}

export default Countdown