# GitHub Issues Browser

A modern React application for browsing GitHub repository issues with advanced filtering and search.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the project root:

```env
# Required: GitHub Personal Access Token
VITE_GITHUB_TOKEN=your_github_token_here

# Optional: Custom GitHub API URL (defaults to https://api.github.com/graphql)
VITE_GITHUB_API_URL=https://api.github.com/graphql

# Optional: Repository to browse (defaults to facebook/react)
VITE_GITHUB_OWNER=facebook
VITE_GITHUB_REPO=react
```

**Get a GitHub token:** https://github.com/settings/tokens  
**Required scopes:** `public_repo` (or `repo` for private repositories)

### 2. Install & Run

```bash
yarn install
yarn dev
```

Visit http://localhost:3000

---

## 🛠️ Available Scripts

```bash
yarn dev                  # Start development server
yarn build                # Build for production
yarn preview              # Preview production build
yarn test                 # Run tests
yarn test:coverage        # Run tests with coverage
yarn lint                 # Run ESLint
yarn codegenTypes         # Generate TypeScript types from GraphQL
yarn codegenSchema        # Download GraphQL schema
```

---

## 🏗️ Architecture

- **Type:** SPA with Client-Side Rendering (CSR)
- **Framework:** React 19 + TypeScript
- **Routing:** React Router 7
- **Data:** Apollo Client + GraphQL
- **Styling:** Styled Components
- **Architecture:** Feature-Sliced Design (FSD)

---

## 📁 Project Structure

```
src/
├── app/              # Application setup (config, apollo init)
├── pages/            # Route pages
├── features/         # User features (combining entities)
├── entities/         # Business entities (issue, comment)
├── shared/           # Reusable utilities, UI components
└── graphql/          # GraphQL schema, types, helpers
```

---

## 📝 Future Improvements

- [ ] Add page-based pagination
- [ ] Add proxy not to disclose GIT token to client
- [ ] Add skeletons for loading states
- [ ] Improve test coverage
- [ ] Add E2E tests
- [ ] Add Husky for pre-commit hooks (eslint, prettier, test run)
- [ ] Add URL search params (?search=&filter=)
- [ ] Add theme provider (dark mode)
