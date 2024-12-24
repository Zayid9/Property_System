# Property Management System - React + Vite

Welcome to the **Property Management System**, a comprehensive solution designed to streamline property management tasks. This template provides a minimal setup to get **React** working in **Vite** with Hot Module Replacement (HMR), ESLint rules, and support for various modern JavaScript features.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Fast React Development:** With Vite and React, enjoy fast development and instant feedback with Hot Module Replacement (HMR).
- **Modern JavaScript Tools:** Benefit from modern JavaScript tools and optimizations provided by Vite, ensuring fast builds and minimal configuration.
- **ESLint Integration:** Pre-configured ESLint setup to ensure high-quality code standards across the project.
- **React Plugins:** Supports official plugins to improve React development experience:
  - `@vitejs/plugin-react`: Uses Babel for Fast Refresh
  - `@vitejs/plugin-react-swc`: Uses SWC for Fast Refresh

## Project Structure

This project is based on the Vite + React template, and it includes the following structure:

package/
  .eslintrc.cjs
  .gitignore
  index.html
  jest.config.js
  netlify.toml
  package.json
  public/
  README.md
  src/
    App.css
    App.jsx
    assets/
      images/
    components/
      container/
      forms/
      shared/
    index.css
    layouts/
      blank/
      full/
    main.jsx
    routes/
      Router.jsx
    services/
      api.js
    theme/
      DefaultColors.jsx
      Shadows.jsx
      Typography.jsx
    utils/
      PrivateRoute.jsx
    views/
      authentication/
      dashboard/
      LeaseManagement/
      properties/
      register/
      tenants/
      utilities/
      ...
  vite.config.js


## Installation

To get started with the **Property Management System**, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/property-management-system.git
   cd property-management-system
