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
  MapPin,
  Rocket,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import profileImg from "./assets/brajesh-kumar.jpg";
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
      duration: 0.4,
      smoothWheel: true,
      wheelMultiplier: 1.35,
      touchMultiplier: 1.6
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
            <div className="eyebrow mb-4">
              <Bot size={15} />
              Java Full Stack Developer & Software Engineer
            </div>
            <h1 className="hero-title">BRAJESH KUMAR</h1>
            <div className="mt-3.5 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">MCA Graduate building toward</p>
              <RoleSwitcher />
            </div>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-white/70">
              Detail-oriented Java Full Stack Developer with hands-on experience building responsive web applications
              using Java, Spring Boot, React, and SQL. Skilled in REST API integration, JDBC connectivity, and end-to-end
              feature delivery.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {["Java Developer", "Full Stack Developer", "Spring Boot & React", "Software Engineer"].map((goal) => (
                <span key={goal} className="mission-chip">
                  {goal}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="primary-button compact">
                <Rocket size={17} />
                View Projects
              </a>
              <button type="button" className="secondary-button compact" onClick={downloadResume}>
                <Download size={17} />
                Download Resume
              </button>
              <a href="#contact" className="secondary-button compact">
                <Send size={17} />
                Contact Me
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
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
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="glass-panel parallax-float hidden lg:block"
          >
            <div className="mb-4 flex items-center gap-3.5 border-b border-white/10 pb-4">
              <div className="relative shrink-0">
                <img
                  src={profileImg}
                  alt="Brajesh Kumar"
                  className="h-14 w-14 rounded-full object-cover object-top border-2 border-electric/60 shadow-glow"
                  loading="eager"
                />
                <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-void bg-mint" />
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold leading-tight text-white">Brajesh Kumar</h3>
                <p className="text-xs text-white/60">Java Full Stack Developer</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-mint">
                  <MapPin size={11} /> Bengaluru, India • Open to Roles
                </span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-electric">Candidate Signal</p>
                <h2 className="mt-0.5 font-display text-lg font-semibold">Recruiter Ready</h2>
              </div>
              <span className="rounded border border-mint/30 bg-mint/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mint">
                MCA CGPA 9.4
              </span>
            </div>
            <div className="space-y-3.5">
              {[
                ["Core Java + OOP", "94%"],
                ["Spring Boot & APIs", "88%"],
                ["React UI & Tailwind", "88%"],
                ["SQL & Relational DB", "86%"]
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs text-white/72">
                    <span>{label}</span>
                    <span className="text-electric font-semibold">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden bg-white/10">
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
      <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)] items-start">
        {/* Profile Identity Card */}
        <div className="glass-panel reveal flex flex-col items-center text-center p-5 sm:p-6 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-electric via-mint to-neon" />
          
          <div className="profile-portrait-frame relative w-full aspect-[4/5] max-w-[270px] overflow-hidden rounded-xl border border-white/20 bg-void/60">
            <img
              src={profileImg}
              alt="Brajesh Kumar — Java Full Stack Developer"
              className="h-full w-full object-cover object-top filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 border border-electric/30 rounded-xl" />
            <div className="pointer-events-none absolute top-2.5 left-2.5 text-[10px] font-mono text-electric/80 tracking-widest bg-void/80 px-2 py-0.5 rounded border border-electric/20 backdrop-blur-sm">
              DEV // BRAJESH
            </div>
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-2 rounded-lg border border-mint/40 bg-void/90 px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-mint">
                Available Immediately
              </span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
              Brajesh Kumar
            </h3>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-electric">
              Java Full Stack Developer
            </p>
            <p className="mt-1 text-xs text-white/65 flex items-center justify-center gap-1">
              <MapPin size={13} className="text-mint shrink-0" /> Bengaluru, Karnataka, India
            </p>

            <div className="mt-3.5 flex flex-wrap justify-center gap-1.5">
              {["MCA (CGPA 9.4)", "Tap Academy Intern", "Spring Boot", "React.js"].map((badge) => (
                <span
                  key={badge}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white/75"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-electric/50 bg-electric/15 px-3 py-2 text-xs font-semibold text-white hover:bg-electric/25 transition-all"
              >
                <Send size={13} /> Contact
              </a>
              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/15 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-all"
              >
                <Download size={13} /> Resume
              </button>
            </div>
          </div>
        </div>

        {/* Narrative & Capabilities + Stats Column */}
        <div className="space-y-5">
          <div className="glass-panel reveal">
            <h3 className="font-display text-base sm:text-lg font-semibold text-white mb-2">
              Engineering Background & Value Proposition
            </h3>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-white/78">
              Detail-oriented Java Full Stack Developer and MCA graduate (9.4 CGPA, 2nd Rank Holder at Sir MVIT) with
              hands-on experience building full-stack web applications using Java, Spring Boot, React.js, and SQL.
              Skilled in REST API integration, JDBC connectivity, and end-to-end feature delivery across frontend and backend layers.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Capability icon={Code2} title="Java & Spring Boot" text="Core Java, OOP, Spring Boot, Hibernate, JDBC, and RESTful APIs." />
              <Capability icon={TerminalSquare} title="React & Frontend" text="Component-driven interfaces with responsive Tailwind CSS styling." />
              <Capability icon={Database} title="Database & SQL" text="Relational database design, JDBC connectivity, and query optimization." />
              <Capability icon={ServerCog} title="Engineering Workflow" text="Git, GitHub, SDLC, agile team habits, and AI-assisted developer velocity." />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capability({ icon: Icon, title, text }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-3.5 sm:p-4">
      <Icon className="mb-3 text-electric" size={20} />
      <h3 className="font-display text-sm sm:text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-xs sm:text-sm leading-5 sm:leading-6 text-white/60">{text}</p>
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
