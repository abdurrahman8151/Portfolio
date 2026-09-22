import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import {
  About,
  TechStack,
  Journey,
  Contact,
} from "@/components/portfolio/sections";
import { Projects } from "@/components/portfolio/projects";
import { MotionExperience } from "@/components/portfolio/motion-system";

export default function Page() {
  return (
    <MotionExperience>
      <div className="portfolio-shell">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-container">
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Journey />
            <Contact />
          </main>
        </div>
      </div>
    </MotionExperience>
  );
}
