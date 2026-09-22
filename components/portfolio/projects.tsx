"use client";

import { ArrowUpRight, Check, GitBranch } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/portfolio/sections";
import { CountUp } from "@/components/portfolio/motion-system";

const projects = [
  {
    name: "Atareekak",
    type: "RIDE-SHARING & CARPOOLING API",
    note: "GRADUATION CAPSTONE",
    description:
      "A complete carpooling backend, from finding a ride to arriving safely. Engineered for real-world complexity: secure payments, trust and reputation, live communication, and infrastructure that scales.",
    tech: "Laravel 11 / PHP 8.3 / MySQL / Redis / Docker",
    features: [
      "9,300+ concurrent users validated with k6 across four load scenarios",
      "JWT with refresh token rotation, document verification, and staff roles",
      "Multi-gateway wallet, trust scoring, live chat, and FCM notifications",
      "Primary/replica databases, CI/CD, and 663+ automated tests",
    ],
    repo: "ATAREEKAK",
    metric: "9,300+",
    metricLabel: "CONCURRENT USERS · K6 VALIDATED",
    code: [
      "Client requests",
      "Nginx · load balancer",
      "Laravel Octane · API",
      "MySQL primary / replica + Redis",
    ],
  },
  {
    name: "WorkBridge",
    type: "RECRUITMENT & FREELANCE MARKETPLACE",
    note: "PAYMENTS & REAL-TIME",
    description:
      "Two marketplaces, one carefully designed backend. A recruitment platform and freelance service marketplace with secure financial flows for markets with limited payment infrastructure.",
    tech: "Laravel 10 / JWT / MySQL / Redis / Pusher",
    features: [
      "Admin-mediated escrow wallet with a 5% platform fee",
      "Three-role access model across 22 relational tables",
      "Real-time notifications and category-based recommendations",
      "End-to-end service lifecycle, OAuth, and file deliverables",
    ],
    repo: "freelance-jobs",
    metric: "22",
    metricLabel: "RELATIONAL DATABASE TABLES",
    code: [
      "Job recruitment + freelance services",
      "JWT · role-based access",
      "Service lifecycle · escrow wallet",
      "MySQL + Redis · Pusher events",
    ],
  },
  {
    name: "Multi-Vendor E-Commerce",
    type: "MARKETPLACE REST API",
    note: "COMMERCE ENGINEERING",
    description:
      "An inventory-aware marketplace API for customers, store owners, and administrators. Keeps orders, stock, and pricing consistent throughout the full order lifecycle.",
    tech: "Laravel 11 / Sanctum / Reverb / MySQL / PHPUnit",
    features: [
      "Automatic inventory adjustments on order creation, update, and deletion",
      "Dynamic price recalculation and store-scoped carts",
      "Live event broadcasting with Laravel Reverb",
      "Role-gated middleware and multi-vendor administration",
    ],
    repo: "e-commerce",
    metric: "03",
    metricLabel: "ROLES · ONE COHESIVE PLATFORM",
    code: [
      "Customers · stores · administrators",
      "Sanctum · role-gated API",
      "Orders · inventory · pricing",
      "MySQL · Reverb broadcasting",
    ],
  },
  {
    name: "Internet Programs",
    type: "FULL-STACK LARAVEL APPLICATION",
    note: "CLOUD & DEPLOYMENT",
    description:
      "A full-stack application connecting secure authentication, cloud file storage, audit trails, reporting, and multi-instance deployment into one maintainable system.",
    tech: "Laravel 11 / AWS S3 / Tailwind CSS / Vite / PM2",
    features: [
      "JWT and Sanctum authentication with Google OAuth",
      "S3 storage with image processing and comprehensive audit logs",
      "Excel and PDF reporting with queue-backed background jobs",
      "Four parallel PHP workers behind Nginx, managed by PM2",
    ],
    repo: "internet-programs",
    metric: "04",
    metricLabel: "PARALLEL PHP WORKERS",
    code: [
      "Laravel web application",
      "Nginx · PM2 worker cluster",
      "Queues · reports · audit trails",
      "AWS S3 · image processing",
    ],
  },
  {
    name: "Smart Mobile Hospital",
    type: "ODOO ERP & EMERGENCY TRIAGE",
    note: "HEALTHCARE SYSTEMS",
    description:
      "A customized ERP for mobile medical units. Project Pulse connects simulated patient vitals to triage workflows, with resilient operations for disconnected disaster zones.",
    tech: "Python / XML / Odoo 17 / IoT / CRM / ERP",
    features: [
      "Custom triage module driven by simulated IoT vitals",
      "Segregation of duties across 8+ hospital roles",
      "Decentralized inventory, fleet management, and expiry tracking",
      "Offline-oriented tele-triage and medication dispensary workflows",
    ],
    repo: null,
    metric: "8+",
    metricLabel: "FUNCTIONAL ROLES · SECURE ACCESS",
    code: [
      "Simulated IoT · patient vitals",
      "Project Pulse · triage engine",
      "Odoo ERP · eight-plus roles",
      "Mobile inventory · care workflows",
    ],
  },
  {
    name: "AngularScript",
    type: "FULL-PIPELINE COMPILER",
    note: "LANGUAGE ENGINEERING",
    description:
      "A compiler translating an Angular-inspired component language into vanilla HTML, CSS, and JavaScript. Built to explore language design from tokens to executable output.",
    tech: "Java / ANTLR4 / Visitor Pattern / Compiler Theory",
    features: [
      "Complete lexer, parser, AST, semantic analysis, and code generation",
      "18 typed AST node classes and nine scoped symbol tables",
      "10 distinct semantic error types with multi-pass reporting",
      "Checks declarations, return types, variable scope, and bindings",
    ],
    repo: "compiler60",
    metric: "18",
    metricLabel: "TYPED ABSTRACT SYNTAX TREE NODES",
    code: [
      "Source · Angular-inspired syntax",
      "Lexer → parser → typed AST",
      "Scopes · semantic validation",
      "HTML + CSS + JavaScript output",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="content-section projects-section">
      <SectionHeading
        ghost="SELECTED WORK"
        label="LESS TALK. MORE BUILDING."
        title="Systems built from the ground up."
      />
      <div className="projects-intro">
        <p>Six independent projects. Real challenges. Thoughtful solutions.</p>
        <a
          className="text-link"
          href="https://github.com/abdurrahman8151"
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={15} />
        </a>
      </div>
      <Accordion defaultValue={["Atareekak"]}>
        {projects.map((project, index) => (
          <AccordionItem
            key={project.name}
            value={project.name}
            className="project-item"
          >
            <AccordionTrigger className="project-trigger">
              <span className="project-index">0{index + 1}</span>
              <span className="project-title-wrap">
                <span className="project-title">{project.name}</span>
                <span className="project-type">{project.type}</span>
              </span>
              <span className="project-note">{project.note}</span>
            </AccordionTrigger>
            <AccordionContent className="project-panel">
              <div className="project-detail">
                <div className="project-description">
                  <p>{project.description}</p>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="project-tech">{project.tech}</p>
                  {project.repo ? (
                    <a
                      className="text-link"
                      href={`https://github.com/abdurrahman8151/${project.repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitBranch size={16} /> View source code{" "}
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <a
                      className="text-link"
                      href="mailto:alzebiabdalrahman@gmail.com?subject=Smart%20Mobile%20Hospital%20project"
                    >
                      Ask about this project <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
                <div className="architecture-panel">
                  <div className="architecture-label">
                    <span className="status-dot" /> SYSTEM OVERVIEW{" "}
                    <span>0{index + 1}</span>
                  </div>
                  <div className="architecture-flow">
                    {project.code.map((line, i) => (
                      <div key={line}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <code>{line}</code>
                      </div>
                    ))}
                  </div>
                  <div className="project-metric">
                    <strong>
                      <CountUp value={project.metric} />
                    </strong>
                    <span>{project.metricLabel}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="project-footnote">
        Independently architected, developed, tested, and documented.
      </p>
    </section>
  );
}
