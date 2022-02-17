import React, { useState, useEffect } from "react";
import "./Landing.css";
const Timer = (props) => {
  const { checkWon } = props;
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [timetaken, setTimeTaken] = useState("");
  const [timeover, setTimeOver] = useState(false);
  const [isdraggable, setDraggable] = useState("false");
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function toggle() {
    setIsActive(!isActive);
    setDraggable(isdraggable ? true : false);
  }
  function stop() {
    setTimeTaken(15 - seconds);
    setIsActive(false);
    setStopped(true);
    setSeconds(timetaken);
    setDraggable(false);
    setGameOver(true);
    setWon(checkWon);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) =>
          seconds > 0 ? seconds - 1 : setTimeOver(true)
        );
        setDraggable(timeover ? false : isdraggable);
        setGameOver(timeover ? true : gameover);
      }, 3000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="timer">
      {!gameover && !isActive ? <h1>Lets Start</h1> : ""}
      {!gameover && !isActive ? (
        <button className="button" onClick={toggle}>
          Start
        </button>
      ) : (
        ""
      )}
      {isActive ? (
        <button className="button" onClick={stop}>
          Stop
        </button>
      ) : (
        ""
      )}
      <h2 className="timeover">
        {timeover
          ? "YOU LOST"
          : `
            ${
              stopped
                ? ` ${won ? "Congrats! YOU WON!" : "YOU LOST"}`
                : "Time Left"
            }
            ${stopped ? " " : `${seconds} s`}`}
      </h2>
    </div>
  );
};

export default Timer;
