import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Activity,
  ArrowDown,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import StatCard from "./components/StatCard.jsx";
import SkillCard from "./components/SkillCard.jsx";
import TimelineItem from "./components/TimelineItem.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ContactForm from "./components/ContactForm.jsx";
import { certifications, education, experiences, projects, skillGroups, stats } from "./data/portfolio.js";

const CommandScene = lazy(() => import("./components/CommandScene.jsx"));

gsap.registerPlugin(ScrollTrigger);

const navItems = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const roles = [
  "Java Full Stack Developer",
  "Spring Boot & React Developer",
  "Software Engineer",
  "Backend Java Developer"
];

const resumeText = `BRAJESH KUMAR
Email: brajesh552077@gmail.com | Phone: +91-9117252022 | Bengaluru, India
Profiles: LinkedIn | GitHub

PROFESSIONAL SUMMARY
Detail-oriented Java Full Stack Developer and MCA graduate (CGPA 9.4, 2nd Rank Holder at Sir MVIT) with hands-on experience building responsive, full-stack web applications using Java, JavaScript, React.js, and SQL. Skilled in REST API integration, JDBC-based database connectivity, and end-to-end feature development across frontend and backend layers.

PROFESSIONAL EXPERIENCE
1. Java Developer Intern — Tap Academy (February 2026 – Present)
- Developed and maintained full-stack web applications and RESTful APIs using Core Java, Advanced Java, Spring Boot, Spring AI, JDBC, Hibernate, and MySQL.
- Built responsive and interactive frontend applications using React, JavaScript, HTML, and Tailwind CSS.
- Applied OOP, Collections, Multithreading, Exception Handling, and Java 8 features while optimizing database queries.

2. Software Engineering Intern — BrizTech Pvt. Ltd. (November 2024 – January 2025)
- Designed, built, and tested REST APIs utilizing Java and the Spring Framework.
- Linked core Java backend services to responsive React/HTML/CSS front-end UI components.
- Collaborated in Agile sprints, daily stand-ups, and code reviews.

ACADEMIC PROJECTS
1. AI-Enhanced E-Commerce Platform | Full Stack Java
- Technologies: Java, JDBC, SQL, React.js, HTML5, CSS3, Tailwind CSS, JavaScript, Git, GitHub
- Built full-stack e-commerce platform with authentication, product catalog, cart, and order processing.
- Implemented JDBC connectivity and SQL queries to handle CRUD operations across core modules.
- Structured code to separate UI and data-handling logic, improving maintainability.

2. AI-Assisted Food Delivery Application | Full Stack Java
- Technologies: Java, JDBC, SQL, React.js, HTML5, CSS3, Tailwind CSS, JavaScript, Git, GitHub
- Developed a food delivery app with restaurant listings, menu management, and order tracking.
- Built responsive interfaces with React.js focused on clear navigation and usability.
- Integrated JDBC and SQL for restaurant, menu, and order data management.

ACHIEVEMENTS & CERTIFICATIONS
- 2nd Place Winner, Sir MVIT Hackathon (200+ participants)
- 2nd Rank Holder, Sir MVIT MCA Program (CGPA: 9.4 / 10.0)
- Web Development Certification — Internshala
- Campus Hero Webinar — Coding Ninjas

EDUCATION
- Master of Computer Applications (MCA) — Sir M. Visvesvaraya Institute of Technology, VTU, Bangalore | CGPA: 9.4 / 10.0
- Bachelor of Computer Applications (BCA) — Jharkhand Rai University, Ranchi | CGPA: 7.9 / 10.0

TECHNICAL SKILLS
- Programming Languages: Java, SQL, JavaScript
- Backend: Core Java, JDBC, OOP, Hibernate, Spring Boot
- Frontend: HTML5, CSS3, React.js, Tailwind CSS
- Databases: SQL, MySQL, Relational Database Design
- Tools: Git, GitHub, Cursor AI, ChatGPT, Claude AI, Gemini AI, Antigravity AI
`;

