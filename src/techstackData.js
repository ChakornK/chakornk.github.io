import {
  asset_express,
  asset_flutter,
  asset_git,
  asset_github,
  asset_nextjs,
  asset_nodejs,
  asset_react,
  asset_tailwind,
  asset_typescript,
} from "./components/assets";

export const techstack = [
  {
    Frontend: [
      {
        name: "TypeScript",
        desc: "JavaScript with types for writing safer code",
        icon: asset_typescript,
      },
      {
        name: "React",
        desc: "Component-based library for making UI",
        icon: asset_react,
      },
      {
        name: "Tailwind",
        desc: "Utility-first CSS framework for quickly styling UI",
        icon: asset_tailwind,
      },
      {
        name: "Next.js",
        desc: "React framework for fullstack apps",
        icon: asset_nextjs,
      },
      {
        name: "Flutter",
        desc: "Framework for building cross-platform apps",
        icon: asset_flutter,
      },
    ],
  },
  {
    Backend: [
      {
        name: "Node.js",
        desc: "JavaScript runtime for servers",
        icon: asset_nodejs,
      },
      {
        name: "Express",
        desc: "Web framework for HTTP servers",
        icon: asset_express,
      },
    ],
    Tools: [
      {
        name: "Git",
        desc: "Version control to manage code and collaborate with others",
        icon: asset_git,
      },
      {
        name: "Github Actions",
        desc: "Automation tool for building and deploying",
        icon: asset_github,
      },
    ],
  },
];
