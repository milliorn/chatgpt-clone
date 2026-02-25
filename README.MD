# ChatGPT Clone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/milliorn/chatgpt-clone.svg)](https://github.com/milliorn/chatgpt-clone/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/milliorn/chatgpt-clone.svg)](https://github.com/milliorn/chatgpt-clone/network)
[![GitHub issues](https://img.shields.io/github/issues/milliorn/chatgpt-clone.svg)](https://github.com/milliorn/chatgpt-clone/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/milliorn/chatgpt-clone.svg)](https://github.com/milliorn/chatgpt-clone/pulls)

---

## Table of Contents

1. [Description](#description)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Running the Application](#running-the-application)
9. [How It Works](#how-it-works)
10. [Available Scripts](#available-scripts)
11. [Building for Production](#building-for-production)
12. [Troubleshooting](#troubleshooting)
13. [Contributing](#contributing)
14. [License](#license)

---

## Description

This repository contains a full-stack ChatGPT clone that allows you to run an OpenAI-powered conversational AI in your local browser. It is composed of two independently running processes: a lightweight **Express.js backend** that acts as a secure proxy to the OpenAI API, and a **React + TypeScript frontend** served by Vite. The backend exists specifically so that your OpenAI API key is never exposed to the client.

The application supports multiple simultaneous chat sessions, tracks conversation history in client-side state, and provides a clean, responsive UI inspired by the original ChatGPT interface.

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│                                                         │
│   React (Vite Dev Server — http://localhost:5173)       │
│                                                         │
│   ┌─────────────┐   POST /completions   ┌────────────┐  │
│   │  Frontend   │ ─────────────────────▶│  Backend   │  │
│   │  (React)    │ ◀─────────────────────│  (Express) │  │
│   └─────────────┘      JSON response    └─────┬──────┘  │
│                                               │         │
└───────────────────────────────────────────────┼─────────┘
                                                │ HTTPS
                                    ┌───────────▼──────────┐
                                    │   OpenAI API          │
                                    │ /v1/chat/completions  │
                                    │   (gpt-3.5-turbo)     │
                                    └──────────────────────┘
```

The frontend **never** communicates directly with OpenAI. All API requests flow through the Express server running on port `8000`, which injects the secret API key server-side before forwarding the request. This is the correct pattern for any production-adjacent application that integrates a third-party API key.

---

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Frontend framework | React | 19 |
| Language | TypeScript | 5.9 |
| Build tool / Dev server | Vite | 7 |
| Backend framework | Express | 5 |
| Runtime | Node.js | ≥ 18 (ESM required) |
| API | OpenAI Chat Completions | gpt-3.5-turbo |
| Environment variables | dotenv | 17 |
| CORS middleware | cors | 2.8 |
| Icon library | react-icons | 5 |
| Dev process manager | nodemon | 3 |
| Concurrent process runner | concurrently | (via npx) |

---

## Project Structure

```text
chatgpt-clone/
├── .env                        # Secret environment variables (never commit this)
├── .gitignore
├── index.html                  # Vite HTML entry point
├── package.json
├── server.js                   # Express backend (API proxy to OpenAI)
├── tsconfig.json               # TypeScript config for src/
├── tsconfig.node.json          # TypeScript config for vite.config.ts
├── vite.config.ts              # Vite configuration
├── public/
│   └── robots.txt
└── src/
    ├── App.tsx                 # Root component — owns all chat state
    ├── Chat.tsx                # TypeScript interface: Chat { title, role, content }
    ├── index.css               # Global styles + responsive media queries
    ├── main.tsx                # React DOM entry point
    ├── vite-env.d.ts           # Vite environment type declarations
    └── components/
        ├── BottomSection.tsx   # Input field + send button + disclaimer
        ├── Info.tsx            # Disclaimer text
        ├── InputButton.tsx     # Send button with loading spinner
        ├── PageFeed.tsx        # Renders current session message list
        └── SideBar.tsx         # Chat history list + "New Chat" button
```

---

## Prerequisites

Before you begin, ensure the following tools are installed on your machine.

### 1. Node.js (version 18 or higher)

This project uses ES Modules (`"type": "module"` in `package.json`), which requires Node.js 18+. To verify your installed version:

```bash
node --version
```

If you need to install or upgrade Node.js, use the official installer at [https://nodejs.org](https://nodejs.org) or a version manager such as [nvm](https://github.com/nvm-sh/nvm):

```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use Node.js 20 LTS
nvm install 20
nvm use 20
```

### 2. npm (bundled with Node.js)

```bash
npm --version
```

### 3. An OpenAI API Key

You must have an active OpenAI account and a valid API key with access to `gpt-3.5-turbo`. You can obtain one at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).

> **Important:** OpenAI API usage is billed. Review the [pricing page](https://openai.com/pricing) before sending requests. Each response in this application is capped at 100 tokens to limit consumption.

---

## Installation

Follow these steps exactly to set up the project from scratch.

### Step 1 — Clone the repository

```bash
git clone https://github.com/milliorn/chatgpt-clone.git
```

### Step 2 — Navigate into the project directory

```bash
cd chatgpt-clone
```

### Step 3 — Install all dependencies

This command installs all runtime and development dependencies declared in `package.json`, including React, Express, Vite, TypeScript, and supporting libraries.

```bash
npm install
```

A `node_modules/` directory will be created in the project root. This directory is excluded from version control via `.gitignore` and should never be committed.

---

## Configuration

### Creating the `.env` file

The backend reads your OpenAI API key from an environment variable at startup. You must create a `.env` file in the **project root** (the same directory as `server.js` and `package.json`).

```bash
# From the project root
touch .env
```

Open `.env` in your editor and add the following line, replacing the placeholder with your actual key:

```env
CHAT_GPT_API_KEY=your_openai_api_key_here
```

> **Critical:** The environment variable name is `CHAT_GPT_API_KEY`. The backend server reads exactly this name via `process.env.CHAT_GPT_API_KEY`. Using any other variable name (e.g. `OPENAI_API_KEY`) will result in `undefined` being sent as the Authorization token and every request to OpenAI will return a `401 Unauthorized` error.
>
> **Security:** The `.env` file contains a secret credential and must **never** be committed to version control. Verify that `.env` appears in your `.gitignore` file. If you accidentally commit an API key, invalidate it immediately at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) and generate a new one.

---

## Running the Application

The application has two independent processes that must both be running simultaneously: the **backend** (Express, port `8000`) and the **frontend** (Vite, port `5173`).

### Option A — Run both servers with a single command (recommended)

```bash
npm run dev
```

This uses `concurrently` to start both the backend and the frontend in the same terminal session. You will see interleaved log output from both processes. The application is ready when you see both:

```text
[backend]  App is listening on http://localhost:8000
[frontend] ➜  Local:   http://localhost:5173/
```

Open your browser and navigate to **<http://localhost:5173>**.

### Option B — Run servers in separate terminals

If you need to observe each process's log output independently (useful for debugging), open two terminal windows.

**Terminal 1 — Backend:**

```bash
npm run dev:backend
```

The backend starts with `nodemon`, which automatically restarts the Express server whenever `server.js` is modified. Expected output:

```text
[nodemon] starting `node server.js`
App is listening on http://localhost:8000
```

**Terminal 2 — Frontend:**

```bash
npm run dev:frontend
```

Vite starts its development server with Hot Module Replacement (HMR) enabled. Expected output:

```text
  VITE v7.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://0.0.0.0:5173/
```

Open your browser and navigate to **<http://localhost:5173>**.

> **Note:** The frontend is configured with `host: "0.0.0.0"`, meaning it is accessible from other devices on your local network using your machine's local IP address (e.g., `http://192.168.1.x:5173`). This is useful for testing on mobile devices.

---

## How It Works

### Data Flow — Step by Step

1. The user types a message into the input field in the browser and clicks the send button.
2. The `InputButton` component calls `getMessage()` in `App.tsx`, setting a local loading state that displays a spinner.
3. `App.tsx` sends a `POST` request to `http://localhost:8000/completions` with a JSON body of `{ message: "user input" }`.
4. The Express server receives the request, reads `CHAT_GPT_API_KEY` from the environment, and constructs an authenticated request to `https://api.openai.com/v1/chat/completions`.
5. The request body sent to OpenAI specifies the model (`gpt-3.5-turbo`), wraps the user message in the required `messages` array format, and caps the response at `max_tokens: 100`.
6. OpenAI returns a JSON response containing a `choices` array. The server forwards the entire response body to the frontend.
7. The frontend reads `data.choices[0].message` (an object with `role` and `content`) and stores it in the `message` state variable.
8. A `useEffect` hook in `App.tsx` watches for changes to `message`. When a new message arrives, it appends both the user's original message and the AI's response to the `previousChats` state array as two new `Chat` objects, both tagged with the current session title.
9. The `PageFeed` component filters `previousChats` by the current title and renders the conversation list.
10. The `SideBar` component derives a list of unique titles from `previousChats` and renders them for navigation. Clicking a title restores the view of that session.

### State Management

All state is managed locally in `App.tsx` using React hooks. There is no external state management library and no persistent storage — chat history exists only for the duration of the browser session. Refreshing the page clears all history.

| State variable | Type | Purpose |
| --- | --- | --- |
| `currentTitle` | `string` | Title of the active chat session (set to the first user message) |
| `message` | `{ role: string; content: string }` | The latest response message from OpenAI |
| `previousChats` | `Chat[]` | Full history of all messages across all sessions |
| `value` | `string` | Controlled value of the text input field |

---

## Available Scripts

All scripts are defined in `package.json` and run via `npm run <script>`.

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `concurrently "npm run dev:backend" "npm run dev:frontend"` | Starts both servers concurrently |
| `dev:backend` | `npx nodemon server.js` | Starts the Express server with auto-restart on file changes |
| `dev:frontend` | `vite --host` | Starts the Vite dev server, accessible on the network |
| `build` | `tsc && vite build` | Type-checks the project, then compiles and bundles for production |
| `preview` | `vite preview` | Serves the production build locally for inspection |
| `prod` | `npm run build && npm run preview` | Builds and immediately previews the production output |
| `git-update` | `git fetch && git pull` | Fetches and pulls the latest changes from the remote |

---

## Building for Production

The `build` script first runs the TypeScript compiler (`tsc`) in check-only mode (`"noEmit": true` in `tsconfig.json`) to catch any type errors, then runs `vite build` to produce an optimized production bundle.

```bash
npm run build
```

Output is written to the `dist/` directory. To verify the production build locally before deploying:

```bash
npm run preview
```

This serves the `dist/` assets via Vite's preview server (default port `4173`).

> **Deployment note:** This project's Express backend is a long-running Node.js process and must be hosted on a server that supports that (e.g., a VPS, Railway, Render, Fly.io). The static frontend in `dist/` can be served from any static host (Vercel, Netlify, Cloudflare Pages), but you must update the fetch URL in `App.tsx` from `http://localhost:8000/completions` to your deployed backend's URL.

---

## Troubleshooting

### The page loads but messages return no response or an error

- Verify both the backend and frontend are running.
- Open browser DevTools (F12) → Network tab → look for a failed `POST` request to `localhost:8000/completions`.
- Check the backend terminal for error output from the OpenAI API.

### `401 Unauthorized` from OpenAI

- Your `CHAT_GPT_API_KEY` value in `.env` is incorrect, invalid, or the variable name is misspelled.
- Stop the backend, correct the `.env` file, and restart with `npm run dev:backend`.

### `ECONNREFUSED` or fetch errors in the browser

- The Express backend is not running. Start it with `npm run dev:backend` and confirm you see `App is listening on http://localhost:8000`.

### `Cannot find module` or TypeScript errors on startup

- Delete `node_modules/` and reinstall: `rm -rf node_modules && npm install`.
- Verify your Node.js version is 18 or higher: `node --version`.

### Responses are being cut off mid-sentence

- This is expected. The backend hardcodes `max_tokens: 100` in `server.js`. To increase the response length, edit line 32 in `server.js` and change the value:

  ```js
  max_tokens: 500,  // increase as needed
  ```

  The backend will automatically reload via nodemon.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository on GitHub.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure there are no TypeScript errors: `npm run build`
4. Commit your changes with a descriptive message.
5. Push to your fork and open a Pull Request against the `main` branch.

Please open an issue first for substantial changes so the approach can be discussed before implementation work begins.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the repository for full license terms.
