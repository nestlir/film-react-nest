# FILM! — Full-Stack Media Application

> Full-stack application combining a React client with a NestJS backend and MongoDB persistence.

## Overview

FILM! is a media-oriented application built as a full-stack system. The project connects a browser client to a server API backed by MongoDB and demonstrates the complete request path from UI to persistence.

## Architecture

**Frontend → NestJS API → MongoDB**

The backend exposes application endpoints and uses environment-based database configuration. MongoDB provides persistent storage for the application's domain data.

## What I demonstrated

- React frontend integration;
- NestJS backend structure;
- REST API design;
- MongoDB persistence;
- environment-based configuration;
- local development with Docker-ready infrastructure;
- API verification with Postman/curl.

## Stack

**React · NestJS · TypeScript · MongoDB · REST API · Docker**

## Backend setup

```bash
cd backend
npm ci
```

Create `.env` from `.env.example` and configure:

```env
DATABASE_DRIVER=mongodb
DATABASE_URL=mongodb://127.0.0.1:27017/practicum
```

Start the backend in development mode using the repository's debug/start script.

## Context

Originally created during full-stack training; presented here as a compact case study of frontend/backend integration, API design and persistence.
