import { useState, useEffect } from "react";
import "./App.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
        return 0;
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, [isRunning]); // Re-run effect when isRunning changes

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const initial = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <>
      <div className="timer">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
      
      <div className="buttons">
        <button onClick={stop}>Parar</button>
        <button onClick={start}>Começar</button>
        <button onClick={initial}>Zerar</button>
      </div>
    </>
  );
}
