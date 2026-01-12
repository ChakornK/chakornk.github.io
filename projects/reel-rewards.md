---
name: Reel Rewards
description: Pomodoro timer that blocks social media access
devpost: reel-rewards
github: ChakornK/reel-rewards
skills: Next.js, React, Tailwind, MongoDB, Chrome Extension API
---

Reel Rewards is a project built at Hackcamp 2025, a 18-hour hackathon, in collaboration with [@ricd99](https://github.com/ricd99), [@galileokim](https://github.com/galileokim), [@richard-mou](https://github.com/richard-mou).

It functions as a pomodoro timer that blocks popular social media platforms such as Instagram, Reddit, and YouTube.

![Home page](/projects/reel-rewards/1.png)

MongoDB is used to store user logins, sessions, and progress. User statistics are displayed on their dashboard.

![Login page](/projects/reel-rewards/2.png)
![Dashboard](/projects/reel-rewards/3.png)

The Chrome extension is synced with the dashboard through the Node.js backend, allowing users to manage their sessions through either the dashboard or the extension. The extension also handles the blocking of social media platforms by injecting scripts into the browser.

![Chrome extension](/projects/reel-rewards/4.png)

## Tech stack

- **Frontend**: Next.js, React, Tailwind, Chrome Extension API
- **Backend**: Node.js
- **Database**: MongoDB
- **Auth**: JWT
