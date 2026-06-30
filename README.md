# Communication AI Assistant

An AI-powered internal communication assistant that helps users generate, refine, and finalize professional communications using **Google Gemini AI** or a configurable **Mock Provider**.

## 🚀 Live Demo

**Frontend**
https://communication-ai-assistant-1.onrender.com/

**Backend API**
https://communication-ai-assistant.onrender.com/api

---

## ✨ Features

- AI-powered draft generation
- Communication refinement
- Version History
- Copy & Export as TXT
- Responsive UI
- English/French support
- Gemini AI & Mock Provider

---

## 🛠 Tech Stack

**Frontend**

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- i18next

**Backend**

- Node.js
- Express
- TypeScript
- Google Gemini SDK

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd communication-ai-assistant
```

---

## 2. Frontend

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Run

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 3. Backend

```bash
cd backend
npm install
```

### Mock Provider

Create `.env`

```env
PORT=3000
LLM_PROVIDER=mock
```

### Gemini Provider

```env
PORT=3000
LLM_PROVIDER=gemini
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run

```bash
npm run dev
```

Backend runs at:

```
http://localhost:3000
```

---

## Build

Frontend

```bash
npm run build
```

Backend

```bash
npm run build
npm start
```

---

## Architecture

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

The provider pattern makes it easy to add additional AI providers with minimal changes.

---

## Future Improvements

- OpenAI Provider
- Azure OpenAI
- Claude Provider
- Authentication
- PDF/DOCX Export
- Persistent Version History

---

> **Note:** The backend is hosted on Render's free tier and may take 30–60 seconds to wake up on the first request.

## 👤 Author

**Sharmila Balasubramanian**
