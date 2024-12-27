export const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "marketer", label: "Marketer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "project-manager", label: "Project Manager" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "system-admin", label: "System Administrator" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "ui-designer", label: "UI Designer" },
  { value: "content-creator", label: "Content Creator" },
  { value: "seo-specialist", label: "SEO Specialist" },
  { value: "graphic-designer", label: "Graphic Designer" },
  { value: "full-stack-developer", label: "Full Stack Developer" },
  { value: "front-end-developer", label: "Front-End Developer" },
  { value: "back-end-developer", label: "Back-End Developer" },
  { value: "mobile-developer", label: "Mobile Developer" },
  { value: "database-administrator", label: "Database Administrator" },
  { value: "cloud-engineer", label: "Cloud Engineer" },
  { value: "security-engineer", label: "Security Engineer" },
  { value: "network-engineer", label: "Network Engineer" },
  { value: "ios-developer", label: "iOS Developer" },
  { value: "android-developer", label: "Android Developer" },
  { value: "web-designer", label: "Web Designer" },
  { value: "game-developer", label: "Game Developer" },
  { value: "automation-engineer", label: "Automation Engineer" },
];

export const technologies = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "csharp", label: "C#" },
  { value: "c++", label: "C++" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "scala", label: "Scala" },
  { value: "nodejs", label: "Node.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
  { value: "express", label: "Express.js" },
  { value: "nextjs", label: "Next.js" },
  { value: "gatsby", label: "Gatsby" },
  { value: "reactnative", label: "React Native" },
  { value: "flutter", label: "Flutter" },
  { value: "graphql", label: "GraphQL" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "googlecloud", label: "Google Cloud" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
];

interface ChangelogItem {
  version: string;
  date: string;
  changes: {
    type: "new" | "improvement" | "fix";
    description: string;
  }[];
}

export const changelogData: ChangelogItem[] = [
  {
    version: "2.1.0",
    date: "2024-12-15",
    changes: [
      { type: "new", description: "Added dark mode support" },
      { type: "improvement", description: "Enhanced performance of data loading" },
      { type: "fix", description: "Fixed a bug causing occasional crashes on startup" },
    ],
  },
  {
    version: "2.1.0",
    date: "2024-12-15",
    changes: [
      { type: "new", description: "Added dark mode support" },
      { type: "improvement", description: "Enhanced performance of data loading" },
      { type: "fix", description: "Fixed a bug causing occasional crashes on startup" },
    ],
  },
  {
    version: "2.1.0",
    date: "2024-12-15",
    changes: [
      { type: "new", description: "Added dark mode support" },
      { type: "improvement", description: "Enhanced performance of data loading" },
      { type: "fix", description: "Fixed a bug causing occasional crashes on startup" },
    ],
  },
  {
    version: "2.1.0",
    date: "2024-12-15",
    changes: [
      { type: "new", description: "Added dark mode support" },
      { type: "improvement", description: "Enhanced performance of data loading" },
      { type: "fix", description: "Fixed a bug causing occasional crashes on startup" },
    ],
  },
];
