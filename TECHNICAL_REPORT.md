# Technical Report: React Portfolio Development & GitHub Pages Deployment

**Author:** Batu Mirzaoğlu
**Program:** IEEE İKÇÜ TechOps — Weekly Task #01
**Live site:** https://batumirzaoglu0.github.io/portfolio/
**Repository:** https://github.com/batumirzaoglu0/portfolio

---

## 5.1. Project Introduction

The goal of this project was to build my personal portfolio website with **React** and **Vite** and publish it on **GitHub Pages**. The website itself was only half of the task. The other half was learning how a modern frontend project is actually built: splitting a UI into components, tracking work with Git branches and Pull Requests, and automating deployment with GitHub Actions.

The site is a single-page application with five sections: **Home**, **About**, **Skills**, **Projects** and **Contact**. It is written in English and uses a dark theme by default.

Main features:

- Light and dark theme toggle (dark is the default), with a subtle shooting-star animation that only appears in dark mode
- Project cards generated from a JavaScript array, with category filtering
- A mobile navigation menu and a layout that adapts to phone, tablet and desktop widths
- A rotating "Currently learning" text in the hero section
- Sections that fade in while scrolling
- A "Copy email" button in the contact section
- Automatic deployment: every push to `main` rebuilds and republishes the site

Overall structure: `index.html` contains a single `#root` element. `main.jsx` mounts the `App` component into it, and `App.jsx` assembles the page from smaller components.

---

## 5.2. Technologies & Architecture

### Why React?

I chose React because it lets me describe *what the interface should look like* for a given data state, instead of manually finding DOM elements and editing them. When data changes, React updates the screen for me. It also encourages reusable components: for example, one `ProjectCard` component displays every project, and I only change the data.

### What does Vite do in this project?

Vite has two jobs. During development (`npm run dev`) it runs a fast local server with hot reload, so a saved change appears in the browser instantly. For production (`npm run build`) it bundles and minifies all JavaScript and CSS into a `dist/` folder, which is the folder that gets published. I also set `base: '/portfolio/'` in `vite.config.js`, because the site is served from a repository subpath.

### Component architecture

The page is built from small components in `src/components/`:

| Component | Responsibility | Props / State |
|---|---|---|
| `Navbar` | Top navigation, theme button, mobile menu | Props: `dark`, `onToggle`. State: `open` (mobile menu) |
| `Hero` | Introduction, profile photo, rotating "learning" word | State: `index` (current word) |
| `About` | Short bio and "Current focus" list | List rendered with `.map()` |
| `Skills` | Skill groups (Languages, Web, Tools) | Nested `.map()` over groups and items |
| `Projects` | Project grid and category filter | State: `filter` |
| `ProjectCard` | One reusable project card | Props: `title`, `description`, `tech`, `category`, `link` |
| `Contact` | GitHub, LinkedIn and email links, copy button | State: `copied` |
| `Footer` | Footer text | none |
| `ShootingStars` | Decorative dark-mode animation | Star list rendered with `.map()` |
| `Reveal` | Wrapper that animates a section when it scrolls into view | State: `visible`, `useRef` |

### Where props and state are used

- **Props:** `App` passes `dark` and `onToggle` to `Navbar`. `Projects` passes each project's data to `ProjectCard`.
- **State:** `App` keeps the theme in `dark` (`useState(true)`) and a `useEffect` writes the value to `document.documentElement.dataset.theme`, so CSS variables switch the whole page. `Projects` keeps the selected category, `Navbar` the menu state, `Hero` the rotating word index, `Contact` the "Copied" message, and `Reveal` its visibility.
- **Lists with `.map()`:** navigation links, focus items, skill groups, project cards, technology tags, contact links and stars are all generated from arrays. Project data lives separately in `src/data/projects.js`, so adding a project does not require touching component code.

### Folder structure

```
portfolio/
├── .github/workflows/deploy.yml   # GitHub Actions workflow
├── public/                        # static files (favicon)
├── src/
│   ├── assets/                    # images (profile photo)
│   ├── components/                # all React components
│   ├── data/projects.js           # project data array
│   ├── App.jsx                    # page assembly + theme state
│   ├── App.css                    # component and layout styles
│   ├── index.css                  # CSS variables, reset, base styles
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── TECHNICAL_REPORT.md
```

