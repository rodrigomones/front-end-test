import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function PageMissing() {
  let timer = null;
  let elems = useRef([]);
  let timeline = gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: "power3.inOut",
    },
    paused: true,
  });

  const gallery = [
    {
      title: "",
      cover:
        "https://phantom-marca.unidadeditorial.es/838d5234c7803b705c60abc334975919/resize/1320/f/jpg/assets/multimedia/imagenes/2021/07/06/16255683165037.jpg",
    },
    {
      title: "",
      cover: "https://i.ytimg.com/vi/KTxQYKFyF0U/maxresdefault.jpg",
    },
    {
      title: "",
      cover:
        "https://as01.epimg.net/meristation/imagenes/2021/11/05/noticias/1636109000_168933_1636109096_noticia_normal.jpg",
    },
    {
      title: "",
      cover:
        "https://i1.wp.com/codigoespagueti.com/wp-content/uploads/2021/08/Hazte-a-un-lado-Stan-lee-El-cameo-oculto-de-este-reportero-ha-confirmado-que-Daredevil-Punisher-y-Spider-Man-de-Sam-Raimi-forman-parte-del-MCU-compressed-2.jpg?fit=1280%2C720&quality=80&ssl=1",
    },
  ];

  const [state, setState] = useState({ current: 0, next: 1 });
  const [userDetected, setUserDetected] = useState(false);

  const activateTimer = () => {
    timer = setTimeout(() => {
      stepForward();
    }, 4000);
  };

  const calculateIndexs = (index) => {
    if (index === gallery.length - 1) {
      setState({ current: index, next: 0 });
    } else {
      setState({ current: index, next: index + 1 });
    }
  };

  const flowUp = (onComplete) => {
    timeline
      .to(elems.current[0], { y: "-100%", opacity: 0, scale: -0.5 })
      .to(
        elems.current[1],
        {
          y: "-100%",
          opacity: 1,
          scale: 1,
          onComplete,
        },
        "-=0.75"
      )
      .play();
  };

  const fadeOut = (onComplete) => {
    timeline
      .to(elems.current[0], {
        duration: 0.5,
        opacity: 0,
        onComplete,
      })
      .to(elems.current[0], { opacity: 1 })
      .play();
  };

  const handleChange = (index) => {
    if (index !== state.current) {
      clearTimeout(timer);
      setUserDetected(true);
      fadeOut(() => calculateIndexs(index));
    }
  };

  const stepForward = () => {
    setUserDetected(false);
    flowUp(() => calculateIndexs(state.next));
  };

  useLayoutEffect(() => {
    const image1 = !!elems.current[0] && elems.current[0];
    const image2 = !!elems.current[1] && elems.current[1];

    activateTimer();

    gsap.set(image2, { y: "0%", opacity: 0, scale: 1 });
    if (userDetected) {
      gsap.set(image1, { y: "0%", opacity: 0, scale: 1 });
    } else {
      gsap.set(image1, { y: "0%", opacity: 1, scale: 1 });
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // console.log(state);

  return (
    <div>
      <h2 className="header-error">Ups! page not found</h2>
      <div className="album-container">
        <div className="image">
          <img
            ref={(elem) => (elems.current[0] = elem)}
            src={gallery[state.current].cover}
            alt=""
          />
          <p>{gallery[state.current].title}</p>
        </div>
        <div className="image">
          <img
            ref={(elem) => (elems.current[1] = elem)}
            src={gallery[state.next].cover}
            alt=""
          />
          <p>{gallery[state.next].title}</p>
        </div>
        <div className="stripes">
          {gallery.map((_item, index) =>
            index === state.current ? (
              <span
                key={`stripe${index}`}
                onClick={() => handleChange(index)}
                style={{ opacity: 1 }}
              ></span>
            ) : (
              <span
                key={`stripe${index}`}
                onClick={() => handleChange(index)}
                style={{ opacity: 0.5 }}
              ></span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
