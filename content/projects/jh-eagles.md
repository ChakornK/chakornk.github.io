---
name: JH Eagles
description: MD3-compliant version of Johnston Heights Secondary's EagleTime app
github: chakornk/jh-eagles
skills: Flutter
---

The EagleTime app is used by Johnston Heights Secondary to broadcast announcements to students, parents, and staff. The app had performance issues (>1500ms load time) and its user interface design is outdated and cluttered. To address these issues, I created the JH Eagles app, which incorporates Android's new [Material Design 3](https://m3.material.io/), with Flutter. It has a load time of under 500ms, making it fast and responsive, and is designed to be easy to use, with a clean and modern look.

The app features a home page, which lists information such as block rotations, bell schedule, school map, and links to important resources.

![Home page](/projects/jh-eagles/1.png)
![Bell schedule](/projects/jh-eagles/4.png)

The messages page shows the latest school announcements.

![Messages page](/projects/jh-eagles/2.png)

The calendar page allows users to view events and schedules.

![Calendar page](/projects/jh-eagles/3.png)

The app uses EagleTime's API to fetch data, which allows it to synchronize with the EagleTime app without additional work.

GitHub Actions is used to build and deploy the app. It also updates a static API endpoint, which is used by the app to check for updates.

## Tech stack

- **Frontend**: Flutter
- **CI/CD**: GitHub Actions