### UI and responsive design

Colors are defined as CSS variables, with a light set in `:root` and a dark set in `:root[data-theme='dark']`. Layouts use CSS Grid and Flexbox, and media queries at 800px and 700px change the layout for tablets and phones (for example, the hero photo moves above the text and the navigation becomes a dropdown menu). The markup uses semantic elements (`header`, `nav`, `main`, `section`, `footer`), the profile image has an `alt` text, and buttons have `aria-label`s. Animations are disabled for users who prefer reduced motion.

---

## 5.3. Version Control

### How Git was used

I used Git from the terminal throughout the project: `git add`, `git commit`, `git push`, `git pull`, `git checkout -b`, `git status`, `git log --oneline`. I committed after each meaningful step (layout, project cards, responsive design, deployment, content, features), so the history tells the story of the project. The repository has around 20 commits.

### Branches

- `main`: the stable branch. A push to this branch triggers deployment.
- `feature/redesign-english`: the English redesign of the site (new visual style and content).
- `feature/hero-photo-and-spacing`: the profile photo, rotating learning text and larger section spacing.

### Pull Request process

I created a feature branch, committed and pushed it, opened a Pull Request against `main` on GitHub, checked the changed files, merged it, and then ran `git checkout main` and `git pull` to update my local copy. Pull Requests **#2** (`feature/redesign-english`) and **#3** (`feature/hero-photo-and-spacing`) were completed this way. Each merge to `main` also triggered a new deployment.

### Commit history examples

```
feat: initialize vite react project
feat: create portfolio layout
feat: add reusable project cards from data array
style: implement responsive layout
feat: add GitHub Pages deployment workflow and vite base
docs: update hero text to verify redeploy
style: redesign portfolio with English content
feat: add learning cards and LinkedIn contact
feat: add shooting stars animation in dark mode
docs: add project README
feat: add profile photo and rotating learning text to hero
feat: add scroll reveal animation to sections
feat: add copy email button
```

I followed the `type: description` convention (`feat`, `style`, `docs`, `fix`) so every commit message says what kind of change it is.

---

## 5.4. Deployment & CI/CD

### Development server vs. production build

`npm run dev` starts Vite's development server. It serves the source files with hot reload and readable error overlays, and the result is only available on my computer at `localhost`. `npm run build` prepares the app for the public: it compiles JSX, bundles the modules, minifies JavaScript and CSS, and writes the result to `dist/`. In my first production build, Vite transformed 26 modules and produced one `index.html`, one CSS file and one JavaScript bundle (about 224 kB, 70 kB gzipped), with hashed file names so browsers can cache them safely.

### What the GitHub Actions workflow does

The workflow in `.github/workflows/deploy.yml` runs on every push to `main` (and can also be started manually). It runs on a temporary Ubuntu machine and performs these steps:

1. **Checkout:** downloads my repository code.
2. **Set up Node:** installs the Node.js LTS version and caches npm packages.
3. **Install dependencies:** `npm ci`, a clean install exactly matching `package-lock.json`.
4. **Build:** `npm run build`, producing `dist/`.
5. **Setup Pages:** prepares the GitHub Pages configuration.
6. **Upload artifact:** packages the `dist/` folder.
7. **Deploy to GitHub Pages:** publishes the package.

I started from the official example in Vite's "Deploying a Static Site" guide. In the repository settings, **Pages → Source** is set to **GitHub Actions**.

### How GitHub Pages publishes the site

GitHub Pages is a static hosting service. It receives the artifact created by the workflow and serves its files over HTTPS at `https://batumirzaoglu0.github.io/portfolio/`. Because the site lives under `/portfolio/`, `vite.config.js` contains `base: '/portfolio/'`, so the generated links to JS and CSS files include that prefix.

### What happens after a push

1. I push a commit to `main`.
2. GitHub detects the push and starts the workflow.
3. The runner installs dependencies and builds the project.
4. The `dist/` folder is uploaded and deployed to GitHub Pages.
5. After about a minute the live site shows the change (I refresh with Ctrl + F5 to bypass the browser cache).

I verified this loop by changing the hero text, pushing, and seeing the new text on the live site after the workflow finished.

---

## 5.5. Technical Challenges

