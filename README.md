#  Car RepAIr Estimator - Frontend Documentation

## Overview

This repository contains the frontend for the AI-powered car damage estimation platform.
It is built using Vite + React, with modern tooling for state management, forms, UI, and API integration.

## 🔒 License

This project is **proprietary**. All rights reserved.

Unauthorized copying, use, modification, or distribution of this project, in whole or in part, is strictly prohibited without explicit written permission from all contributors.

## Development
Set up Prettier and ESLint with autosave on your IDE before starting to work with the Project!

### Technical Documentation
- Frontend technical docs: `docs/FRONTEND.md`

### Environment Variables

| Variable                | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `VITE_API_PROXY_TARGET` | Backend API target for Vite proxy during development |

Example `.env`
```
VITE_API_PROXY_TARGET=http://localhost:5001
```

### Requirements

- Node.js (LTS recommended)
- npm / yarn

### Installation Steps

1. Clone the repository:

```
git clone https://github.com/AntoninaSych/ai-car-inspection-fe
cd frontend
```

2. Install dependencies:

```
npm install
# or yarn
```

Create `.env`:

```
VITE_API_PROXY_TARGET=http://localhost:5001
```

Run the development server:

```
npm run dev
```

Build production bundle:

```
npm run build
```

Preview production build:
```
npm run preview
```

Useful npm Scripts
```jsonc
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
        "test": "vitest"
    }
}
```

### How to commit your changes
We follow the rules of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to create clean and more understandable commits.

### Code Quality Setup
This section describes the code quality pipeline using:
- Husky (Git hooks)
- lint-staged
- ESLint (auto-fix)
- Prettier (auto-format)

### What Was Implemented

#### Pre-commit hook

- Runs lint-staged inside the frontend package

- Automatically applies:
  - eslint --fix
  - prettier --write
- Only staged files are processed → fast execution

#### Pre-push hook

- run tests

#### Developer experience improvements

- Ensures all committed code is auto-formatted and linted
- Reduces noise in PR diffs
- Prevents inconsistent code style between developers

#### Required Steps for Developers

Each team member must run the following commands after pulling the latest changes:

1. Install dependencies
```
npm install
```
This step automatically installs Husky hooks (pre-commit, pre-push).

2(Optional but recommended) Re-enable Git hook execution

```
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```
After these steps, hooks will execute automatically.
