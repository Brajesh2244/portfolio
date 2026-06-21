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

const roles = ["Java Developer", "React Developer", "Machine Learning Enthusiast", "Future Full Stack Developer"];

const resumeText = `BRAJESH KUMAR

MCA Graduate | Java Developer | React Developer | Machine Learning Enthusiast

Profile
Motivated MCA graduate focused on Java development, React interfaces, machine learning workflows, and scalable software engineering.

Experience
BrizTech Pvt Ltd - Web Development Intern
- Built React applications
- Integrated REST APIs
- Improved UI performance
- Agile development experience

Projects
Mental Health Status Classifier - Machine learning model achieving 94% accuracy.
Heart Disease Risk Prediction - Logistic Regression model with 91% accuracy.

Education
MCA - Sir M Visvesvaraya Institute of Technology - CGPA 8.8
BCA - Jharkhand Rai University - CGPA 7.9

Career Goals
Software Engineer, Java Developer, Full Stack Developer

Skills
Core Java, OOP, SQL, HTML, CSS, JavaScript, React, Tailwind CSS, Git, GitHub, ChatGPT, GitHub Copilot
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
              AI + Software Engineering Command Center
            </div>
            <h1 className="hero-title">BRAJESH KUMAR</h1>
            <div className="mt-5 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/48">MCA Graduate building toward</p>
              <RoleSwitcher />
            </div>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              I combine Core Java, OOP, React, SQL, and machine learning to build recruiter-ready software projects:
              reliable logic, polished interfaces, and data-driven prediction systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Software Engineer", "Java Developer", "Full Stack Developer"].map((goal) => (
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
              <a className="icon-button" href="mailto:brajesh@example.com" aria-label="Email">
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
                ["Core Java + OOP", "92%"],
                ["React UI Systems", "88%"],
                ["ML Classification", "94%"],
                ["SQL + Data Flow", "84%"]
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
        kicker="Profile"
        title="Java-first engineer with AI project proof"
        summary="The brand is intentionally focused: software engineering fundamentals, React product interfaces, and machine learning projects with measurable outcomes."
        icon={BrainCircuit}
      />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel reveal">
          <p className="text-xl leading-9 text-white/78">
            Motivated MCA graduate with experience in software development, web technologies, machine learning, and
            building scalable applications. I am targeting Software Engineer, Java Developer, and Full Stack Developer
            roles where strong fundamentals and product execution matter.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Capability icon={Code2} title="Java Development" text="Core Java, OOP, and structured problem solving." />
            <Capability icon={TerminalSquare} title="React Development" text="Component-driven interfaces with responsive Tailwind styling." />
            <Capability icon={BrainCircuit} title="Machine Learning" text="Classification models, preprocessing, accuracy tracking, and insights." />
            <Capability icon={ServerCog} title="Engineering Workflow" text="Git, GitHub, API integration, agile habits, and AI-assisted development." />
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
        title="A stack built for Java, React, and AI delivery"
        summary="Instead of a flat skill list, this dashboard groups the tools by how a recruiter would evaluate them: software core, interface layer, and modern AI-assisted workflow."
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
        kicker="Internship Timeline"
        title="BrizTech experience, presented by impact"
        summary="The internship section now emphasizes workplace execution: React features, REST API integration, UI performance, Git workflow, and agile collaboration."
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
        kicker="Project Command Deck"
        title="Machine learning case studies recruiters can scan"
        summary="Projects are the highlight: each one now shows the problem, model outcome, technology stack, key achievements, and practical feature modules."
        icon={Database}
      />
      <div className="reveal mb-6 grid gap-4 md:grid-cols-3">
        <div className="mission-card">
          <Activity size={22} />
          <span>Best Accuracy</span>
          <strong>94%</strong>
        </div>
        <div className="mission-card">
          <BrainCircuit size={22} />
          <span>ML Focus</span>
          <strong>Classification</strong>
        </div>
        <div className="mission-card">
          <Code2 size={22} />
          <span>Presentation</span>
          <strong>Dashboard-ready</strong>
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
        title="Academic foundation for software engineering"
        summary="MCA and BCA credentials anchor the portfolio with strong computing fundamentals and steady academic performance."
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
      <SectionHeader kicker="Certifications" title="Signals Of Continued Learning" icon={Sparkles} />
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
                <h3 className="font-display text-xl font-semibold">{certificate}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">Verified learning milestone in the engineering orbit.</p>
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
      <SectionHeader kicker="Contact" title="Open A Secure Channel" icon={Mail} />
      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="glass-panel reveal">
          <p className="text-lg leading-8 text-white/72">
            Have a role, project, or AI-powered product idea? Send a message and the form will forward it to the
            configured backend API.
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/70">
            <a className="contact-link" href="mailto:brajesh@example.com">
              <Mail size={18} />
              brajesh@example.com
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
          <a className="icon-button" href="mailto:brajesh@example.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
