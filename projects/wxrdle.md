---
name: Wxrdle
description: Get the best guess suggestions for today's Wordle and view future Wordle answers
github: chakornk/wxrdle
website: https://wxrdle.vercel.app/
---

[Wordle](https://www.nytimes.com/games/wordle/index.html) is a word-guessing game where players are given 6 guesses to find a 5-letter word. While there are many strategies to winning in as few guesses as possible, one of the simplest strategies is to eliminate as many letters as possible in each guess. However, most players do not know every possible word (over 14k words), which means they may not be able to eliminate letters as efficiently as possible.

Wxrdle is a web application that provides suggestions for the best next guess that eliminates as many letters as possible. It uses GitHub Actions to automatically scrape the NYTimes website daily and get Wordle answers. The scraped answer is used to calculate the result of each guess. For each guess, the user can either input their own word or ask the application to provide a suggestion.

![Initial UI](/projects/wxrdle/1.png)
![Guesses](/projects/wxrdle/2.png)

Wxrdle can also be used to view future Wordle answers.

![Word list](/projects/wxrdle/3.png)

## Tech stack

- **Frontend**: Preact, Tailwind, Motion
- **CI/CD**: GitHub Actions