### Challenge 1: `npm` blocked by PowerShell

- **Problem:** Running `npm -v` in the VS Code terminal failed with "npm.ps1 cannot be loaded because running scripts is disabled on this system" (`UnauthorizedAccess`).
- **How it was detected:** The error message named `npm.ps1` and PowerShell's execution policy, so the cause was PowerShell's security setting, not a broken Node.js installation.
- **Research:** I searched the error and read the PowerShell documentation about execution policies.
- **Solution:** I ran `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, which allows local scripts for my user only.
- **Verification:** `npm -v` then returned a version number (11.20.0).

### Challenge 2: Running npm in the wrong folder

- **Problem:** `npm run dev` failed with `ENOENT: no such file or directory, open '...\package.json'`. The Vite project had also been created inside the folder of my GitHub profile README repository, which is inside OneDrive.
- **How it was detected:** The error path pointed to the wrong directory, and `pwd` confirmed I was not in the project folder.
- **Research:** I learned that npm looks for `package.json` in the current directory, and that a project nested inside another Git repository and synced by OneDrive is a bad setup.
- **Solution:** I created a clean folder (`C:\Users\Batu\projects`), generated the project there with `npm create vite@latest portfolio -- --template react`, installed dependencies and pushed it to a new GitHub repository.
- **Verification:** `pwd` showed the correct path, the dev server started on `localhost:5173`, and the repository on GitHub contained the project files.

### Challenge 3: Image import failed because of a double file extension

- **Problem:** After adding my profile photo, Vite showed "Failed to resolve import `../assets/profile.jpg` from `src/components/Hero.jsx`. Does the file exist?"
- **How it was detected:** The error overlay named the exact import, and the VS Code file explorer showed the real file name: `profile.jpg.jpeg`.
- **Research:** I found that Windows hides known file extensions, so when I renamed the file to `profile.jpg` it silently kept `.jpeg` at the end.
- **Solution:** I renamed the file to `profile.jpg` (F2 in VS Code) and enabled "File name extensions" in Windows Explorer to avoid the problem in the future.
- **Verification:** The dev server reloaded, the photo appeared in the hero section, and the production build completed without errors.

### Challenge 4: Local commits that never reached GitHub

- **Problem:** I added new features and saw them on `localhost`, but the live website did not change.
- **How it was detected:** `git status -sb` showed `main...origin/main [ahead 2]`, and `git log --oneline` showed my newest commits above `origin/main`. They existed only on my computer, because I had committed on `main` after a Pull Request was merged and forgot to push.
- **Research:** I learned the difference between local and remote branches, and that GitHub Actions only runs for what is pushed to GitHub.
- **Solution:** I ran `git push`. For future work I follow a fixed routine: `git checkout main`, `git pull`, then `git checkout -b feature/...` for each new feature.
- **Verification:** `git status -sb` no longer showed `ahead`, the Actions run turned green, and the live site showed the new features.

---

## 5.6. Technical Questions

### 1. What is the main difference between building a UI with React and with vanilla JavaScript?

In vanilla JavaScript I would select elements and change them step by step whenever something happens (imperative style). In React I describe what the UI should look like for the current data, and React updates the page when that data changes (declarative style). React also lets me split the UI into reusable components, so I do not repeat the same HTML many times.

### 2. What are components and props used for in React?

A component is a reusable piece of UI written as a function, such as `Navbar` or `ProjectCard`. Props are the inputs a parent gives to a child component. In my project, `Projects` gives each `ProjectCard` a title, description and tags, so the same component displays different projects.

### 3. What is the purpose of `useState`?

`useState` lets a component remember a value between renders and re-render when that value changes. For example, `Projects` stores the selected category, and clicking a filter button changes that state so the visible cards update automatically.

### 4. What are `package.json` and `package-lock.json` for?

`package.json` describes the project: its name, scripts such as `dev` and `build`, and the dependencies it needs. `package-lock.json` stores the exact versions of every installed package, including indirect ones. This makes installs reproducible, which is why the workflow uses `npm ci`.

### 5. What is the difference between `npm run dev` and `npm run build`?

`npm run dev` starts a development server with hot reload for working on the code locally. `npm run build` creates an optimized, minified version of the app in the `dist/` folder, which is what gets published.

### 6. What is the difference between Git and GitHub?

Git is the version control tool that runs on my computer and records the history of my files (commits, branches). GitHub is an online service that hosts Git repositories and adds features such as Pull Requests, GitHub Actions and GitHub Pages.

### 7. What different jobs do GitHub Actions and GitHub Pages have?

GitHub Actions is the automation part: it runs my workflow, installs packages and builds the project. GitHub Pages is the hosting part: it takes the built files and serves them as a public website. In this project, Actions produces the site and Pages publishes it.

### 8. What does CI/CD mean?

CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. CI means code changes are automatically built (and tested) whenever they are pushed. CD means the verified result is automatically released. In my project, pushing to `main` automatically builds and publishes the site without any manual upload.

### 9. Why can a website work on localhost but fail on GitHub Pages?

The most common reason is the base path: on localhost the app runs at `/`, but a project site on GitHub Pages runs at `/<repository-name>/`, so files requested from `/` are not found (a blank page). Other reasons are letter case in file names (Windows ignores it, but GitHub's Linux servers do not), files that exist only on my computer because they were not committed, and client-side routes that a static host cannot handle.

### 10. What happens when a website URL is typed into a browser (DNS, HTTP, server)?

The browser first needs the server's IP address, so it checks its caches and then asks a DNS resolver, which looks up the domain (for `batumirzaoglu0.github.io`, a GitHub Pages address). The browser then opens a TCP connection and, for HTTPS, performs a TLS handshake to encrypt the traffic. It sends an HTTP `GET` request for `/portfolio/`. The GitHub Pages server finds the static `index.html` and answers with `200 OK`. The browser reads the HTML, requests the linked CSS and JavaScript files, runs the React bundle, which fills the `#root` element, and finally paints the page.

