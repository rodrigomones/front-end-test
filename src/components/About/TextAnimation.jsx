import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function TextAnimation() {
  const mediaMonks = "Media.Monks".split("");
  const monesText = "Monés".split("");
  const [items, setItems] = useState(mediaMonks);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);

  useInterval(
    () => {
      //animation media.monks
      setItems(mediaMonks);
      setCount(count + 1);

      //animation monés, Looping
      if (count === 1) {
        setCount(0);
        setItems(monesText);
      }
    },
    play ? 6000 : null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      //Animation mediamonks after timeout
      setItems(mediaMonks);
      setPlay(true);
    }, 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper style={{ backgroundColor: "#212121" }}>
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </Wrapper>
  );
}

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
  25% { opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  75% { opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  0% { opacity: 0; transform: translateX(100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
`;

const Wrapper = styled.span`
  display: inline-block;
  span {
    font-family: "Rubik";
    font-size: calc(1200vw / 1920 * 10);
    font-weight: 400;
    color: white;
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  span:nth-child(7) {
    animation-delay: 0.7s;
  }
  span:nth-child(8) {
    animation-delay: 0.8;
  }
  span:nth-child(9) {
    animation-delay: 0.9s;
  }
  span:nth-child(10) {
    animation-delay: 1s;
  }
  span:nth-child(11) {
    animation-delay: 1.1s;
  }
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
