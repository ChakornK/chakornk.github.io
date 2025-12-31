---
name: GDSC Resume Roast
description: Resume review platform for GDSC UBC's event
github: ChakornK/gdsc-resume-roast
skills: Next.js, React, Tailwind, PostgreSQL, AWS S3
---

GDSC Resume Roast was used in an event by GDSC UBC, which had 40+ participants. The web application was built using Next.js, React, and Tailwind. Resumes are uploaded to an AWS S3 bucket and their reviews are stored in a PostgreSQL database using Prisma.

I contributed to the development of GDSC Resume Roast in the following ways:

- Reduced initial page load time (largest contentful paint) by 75%.
- Implemented a design that follows [Material Design 3](https://m3.material.io/).
- Implemented a feature that allows users to download a summary of their resume's reviews as a PDF file.
- Implemented client-side pagination to improve performance.

![Resume rating page](/projects/gdsc-resume-roast/1.png)
![Resume rating results page](/projects/gdsc-resume-roast/2.png)

## Tech stack

- **Frontend**: Next.js, React, Tailwind,
- **Backend**: Node.js
- **Database**: PostgreSQL, Prisma, AWS S3
