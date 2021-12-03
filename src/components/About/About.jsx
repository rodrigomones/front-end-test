import React, { useEffect } from "react";
import TextAnimation from "./TextAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spiderman from "../../assets/spiderman.png";
import portrait from "../../assets/portrait.jpg";
export const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();

  useEffect(() => {
    const element = document.querySelector(".spiderman");
    tl.from(element, {
      opacity: 1,
      y: -650,
      repeat: 1,
      yoyo: true,
      scrollTrigger: {
        trigger: document.querySelector(".contenedor__animaciones"),
        start: "top top",
        end: "bottom center",
        scrub: 3,
        pin: document.querySelector(".spiderman"),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container-text",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: "+=3500",
      },
    });
  }, []);

  return (
    <div className="title">
      <TextAnimation />
      <div className="contenedor__animaciones">
        <img className="spiderman" src={spiderman} alt="spiderman" />
        <img src={portrait} alt="self portrait" className="portrait" />

        <div className="text-info">
          Hi! I'm Rodrigo, this is my proposal for the Frontend Developer
          challenge, using Marvel Api.I used the React framework, Axios to get
          the information from the Api, MD5 to get the hash, Material UI to
          solve the UI design. Styles with SASS and Styled-Components, and the
          features of React Router Dom, to implement dynamic routing in the web
          app. The animations were made with GSAP.
        </div>
        <div className="container-text">
          <section className="panel">
            <h1>"Remember, </h1>
          </section>
          <section className="panel">
            <h1>with great power</h1>
          </section>
          <section className="panel">
            <h1>comes great responsibility."</h1>
          </section>
          <section className="panel">
            <h1>Thank you!!!</h1>
            <span role="img" aria-label="sheep">
              🕸️🕷️ 🚀
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};
