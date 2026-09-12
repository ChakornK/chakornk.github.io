---
name: Reel Rewards
description: Pomodoro timer that blocks social media access
thumbnail: /projects/reel-rewards/1.png
devpost: reel-rewards
github: ChakornK/reel-rewards
skills: Next.js, React, Tailwind, MongoDB, Chrome Extension API
stack:
  Frontend: [Next.js, React, Tailwind, Chrome Extension API]
  Backend: [Node.js]
  Database: [MongoDB]
  Auth: [JWT]
---

Reel Rewards is a project built at Hackcamp 2025, a 18-hour hackathon, in collaboration with @github(ricd99), @github(galileokim), @github(richard-mou).

It functions as a pomodoro timer that blocks popular social media platforms such as Instagram, Reddit, and YouTube.

![Home page](/projects/reel-rewards/1.png)

MongoDB is used to store user logins, sessions, and progress. User statistics are displayed on their dashboard.

![Login page](/projects/reel-rewards/2.png)
![Dashboard](/projects/reel-rewards/3.png)

The Chrome extension is synced with the dashboard through the Node.js backend, allowing users to manage their sessions through either the dashboard or the extension. The extension also handles the blocking of social media platforms by injecting scripts into the browser.

![Chrome extension](/projects/reel-rewards/4.png)
