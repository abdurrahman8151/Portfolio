import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Terminal,
  TestTube2,
  ArrowUp,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CountUp, ParallaxHeading } from "@/components/portfolio/motion-system";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.15 1.45-2.15 2.95v5.68H9.32V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.3 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM3.52 20.45h3.57V8.99H3.52v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0Z"/>
    </svg>
  );
}

export function SectionHeading({
  ghost,
  label,
  title,
}: {
  ghost: string;
  label: string;
  title: string;
}) {
  return <ParallaxHeading ghost={ghost} label={label} title={title} />;
}

export function About() {
  const services = [
    {
      icon: Layers,
      title: "Clean architecture",
      text: "SOLID principles, layered systems, and design patterns that make complexity manageable.",
      number: "01",
    },
    {
      icon: ShieldCheck,
      title: "Security by design",
      text: "JWT, token rotation, role-based access, and payment flows you can trust.",
      number: "02",
    },
    {
      icon: Database,
      title: "Performance at scale",
      text: "MySQL replication, Redis caching, queues, and load-tested infrastructure.",
      number: "03",
    },
  ];
  return (
    <section id="about" className="content-section about-section">
      <SectionHeading
        ghost="ABOUT ME"
        label="THE DEVELOPER BEHIND THE CODE"
        title="A little about me."
      />
      <div className="about-grid">
        <div className="expertise-grid">
          {services.map(({ icon: Icon, title, text, number }) => (
            <article className="expertise-item" key={number}>
              <span className="item-number">{number}</span>
              <Icon className="expertise-icon" size={29} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="about-copy">
          <span className="eyebrow section-label">
            HELLO, I&apos;M ABDALRAHMAN
          </span>
          <h3>
            I build the part
            <br />
            you don&apos;t see.
            <br />
            <span>But always rely on.</span>
          </h3>
          <p>
            I&apos;m a Software Engineering graduate from Damascus University
            with 3+ years of hands-on PHP and Laravel development. I care about
            what happens behind the interface: the architecture, the data, and
            the details that make a system dependable.
          </p>
          <p>
            Every project here was built independently — from the first database
            schema to testing and deployment. No shortcuts. Just a curiosity for
            how things work, and the drive to make them work better.
          </p>
          <a className="text-link" href="#contact">
            Let&apos;s get to know each other <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="stats-strip">
        {[
          { value: "9,300+", label: "Concurrent users in k6 tests" },
          { value: "663+", label: "Tests authored" },
          { value: "50+", label: "Documented API endpoints" },
          { value: "06", label: "Independently built projects" },
        ].map((stat) => (
          <div key={stat.label}>
            <strong>
              <CountUp value={stat.value} />
              <span className="stat-period">.</span>
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechStack() {
  const categories = [
    {
      icon: Code2,
      title: "Languages & frameworks",
      tags: [
        "PHP 8.3",
        "Laravel 10–12",
        "Java",
        "JavaScript",
        "SQL",
        "ANTLR4",
        "Python / Odoo",
      ],
    },
    {
      icon: Database,
      title: "Data & real-time",
      tags: [
        "MySQL 8",
        "Redis 7",
        "WebSockets",
        "Laravel Reverb",
        "Pusher",
        "Firebase FCM",
        "Horizon",
      ],
    },
    {
      icon: Cloud,
      title: "Infrastructure & cloud",
      tags: [
        "Docker",
        "Nginx",
        "GitHub Actions",
        "AWS S3",
        "RoadRunner / Octane",
        "PM2",
        "Render",
      ],
    },
    {
      icon: TestTube2,
      title: "Quality & architecture",
      tags: [
        "PHPUnit",
        "k6",
        "SonarQube",
        "OpenAPI",
        "SOLID",
        "Repository / Strategy",
        "JWT / OAuth",
      ],
    },
  ];
  return (
    <section id="skills" className="content-section">
      <SectionHeading
        ghost="TECH STACK"
        label="MY ENGINEERING TOOLKIT"
        title="The right tools. Solid foundations."
      />
      <div className="stack-grid">
        {categories.map(({ icon: Icon, title, tags }, index) => (
          <article className="stack-item" key={title}>
            <div className="stack-icon-row">
              <Icon size={28} strokeWidth={1.4} />
              <span>0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <ul>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="content-section">
      <SectionHeading
        ghost="THE JOURNEY"
        label="LEARNING. BUILDING. REPEATING."
        title="Experience & education."
      />
      <div className="journey-grid">
        <div className="journey-column">
          <span className="eyebrow journey-label">
            <Terminal size={16} /> HANDS-ON EXPERIENCE
          </span>
          <article className="timeline-item">
            <span className="timeline-meta">
              3+ YEARS OF INDEPENDENT DEVELOPMENT
            </span>
            <h3>Backend Developer</h3>
            <p className="timeline-subtitle">
              Personal projects & graduation capstone
            </p>
            <p>
              Designed, built, and tested six end-to-end systems. Hands-on work
              across API architecture, secure payment flows, real-time
              communication, and containerized deployments.
            </p>
            <ul>
              <li>Carpooling backend validated at 9,300+ concurrent users</li>
              <li>663+ PHPUnit tests with approximately 65% coverage</li>
              <li>From domain modeling to CI/CD and deployment</li>
            </ul>
          </article>
        </div>
        <div className="journey-column">
          <span className="eyebrow journey-label">
            <GraduationCap size={17} /> EDUCATION & CERTIFICATION
          </span>
          <article className="timeline-item">
            <span className="timeline-meta">GRADUATED SEPTEMBER 2026</span>
            <h3>B.Sc. Software Engineering</h3>
            <p className="timeline-subtitle">
              Damascus University · Faculty of IT Engineering
            </p>
            <p>
              A foundation in software design, algorithms, database systems, and
              compiler theory. Graduation capstone: Atareekak ride-sharing
              platform.
            </p>
          </article>
          <article className="timeline-item certification">
            <span className="timeline-meta">BRITISH COUNCIL</span>
            <h3>English Language Certificate</h3>
            <p className="timeline-subtitle">Languages: Arabic & English</p>
          </article>
          <article className="timeline-item certification certification-efset">
            <span className="timeline-meta">EF SET · 67/100 · C1 ADVANCED</span>
            <h3>English Proficiency Certificate</h3>
            <div className="certification-actions">
              <a href="https://cert.efset.org/4r1zds" target="_blank" rel="noreferrer">
                Verify certificate <ArrowUpRight size={13} />
              </a>
              <a href="/ef-set-certificate.pdf" target="_blank" rel="noreferrer">
                View PDF <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        </div>
      </div>
      <a
        href="/abdalrahman-alzoubi-cv.pdf"
        download
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "action-link journey-resume",
        )}
      >
        The full story, in my resume <Download data-icon="inline-end" />
      </a>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <section id="contact" className="content-section contact-section">
        <div className="collaboration-banner">
          <div>
            <span className="eyebrow section-label">
              YOUR NEXT BACKEND DEVELOPER?
            </span>
            <h2>
              Good ideas deserve
              <br />
              <span>great engineering.</span>
            </h2>
            <p>
              Open to full-time backend roles, remote or on-site.
              <br />
              Let&apos;s build something that makes a difference.
            </p>
            <a
              href="mailto:alzebiabdalrahman@gmail.com"
              className={cn(buttonVariants({ size: "lg" }), "action-link")}
            >
              Let&apos;s talk <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
          <div className="banner-symbol" aria-hidden="true">
            <span>{"{"}</span>
            <ArrowUpRight />
            <span>{"}"}</span>
          </div>
        </div>
        <SectionHeading
          ghost="SAY HELLO"
          label="LET’S CONNECT"
          title="A conversation is a good start."
        />
        <a className="contact-email" href="mailto:alzebiabdalrahman@gmail.com">
          alzebiabdalrahman@gmail.com
          <ArrowUpRight />
        </a>
        <div className="contact-links">
          <a href="tel:+963983337214">
            <Phone size={15} /> +963 98 333 7214
          </a>
          <span>
            <MapPin size={15} /> Damascus, Syria
          </span>
          <a
            href="https://github.com/abdurrahman8151"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={16} /> GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdurrahman-alzoubi-775a15379"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href="mailto:alzebiabdalrahman@gmail.com">
            <Mail size={15} /> Email me
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <a className="footer-name" href="#home">
          aa<span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} Abdalrahman Alzoubi. Built with
          intention.
        </p>
        <a href="#home">
          BACK TO TOP <ArrowUp size={14} />
        </a>
      </footer>
    </>
  );
}