---

## 5.7. References & Learning Resources Used

- **React documentation** (https://react.dev/learn and https://react.dev/learn/adding-interactivity): used to learn components, JSX, props, state, rendering lists with `.map()`, and hooks such as `useState` and `useEffect`.
- **Vite guide** (https://vite.dev/guide/): used for creating the project, the development server and the production build.
- **Vite: Deploying a Static Site** (https://vite.dev/guide/static-deploy): used for the `base` setting and as the starting point for the GitHub Actions workflow.
- **GitHub Actions documentation** (https://docs.github.com/en/actions): used to understand workflows, jobs and steps.
- **GitHub Pages documentation** (https://docs.github.com/en/pages): used to understand how static sites are published and how to select GitHub Actions as the source.
- **GitHub Pull Requests documentation** (https://docs.github.com/en/pull-requests): used for the branch and Pull Request workflow.
- **MDN Web Docs** (https://developer.mozilla.org/en-US/docs/Learn_web_development): used for semantic HTML, CSS Grid/Flexbox, media queries and the `IntersectionObserver` API.
- **Google Fonts, Inter** (https://fonts.google.com/specimen/Inter): used as the site's font.

---

## 5.8. Conclusion

**Three important concepts I learned this week**

1. How React components, props and state work together, including the hooks `useState`, `useEffect` and `useRef`.
2. How to work with branches and Pull Requests, and how to read `git status` and `git log` to understand where my commits are.
3. How CI/CD works in practice: a push triggers GitHub Actions, which builds the app and publishes it to GitHub Pages, and why the Vite `base` setting matters.

**The most difficult part**

The hardest part was keeping track of Git and deployment: understanding why a change visible on `localhost` was not on the live site, and which branch my commits were on. Reading error messages carefully, instead of guessing, was the skill that helped me most.

**Skills I want to develop in the next project**

I want to learn React Router for multi-page apps, fetching data from an API, writing basic automated tests, and checking performance and accessibility with Lighthouse. Because my main interests are software development and AI, I would also like to build a small project with Python and connect it to a web interface.

---

## AI Tools Disclosure

I used **Claude (Anthropic)** as a learning assistant during this task. It guided me step by step through setup, suggested code examples and explanations for React, Git and GitHub Actions, helped me understand error messages, and helped draft the structure and wording of this report. I typed and ran the code myself, fixed the errors that appeared, and reviewed and edited the report so that it reflects my own project. I can explain how the components and the deployment workflow work.

