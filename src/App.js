import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from "react";
import { motion } from 'framer-motion'
import gsap from 'gsap'
function App() {

  const container = useRef(null)
  const cursor = useRef(null)

  const anim = {
    initial : {
      scale : 0,
      x : '-50%',
      y : '-50%',
      clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    },
    open : {
      scale : 1,

      x : '-50%',
      y : '-50%',
      clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      transition : {
        duration : 0.4,
        ease : [0.76, 0, 0.24, 1]
      }

    },
    closed : {
      scale : 0,

      x : '-50%',
      y : '-50%',
      clipPath : 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      transition : {
        duration : 0.4,
        ease : [0.76, 0, 0.24, 1]
      }

    }
  }

  const data = [
    {
      name : 'Guruvar Sarees',
      image : './guruvar.jpg',
      area : 'Gujarat'
    },
    {
      name : 'Faster Fix',
      image : './fasterfix.jpg',
      area : 'Haryana'
    },
    {
      name : 'Concpet Design Group',
      image : './img1.jpeg',
      area : 'Gujarat'
    },
    {
      name : 'T Square Design',
      image : './image (3).jpg',
      area : 'Gujarat'
    }


  ]

  const [ACTIVE, setACTIVE] = useState(-1)

  useEffect(() => {
    const cx = gsap.quickTo(container.current, "left", { duration : 0.8, ease : "power3" })
    const cy = gsap.quickTo(container.current, "top", { duration : 0.8, ease : "power3" })

    const cursorx = gsap.quickTo(cursor.current, "left", { duration : 0.45, ease : "power3" })
    const cursory = gsap.quickTo(cursor.current, "top", { duration : 0.45, ease : "power3" })

    window.addEventListener('mousemove', (e) => {
      cx(e.clientX)
      cy(e.clientY)

      cursorx(e.clientX)
      cursory(e.clientY)
    })

    console.log(cx)
  }, []);

  return (
    <div className="App">

      <div id="main">
        {
          data.map((e, index) => {
            return (
                <>
                <span onMouseEnter={() => { setACTIVE(index) }} onMouseLeave={() => { setACTIVE(-1) }} className="project" key={index}>
                  <h1>{e.name}</h1>
                  <h3>{e.area}</h3>
                </span>
                </>
            )
          })
        }

        <motion.div ref={container} variants={anim} initial="initial" animate={ACTIVE > -1 ? "open" : "closed"} id="slider_main">


          <div id="slider" style={{ top : ACTIVE * -100+'%' }}>


            {
              data.map((e, index) => {
                return (
                    <>
                <span key={index} className="project_slider">
                  <img src={e.image} alt='image' className="project_image" />
                </span>
                    </>
                )
              })
            }
          </div>
        </motion.div>
      </div>
      <span ref={cursor} id="cursor">
          <p>VIEW</p>
        </span>
    </div>
  );
}

export default App;
