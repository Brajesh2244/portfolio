export const stats = [
  { label: "MCA CGPA", value: "8.8", caption: "Strong academic base in software and computing" },
  { label: "Best ML Accuracy", value: "94%", caption: "Mental health classifier model performance" },
  { label: "Technologies Used", value: "12+", caption: "Java, React, ML, database, and developer tools" },
  { label: "Internship Experience", value: "1", caption: "Web development internship at BrizTech Pvt Ltd" }
];

export const skillGroups = [
  {
    title: "Software Core",
    signal: "Backend Logic",
    description: "The engineering foundation for clean, object-oriented, database-aware applications.",
    skills: [
      { name: "Core Java", level: 92 },
      { name: "OOP", level: 90 },
      { name: "SQL", level: 84 }
    ]
  },
  {
    title: "Interface Layer",
    signal: "Product UI",
    description: "Modern web interfaces with component thinking, responsive layouts, and fast iteration.",
    skills: [
      { name: "React", level: 88 },
      { name: "JavaScript", level: 86 },
      { name: "Tailwind CSS", level: 84 },
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 }
    ]
  },
  {
    title: "AI Workflow",
    signal: "Developer Velocity",
    description: "Version control and AI-assisted development habits for faster research, coding, and review.",
    skills: [
      { name: "Git", level: 82 },
      { name: "GitHub", level: 84 },
      { name: "ChatGPT", level: 86 },
      { name: "GitHub Copilot", level: 80 }
    ]
  }
];

export const experiences = [
  {
    title: "Web Development Intern",
    organization: "BrizTech Pvt Ltd",
    meta: "Internship Experience",
    summary: "Worked in a practical web development environment, translating UI requirements into React features and improving front-end delivery quality.",
    points: [
      "Built reusable React application interfaces for production-style workflows",
      "Integrated REST APIs and handled asynchronous data states",
      "Improved UI performance through cleaner component structure",
      "Practiced agile collaboration, Git workflow, and iterative delivery"
    ]
  }
];

export const projects = [
  {
    title: "Mental Health Status Classifier",
    eyebrow: "AI Case Study 01",
    description: "Machine learning system that classifies mental health status from survey-style input and presents explainable insights for early screening workflows.",
    outcome: "94% accuracy",
    accent: "electric",
    overview:
      "Designed the data pipeline around survey responses, cleaned the dataset, trained classification models, and shaped the result into a dashboard-ready prediction flow.",
    achievements: [
      "Reached 94% model accuracy after preprocessing and model comparison",
      "Converted raw survey attributes into structured ML-ready features",
      "Built a visual insight layer to communicate predictions clearly"
    ],
    features: ["Survey based detection", "Data preprocessing", "Classification models", "Visualization dashboard"],
    technologies: ["Python", "Scikit-Learn", "Machine Learning", "Data Visualization"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/"
  },
  {
    title: "Heart Disease Risk Prediction",
    eyebrow: "AI Case Study 02",
    description: "Healthcare-focused risk prediction model using Logistic Regression to estimate heart disease probability from structured patient indicators.",
    outcome: "91% accuracy",
    accent: "neon",
    overview:
      "Built a supervised ML workflow for health risk analysis with attention to interpretability, clean inputs, and responsible presentation of prediction results.",
    achievements: [
      "Achieved 91% accuracy with a Logistic Regression model",
      "Focused on understandable healthcare analytics over black-box output",
      "Structured the model flow for secure, prediction-oriented usage"
    ],
    features: ["Risk prediction", "Data security", "Healthcare analytics"],
    technologies: ["Python", "Machine Learning", "Logistic Regression", "Healthcare Analytics"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/"
  }
];

export const education = [
  {
    title: "MCA",
    organization: "Sir M Visvesvaraya Institute of Technology",
    meta: "CGPA 8.8",
    points: ["Master of Computer Applications", "Advanced software and computing foundation"]
  },
  {
    title: "BCA",
    organization: "Jharkhand Rai University",
    meta: "CGPA 7.9",
    points: ["Bachelor of Computer Applications", "Programming, databases, and web fundamentals"]
  }
];

export const certifications = ["Web Development Certification", "Campus Hero Webinar"];
