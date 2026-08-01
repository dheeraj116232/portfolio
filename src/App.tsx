import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Education,
  Achievements,
  Contact,
  Footer,
} from './sections'
import { useLenis } from './hooks'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  useLenis(ready)

  return (
    <>
      {!ready && <LoadingScreen onComplete={onLoaded} />}
      <CustomCursor />
      <div
        className={`relative min-h-screen bg-bg text-text transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,229,255,0.08),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.08),_transparent_50%)]" />
          <div className="grid-atmosphere absolute inset-0 opacity-35" />
        </div>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  )
}
