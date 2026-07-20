import { lazy, Suspense } from "react";
import useLenis from "./hooks/useLenis";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import GithubStats from "./components/GithubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const NetworkBackground = lazy(() => import("./components/NetworkBackground"));

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg font-body">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Suspense fallback={null}>
        <NetworkBackground />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
