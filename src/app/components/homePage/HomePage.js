import Hero from "./hero/Hero"
import About from "./about/About"
import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"

export default async function HomePage(){


    return(
        <>
          <Navbar/>
          <Hero />
          {/* <About />
          <Footer /> */}
        </>
    )
}