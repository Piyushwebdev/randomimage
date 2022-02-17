import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import Timer from "./Timer";

function Landing() {
  const [timeleft, setTimeLeft] = useState(15);
  const [stop, setStop] = useState(false);
  const [checkWon, setCheckWon] = useState(false);
  let stringarray = [
    "image/0.jpg",
    "image/1.jpg",
    "image/2.jpg",
    "image/3.jpg",
    "image/4.jpg",
    "image/5.jpg",
    "image/6.jpg",
    "image/7.jpg",
    "image/8.jpg",
    "image/9.jpg",
  ];
  let string = [
    "image/0.jpg",
    "image/1.jpg",
    "image/2.jpg",
    "image/3.jpg",
    "image/4.jpg",
    "image/5.jpg",
    "image/6.jpg",
    "image/7.jpg",
    "image/8.jpg",
    "image/9.jpg",
  ];

  //Making of strarray
  function randomArray() {
    let strarray = [];
    let j = stringarray.length;
    for (let i = 0; i < 5; i++) {
      let x = Math.floor(Math.random() * (j - 1));
      strarray.push(stringarray[x]);
      stringarray.splice(x, 1);
      j--;
    }
    return strarray;
  }
  let strarray = randomArray();

  //DRAG AND DROP FUNCTIONS
  function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    check(data);
  }

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  function check(data) {
    strarray.map((value, i) => {
      // let box = document.getElementById(i);
      // let word = box.getElementsByTagName("img")[0].src.slice(22);
      // let compare = word.localeCompare(value);
      let compare = data.localeCompare(value);
      if (compare === 1) {
        setCheckWon(false);
        return setCheckWon(false);
      } else {
        setCheckWon(true);
      }
    });
  }

  // const handleClick = () => {
  //   if (!stop) {
  //     clearInterval(intervalRef.current);
  //   } else {
  //     intervalRef.current = setInterval(decreaseNum, 1000);
  //   }
  //   setStop((prev) => !prev);
  // };

  // const decreaseNum = () => setTimeLeft((prev) => prev - 1);
  // useEffect(() => {
  //   randomRef.current = setInterval(randomArray, 16000);
  //   return () => clearInterval(randomRef.current);
  // }, []);
  // useEffect(() => {
  //   intervalRef.current = setInterval(decreaseNum, 1000);
  //   return () => clearInterval(intervalRef.current);
  // }, []);

  // console.log(timeleft);

  return (
    <div className="client">
      <Timer check={check} checkWon={checkWon} />
      {/* <div className="timer">
          <h1>Lets Start</h1>

          <button className="button" onClick={handleClick}>
            Start
          </button>

          <button className="button" onClick={handleClick}>
            Stop
          </button>

          <h2 className="timeover">Time Left:15s</h2>
        </div> */}

      {/*JUMBLEBOX */}
      <div className="jumbleBox">
        {string.map((value) => (
          <div
            className="randomBox"
            onDrop={drop}
            onDragOver={dragOver}
            style={{
              left: Math.random() * 800 + "px",
              top: Math.random() * 100 + "px",
            }}
          >
            <img
              className="jumble_img"
              draggable="true"
              onDragStart={dragStart}
              id={value}
              src={value}
            />
          </div>
        ))}
      </div>
      <div className="arrangeBox_div">
        {strarray.map((value, i) => (
          <div
            className="arrangeBox"
            id={i}
            onDrop={drop}
            onDragOver={dragOver}
            style={{
              height: "150px",
              width: "150px",
            }}
          ></div>
        ))}
        ;
      </div>

      <div className="stringBox">
        {strarray.map((value) => (
          <div className="jumble_image_div">
            <img className="jumble_image" src={value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
