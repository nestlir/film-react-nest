# FILM! — Full-Stack Media Application

Full-stack media application combining a React client, a NestJS API and MongoDB persistence.

## Architecture

```text
React frontend → NestJS REST API → MongoDB
```

The project demonstrates the complete path from browser UI through server-side application logic to persistent storage.

## Stack

**Frontend:** React  
**Backend:** NestJS · TypeScript  
**Database:** MongoDB · Mongoose  
**API:** REST  
**Tooling:** ESLint · Prettier · Jest

## Repository structure

```text
backend/          NestJS application and API
.github/workflows Automated checks
README.md         Project overview
```

## Backend setup

Requirements:

- Node.js 20+
- npm
- MongoDB

Install dependencies:

```bash
cd backend
npm ci
```

Create a local environment file:

```bash
cp .env.example .env
```

Configure the database connection:

```env
DATABASE_DRIVER=mongodb
DATABASE_URL=mongodb://127.0.0.1:27017/practicum
```

Start development mode:

```bash
npm run start:dev
```

## Production

```bash
npm run build
npm run start:prod
```

## Testing and quality

```bash
npm run test
npm run test:cov
npm run test:e2e
npm run lint
```

## Deployment

The backend requires a Node.js runtime and MongoDB, so it cannot be deployed to GitHub Pages. The repository is structured for deployment to a backend hosting platform or container environment; GitHub Actions are used for automated checks.

## Project value

This project is an architecture-focused full-stack case study demonstrating React/NestJS integration, REST API design, environment-based configuration and MongoDB persistence.
