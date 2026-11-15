# Personal Portfolio

A responsive single-page portfolio built with React and Vite and deployed to GitHub Pages. Created for IEEE TechOps Weekly Task #01.

🔗 **Live site:** https://batumirzaoglu0.github.io/portfolio/

## Features

- Home, About, Skills, Projects and Contact sections
- Dark / light theme (dark by default) with a shooting-star animation in dark mode
- Project cards rendered from a data array with `.map()`, plus category filtering
- Responsive layout with a mobile navigation menu
- Automatic deployment with GitHub Actions

## Tech Stack

React, Vite, JavaScript, HTML, CSS, Git, GitHub, GitHub Actions, GitHub Pages

## Project Structure

    src/
      components/   Navbar, Hero, About, Skills, Projects, ProjectCard, Contact, Footer, ShootingStars
      data/         projects.js
      assets/
      App.jsx
      main.jsx

## Getting Started

    git clone https://github.com/batumirzaoglu0/portfolio.git
    cd portfolio
    npm install
    npm run dev

Production build: `npm run build`

## Deployment

Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which installs dependencies, builds the project and publishes the `dist` folder to GitHub Pages.

## Resources and AI Usage

- Official documentation of React, Vite, GitHub Actions and GitHub Pages
- I used Claude (Anthropic) for step-by-step guidance and code examples while building this project. I applied the code myself and learned how each part works.