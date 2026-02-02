---
name: SFU CareerConnect
description: Find your next tech internship that aligns with your experiences
thumbnail: /projects/sfu-careerconnect/1.png
devpost: sfu-careerconnect
github: ChakornK/sfu-careerconnect
website: https://sfu-careerconnect.vercel.app/
skills: Next.js, React, Tailwind, Motion, MongoDB, Redis, Better Auth
---

SFU CareerConnect is a project built at SystemHacks 2026 (a.k.a XHacks), a 24-hour hackathon, in collaboration with [@aaf1007](https://github.com/aaf1007), [@BlingBloaw](https://github.com/BlingBloaw), and [@avgee123](https://github.com/avgee123).

![Landing page](/projects/sfu-careerconnect/1.png)

## Inspiration

Finding internships is one of the biggest challenges students face today. We realized there is a major disconnect: students have the skills from their rigorous SFU coursework, but they struggle to translate that experience and their resumes into industry-ready language. Many students don't know how to map their academic background to actual live job listings in Vancouver and across BC. Therefore, we built SFU CareerConnect to bridge this gap between academic transcripts and the professional world.

## How it works

First, users select the courses that they have taken or are planning to take. Course data is taken from the [SFU Courses](https://sfucourses.com/) API.

![Select courses](/projects/sfu-careerconnect/2.png)

Users then upload their resume, which is used for obtaining additional information about their experiences.

![Upload resume](/projects/sfu-careerconnect/3.png)

After that, a list of internships, taken from LinkedIn, in the Vancouver area is generated and ranked based on their experience. Internally, user's profile data is passed to Google's Gemma 27B.

![Internships](/projects/sfu-careerconnect/4.png)

Users can also view an analysis of their tech-related skills to see their strengths and weaknesses.

![Skill insights](/projects/sfu-careerconnect/5.png)

## Tech stack

- **Frontend**: Next.js, React, Tailwind, Motion
- **Backend**: Node.js, Redis
- **Database**: MongoDB
- **Auth**: Better Auth, Google OAuth 2.0
