# Communication AI Assistant

An AI-powered internal communication assistant that helps users generate, refine, and finalize professional communications using **Google Gemini AI** or a configurable **Mock Provider**.

---

## 🚀 Live Demo

### Frontend
https://communication-ai-assistant-1.onrender.com/

### Backend API
https://communication-ai-assistant.onrender.com/api

---

## ✨ Features

- AI-powered communication draft generation
- Communication refinement
  - Professional
  - Friendly
  - Shorter
- Version History
- Copy Communication
- Export as TXT
- Responsive Design
- Internationalization (English / French)
- Provider-based AI integration
- Configurable Mock Provider for development

---

## 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- i18next

### Backend

- Node.js
- Express
- TypeScript
- Google GenAI SDK
- dotenv

---

# Frontend

Location

```
/frontend
```

## Project Structure

```
src
├── api
├── components
│   ├── create
│   ├── draft
│   ├── finalize
│   ├── layout
│   ├── stepper
│   └── version
├── i18n
├── models
├── services
├── utils
└── App.tsx
```

## Installation

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

## Environment Variables

Create a `.env` file.

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Production

```env
VITE_API_BASE_URL=https://communication-ai-assistant.onrender.com/api
```

## Deployment

Frontend is deployed as a **Render Static Site**.

Build Command

```bash
npm run build
```

Publish Directory

```text
dist
```

---

# Backend

Location

```
/backend
```

## Folder Structure

```
src
├── controllers
├── models
├── providers
├── routes
├── services
├── utils
├── app.ts
└── server.ts
```

## Environment Variables

### Mock Provider

```env
PORT=3000
LLM_PROVIDER=mock
```

### Gemini Provider

```env
PORT=3000
LLM_PROVIDER=gemini
GEMINI_API_KEY=YOUR_API_KEY
```

## Installation

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

## REST APIs

### Generate Draft

**POST**

```
/api/communications/draft
```

Request

```json
{
  "communicationType": "Event Recap",
  "audience": "All Employees",
  "eventName": "AI Innovation Summit",
  "eventDate": "2026-06-27",
  "keyHighlights": "AI Platform Launch",
  "tone": "Professional"
}
```

---

### Refine Draft

**POST**

```
/api/communications/refine
```

Request

```json
{
  "subject": "AI Innovation Summit",
  "communication": "Existing communication...",
  "refinement": "Professional"
}
```

---

## Architecture

The backend follows a Provider Pattern, making it easy to plug in different LLM providers.

```
Controller
        │
        ▼
CommunicationService
        │
        ▼
LLMProvider
   ├── MockProvider
   └── GeminiProvider
```

Current Providers

- Mock Provider
- Google Gemini

Adding a new provider only requires implementing the `LLMProvider` interface.

---

## Error Handling

- Request Validation
- Provider Errors
- Internal Server Errors
- Global Express Error Handling

---

## Deployment

Backend is deployed as a **Render Web Service**.

Build Command

```bash
npm run build
```

Start Command

```bash
npm start
```

---

## Future Enhancements

- OpenAI Provider
- Azure OpenAI Provider
- Anthropic Claude Provider
- PDF Export
- DOCX Export
- Authentication
- Request Logging
- Rate Limiting
- Persistent Version History
- Rich Text Editor

---

Note: The backend is hosted on Render's free tier. The first request may take up to a minute while the service wakes up. Subsequent requests are significantly faster.

## 👤 Author

**Sharmila Balasubramanian**