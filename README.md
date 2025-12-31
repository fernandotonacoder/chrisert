# Chrisert - Business Website

[![Production](https://github.com/fernandotonacoder/chrisert/actions/workflows/netlify-deploy.yml/badge.svg?branch=main)](https://github.com/fernandotonacoder/chrisert/actions/workflows/netlify-deploy.yml)
[![Staging](https://github.com/fernandotonacoder/chrisert/actions/workflows/github-pages-deploy.yml/badge.svg?branch=dev)](https://github.com/fernandotonacoder/chrisert/actions/workflows/github-pages-deploy.yml)
[![Tests](https://github.com/fernandotonacoder/chrisert/actions/workflows/test.yml/badge.svg)](https://github.com/fernandotonacoder/chrisert/actions/workflows/test.yml)
[![Lint](https://github.com/fernandotonacoder/chrisert/actions/workflows/lint.yml/badge.svg)](https://github.com/fernandotonacoder/chrisert/actions/workflows/lint.yml)

A business website for a fully-working construction services company. 

## 📋 About

Currently working on a side project that will serve as the official website for a construction services company that specializes in applying ETICS (External Thermal Insulation Composite Systems) to both commercial and residential properties, providing thermal and acoustic insulation solutions for their clients. 

Built with React and JavaScript, styled using Tailwind CSS and Shadcn UI components. The project follows a professional development workflow with GitHub Pages as a staging/test environment and Netlify for production deployment. Unit and component testing is handled with Vitest to ensure code reliability.

This is a frontend-focused website that leverages Netlify Forms for contact handling, eliminating the need for a complex backend infrastructure since there's no heavy business logic or database requirements involved. 

Optimized for performance and SEO to maximize the company's online visibility.  Fully responsive design ensuring a seamless experience across all devices. 

A hands-on project bridging web development skills with real business needs. 

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React |
| Language | JavaScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn UI |
| Testing | Vitest |
| Staging | GitHub Pages |
| Production | Netlify |
| Forms | Netlify Forms |

## 🛠️ Getting Started

### Prerequisites

- Node.js (v24 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/fernandotonacoder/chrisert.git

# Navigate to the project directory
cd chrisert

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

```bash
# Run development server
npm run dev

# Run dev server accessible from other devices (e.g., mobile)
npm run dev -- --host

# Build for production
npm run build

# Run tests
npm run test

# Preview production build
npm run preview
```

## 🌐 Live Demo

- **Production:** [https://chrisert.pt](https://chrisert.pt)
- **Staging:** [https://fernandotonacoder.github.io/chrisert/](https://fernandotonacoder.github.io/chrisert/)

## 🔄 CI/CD Pipeline

| Branch | Environment | Checks |
|--------|-------------|--------|
| `dev` | GitHub Pages (Staging) | Tests, Lint, Build |
| `main` | Netlify (Production) | Tests, Lint, Security Audit, Build |

- **Branch Protection:** Both `main` and `dev` are protected with linear history required; all changes must go through PRs
- **Automated Testing:** Vitest runs on every PR to `dev` and `main`
- **Security Audits:** Weekly dependency audits + on every PR
- **Deployments:** Automatic on push to respective branches
- **Auto-Sync:** After each push to `main`, changes are automatically rebased onto `dev` to keep branches in sync

## 📁 Project Structure

```
chrisert/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── assets/        # Images, fonts, etc.
│   └── ... 
├── public/            # Static assets
├── tests/             # Test setup
└── ... 
```

## ✨ Features

- 📱 Fully responsive design
- 🔍 SEO optimized
- ⚡ Performance optimized
- 📝 Contact form with Netlify Forms integration
- 🎨 Modern UI with Shadcn components

## 📄 License

The **source code** of this project is licensed under the [MIT License](LICENSE).

**Note:** All branding, logos, images, and business-specific content are proprietary and belong to the client.  Feel free to use this codebase as a learning resource or as inspiration for your own projects! 

## 👤 Author

**Fernando Tona**
- GitHub: [@fernandotonacoder](https://github.com/fernandotonacoder)

---

*Built with ❤️ for real-world business needs*
