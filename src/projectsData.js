export const projects = [
  {
    title: "JH Eagles",
    id: "jheagles",
    brief:
      "MD3-compliant remake of Johnston Height's EagleTime app, made with Flutter",
    features: [
      "Built with Flutter and Material Design 3 component widgets",
      "Connects to the school's EagleTime app's API",
      "Supports light/dark mode and uses the system's accent color",
      "Home page allows users to view general information such as the current weather and block rotation",
      "Messages page allows users to view messages from the school's EagleTime app",
      "Calendar page allows users to view upcoming events from the school's EagleTime app",
    ],
    imgsNum: 4,
    links: {
      github: "https://github.com/chakornk/jh-eagles",
    },
  },
  {
    title: "Drawdle",
    id: "drawdle",
    brief: "A website to teach drawing",
    features: [
      "Made in collaboration with two other people",
      "Built with React, Pixi.js, and Tailwind CSS",
      "Full-stack app powered by Next.js",
      "Frontend provides a drawing canvas with customizable brush sizes and colors",
      "Backend handles the storage of the user's drawing data",
    ],
    imgsNum: 2,
    links: {
      github: "https://github.com/drawdle/drawdle",
    },
  },
  {
    title: "SVG-based liquid glass",
    id: "svglg",
    brief:
      "Simple Codepen project that shows how the liquid glass effect can be created using SVG filters",
    features: [
      "Displacement map is dynamically generated with SVG filters and applied to the desired HTML element",
      "Allows the liquid glass effect to be applied to any HTML element",
    ],
    imgs: ["svglgcover"],
    links: {
      codepen: "https://codepen.io/chakornk/pen/ZYbRrgZ",
    },
  },
  {
    title: "ClubManager",
    id: "clubmanager",
    brief: "Website for managing school clubs",
    features: [
      "Made in collaboration with one other person",
      "Built with React and Tailwind CSS",
      "Fontend powered by Next.js",
      "Discover page allows users to explore and join clubs",
      "My clubs page allows users to view clubs they have joined and manage clubs they have created",
      "Club details page shows information about the club: its members, owners, sponsor teachers, location, and meeting schedule",
      "Backend powered by .NET; handles data storage and authentication",
    ],
    imgsNum: 3,
    links: {},
  },
];