function downloadResume() {
  const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Brajesh_Kumar_Resume.txt";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function App() {
  const [loading, setLoading] = useState(true);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.18 });
  const smoothY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.18 });
  const rootRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1550);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.78
    });

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const move = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (loading || !rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 70, opacity: 0, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%"
            }
          }
        );
      });

      gsap.utils.toArray(".parallax-float").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -34 : 34,
          rotate: index % 2 === 0 ? 2 : -2,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) return <LoadingScreen />;

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden bg-void text-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-7 w-7 rounded-full border border-electric/70 mix-blend-screen md:block"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-radial-follow opacity-70" />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void/45 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-center gap-2 font-display text-sm uppercase tracking-[0.32em] text-white">
          <span className="grid h-9 w-9 place-items-center border border-electric/50 bg-white/[0.06] text-electric shadow-glow">
            BK
          </span>
          <span className="hidden sm:block">Command Center</span>
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="icon-button" aria-label="Contact Brajesh">
          <Mail size={18} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-void" />}>
          <CommandScene />
        </Suspense>
      </div>
      <div className="scanline pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="eyebrow mb-5">
              <Bot size={16} />
              Java Full Stack Developer & Software Engineer
            </div>
            <h1 className="hero-title">BRAJESH KUMAR</h1>
            <div className="mt-5 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/48">MCA Graduate building toward</p>
              <RoleSwitcher />
            </div>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Detail-oriented Java Full Stack Developer with hands-on experience building responsive web applications
              using Java, Spring Boot, React, and SQL. Skilled in REST API integration, JDBC connectivity, and end-to-end
              feature delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Java Developer", "Full Stack Developer", "Spring Boot & React", "Software Engineer"].map((goal) => (
                <span key={goal} className="mission-chip">
                  {goal}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="primary-button">
                <Rocket size={18} />
                View Projects
              </a>
              <button type="button" className="secondary-button" onClick={downloadResume}>
                <Download size={18} />
                Download Resume
              </button>
              <a href="#contact" className="secondary-button">
                <Send size={18} />
                Contact Me
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3">
              <a className="icon-button" href="https://github.com/" aria-label="GitHub">
                <Github size={19} />
              </a>
              <a className="icon-button" href="https://www.linkedin.com/" aria-label="LinkedIn">
                <Linkedin size={19} />
              </a>
              <a className="icon-button" href="mailto:brajesh552077@gmail.com" aria-label="Email">
                <Mail size={19} />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="glass-panel parallax-float hidden lg:block"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-electric">Candidate Signal</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">Recruiter Ready</h2>
              </div>
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-mint" />
              </span>
            </div>
            <div className="space-y-4">
              {[
                ["Core Java + OOP", "94%"],
                ["Spring Boot & APIs", "88%"],
                ["React UI & Tailwind", "88%"],
                ["SQL & Relational DB", "86%"]
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm text-white/72">
                    <span>{label}</span>
                    <span className="text-electric">{value}</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-white/10">
                    <div className="h-full bg-gradient-to-r from-electric via-mint to-neon" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/60" aria-label="Scroll to about">
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}

function RoleSwitcher() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="role-window">
      <motion.span
        key={roles[roleIndex]}
        initial={{ y: 26, opacity: 0, filter: "blur(12px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -26, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {roles[roleIndex]}
      </motion.span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        kicker="Profile Overview"
        title="Engineering Scalable Full Stack Web Applications"
        summary="Focused on robust object-oriented Java backends, responsive React user interfaces, and clean, scalable architecture."
        icon={Code2}
      />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel reveal">
          <p className="text-xl leading-9 text-white/78">
            Detail-oriented Java Full Stack Developer and MCA graduate (9.4 CGPA, 2nd Rank Holder at Sir MVIT) with
            hands-on experience building full-stack web applications using Java, Spring Boot, React.js, and SQL.
            Skilled in REST API integration, JDBC connectivity, and end-to-end feature delivery across frontend and backend layers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Capability icon={Code2} title="Java & Spring Boot" text="Core Java, OOP, Spring Boot, Hibernate, JDBC, and RESTful APIs." />
            <Capability icon={TerminalSquare} title="React & Frontend" text="Component-driven interfaces with responsive Tailwind CSS styling." />
            <Capability icon={Database} title="Database & SQL" text="Relational database design, JDBC connectivity, and query optimization." />
            <Capability icon={ServerCog} title="Engineering Workflow" text="Git, GitHub, SDLC, agile team habits, and AI-assisted developer velocity." />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Capability({ icon: Icon, title, text }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-5">
      <Icon className="mb-4 text-electric" size={24} />
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">{text}</p>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader
        kicker="Technology Dashboard"
        title="A modern stack for Full Stack Java & Web delivery"
        summary="Organized across backend logic, responsive interface design, and modern developer tooling for maximum development velocity."
        icon={Sparkles}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <SkillCard key={group.title} group={group} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeader
        kicker="Internship Experience"
        title="Industry-tested software development & API integration"
        summary="Practical workplace experience at Tap Academy and BrizTech developing full-stack features, building REST APIs, and connecting databases with React."
        icon={BriefcaseBusiness}
      />
      <div className="timeline">
        {experiences.map((item) => (
          <TimelineItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell projects-feature">
      <SectionHeader
        kicker="Project Showcase"
        title="Full Stack Java & modern web applications"
        summary="End-to-end applications demonstrating complete full-stack architecture, clean separation of concerns, and robust database operations."
        icon={Database}
      />
      <div className="reveal mb-6 grid gap-4 md:grid-cols-3">
        <div className="mission-card">
          <Code2 size={22} />
          <span>Core Stack</span>
          <strong>Full Stack Java</strong>
        </div>
        <div className="mission-card">
          <TerminalSquare size={22} />
          <span>Frontend Layer</span>
          <strong>React & Tailwind</strong>
        </div>
        <div className="mission-card">
          <Database size={22} />
          <span>Data Layer</span>
          <strong>JDBC & SQL</strong>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={index * 0.12} />
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell">
      <SectionHeader
        kicker="Education"
        title="Academic excellence & computing foundation"
        summary="MCA degree with a 9.4 CGPA (2nd Rank Holder at Sir MVIT) and BCA degree establishing deep computer science and programming fundamentals."
        icon={GraduationCap}
      />
      <div className="timeline">
        {education.map((item) => (
          <TimelineItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section-shell">
      <SectionHeader
        kicker="Honors & Credentials"
        title="Hackathon Awards & Verified Certifications"
        summary="Competitive programming recognition, academic rank honours, and technical certifications."
        icon={Sparkles}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((certificate, index) => (
          <motion.div
            key={certificate}
            className="glass-panel reveal parallax-float"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.12 }}
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-electric/40 bg-electric/10 text-electric">
                <ShieldCheck />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{certificate}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">Verified credential and milestone in technical excellence.</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-20">
      <SectionHeader kicker="Contact" title="Get In Touch" icon={Mail} />
      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="glass-panel reveal">
          <p className="text-lg leading-8 text-white/72">
            Interested in discussing full-stack Java roles, React web projects, or engineering opportunities? Feel free
            to connect directly.
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/70">
            <a className="contact-link" href="mailto:brajesh552077@gmail.com">
              <Mail size={18} />
              brajesh552077@gmail.com
            </a>
            <a className="contact-link" href="https://github.com/">
              <Github size={18} />
              GitHub
            </a>
            <a className="contact-link" href="https://www.linkedin.com/">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-white/58 md:flex-row">
        <p>Copyright {new Date().getFullYear()} Brajesh Kumar. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a className="icon-button" href="https://github.com/" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a className="icon-button" href="https://www.linkedin.com/" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a className="icon-button" href="mailto:brajesh552077@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
