
#  VR Frontend (`vrfe`)

Front-end application built with **React**, **TypeScript**, and **Vite**, serving as the user interface for the VR Video Conversion Platform. Designed for uploading, tracking, and viewing VR180 conversions with real-time updates.

---

##  Features

-  User authentication: Sign up, sign in, sign out, and profile management  
-  Video upload interface with file selection and metadata extraction  
-  Creation and monitoring of VR conversion jobs  
-  Real-time status updates via WebSockets (Django Channels)  
-  Responsive UI built with your choice of styling framework (e.g., TailwindCSS)  
-  Clean architecture supporting scalability and maintenance  

---

##  Tech Stack

| Tool            | Purpose                                      |
|-----------------|----------------------------------------------|
| React + TypeScript | Core UI and type-safe development           |
| Vite            | Ultra-fast development and build tooling      |
| REST + WebSocket | Communication with backend APIs and real-time updates |
| Fetch or Axios  | HTTP client for REST API interactions         |
| WebSocket API   | Real-time job status updates                  |
| Optional UI lib (e.g., TailwindCSS) | For styling and components     |

---

##  Getting Started

### Clone and Install Dependencies

```bash
git clone https://github.com/MadhuSuniL/vrfe.git
cd vrfe
npm install
````

### Environment Configuration

Create a `.env` file in the root with the following variables:

```ini
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000/ws
```

* `VITE_API_BASE_URL`: Base URL for REST API
* `VITE_WS_BASE_URL`: Base URL for WebSocket endpoint

---

## Available Commands

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start Vite development server |
| `npm run build`      | Bundle app for production     |
| `npm run preview`    | Preview production build      |
| `npm run lint`       | Run linting (if configured)   |
| `npm run type-check` | Run TypeScript type checking  |

---

## Development Workflow

1. Start the development server:

   ```sh
   npm run dev
   ```

   Navigate to `http://localhost:5173`.

2. Sign in or register via the UI.

3. Upload a video to trigger a VR conversion job.

4. Monitor progress through live WebSocket updates.

5. Download the completed VR180 video.

---

## API Integration

Common endpoints used:

* `POST /api/auth/register` → Register a user
* `POST /api/auth/login` → Log in and receive authentication tokens
* `GET /api/auth/me/` → Fetch current user profile
* `POST /api/vr_conv/upload-video/` → Upload a video
* `POST /api/vr_conv/jobs/create/` → Create job for conversion
* `GET /api/vr_conv/job/{id}/` → Retrieve job status
* WS: `ws://localhost:8000/ws/jobs/{job_id}/` → Listen to real-time job updates

---

## License

MIT License © 2025 — crafted by **Madhu SuniL**
