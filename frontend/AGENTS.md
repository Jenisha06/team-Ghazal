<!-- BEGIN:nextjs-agent-rules -->
# OpsMemory AI - Project Architecture & API Code Flow Documentation

## 1. Project Overview

**Project Name**: OpsMemory AI  
**Repository**: `team-Ghazal`  
**Purpose**: OpsMemory AI is an enterprise AI-powered operational memory platform designed for maintenance ticketing, incident management, and automated AI analysis. It captures technician notes from completed tickets, analyzes historical patterns using an on-premise/local LLM (Ollama / Llama 3.1), and generates root cause diagnoses, repair methods, preventive actions, and recommendations.

### Core Incident Lifecycle:
```
System Incident / Monitoring
            │
            ▼
    Ticket Created (POST /tickets)
            │
            ▼
    Assigned to Engineer / Technician
            │
            ▼
    Technician Performs Repair & Enters Notes (PATCH /tickets/:ticket_id)
            │
            ▼
    Ticket Status -> "Closed"
            │
            ▼
    AI Analysis Triggered (POST /analyze/:ticket_id via Ollama & Redis Cache)
            │
            ▼
    Knowledge Saved (ai_analysis Supabase Table) & Displayed on Dashboard
```

---

## 2. Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React, Lucide React Icons
- **Styling**: Tailwind CSS
- **Authentication Helpers**: `jwt-decode`, cookie storage (`token`)

### Backend
- **Framework**: Node.js, Express.js (ES Modules, running on Port 5000)
- **Security & Auth**: `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`
- **Database Client**: `@supabase/supabase-js`
- **Caching**: Redis client (ioredis / node-redis)

### Database
- **Provider**: Supabase PostgreSQL
- **Key Tables**:
  - `users`: User identity, hashed passwords, roles (`admin`, `technician`), `engineer_id`
  - `tickets`: Incident records (`ticket_id`, `atm_id`, `issue`, `status`, `engineer_id`, `technician_notes`, `location`, `asset_model`, `created_at`, `updated_at`)
  - `ai_analysis`: Stored AI insights (`ticket_id`, `root_cause`, `repair_method`, `repair_type`, `confidence_score`, `preventive_action`, `historical_pattern`, `recommended_fix`, `similar_tickets_found`)

### AI Pipeline
- **LLM Engine**: Local Ollama Server (`llama3.1:8b`)
- **Caching Layer**: Redis (`analysis:<issue_keyword>` with 24h TTL)

---

## 3. Project Directory & Folder Structure

```
team-Ghazal/
├── backend/
│   ├── config/
│   │   ├── redis.js            # Redis client configuration
│   │   └── supabase.js         # Supabase client instance (SUPABASE_URL, SUPABASE_KEY)
│   ├── controllers/
│   │   ├── aiController.js     # Orchestrates ticket retrieval, similarity search, Redis cache, Ollama call, & DB save
│   │   ├── authController.js   # Login endpoint logic, password verification, & JWT cookie generation
│   │   └── ticketController.js # CRUD handlers for tickets (getTickets, getTicket, createTicket, updateTicket)
│   ├── middleware/
│   │   ├── authMiddleware.js   # verifyToken Express middleware (validates req.cookies.token via JWT)
│   │   └── roleMiddleware.js   # requireRole Express RBAC middleware (checks req.user.role)
│   ├── routes/
│   │   ├── aiRoutes.js         # POST /analyze/:ticket_id -> aiController.analyzeCurrentTicket
│   │   ├── authRoutes.js       # POST /auth/login -> authController.login
│   │   ├── technicianRoutes.js # GET /technician/tickets -> assigned tickets query
│   │   └── ticketRoutes.js     # GET /tickets, GET /tickets/:id, POST /tickets, PATCH /tickets/:id
│   ├── scripts/
│   │   └── hashUsers.js        # Password migration script for bcrypt hashing
│   ├── services/
│   │   └── aiService.js        # Formats prompt with ticket data & invokes Ollama LLM
│   ├── utils/
│   │   ├── hash.js             # bcrypt hashPassword & comparePassword utilities
│   │   └── jwt.js              # generateToken (jwt.sign with 24h expiration)
│   ├── .env                    # Environment variables (JWT_SECRET, SUPABASE_URL, SUPABASE_KEY, REDIS_URL)
│   ├── package.json
│   └── server.js               # Express application entry point (Port 5000, CORS, CookieParser)
│
├── frontend/
│   ├── app/
│   │   ├── aiEngine/
│   │   │   └── page.jsx        # AI Engine operational dashboard view
│   │   ├── analytics/
│   │   │   └── page.jsx        # Operational analytics & distribution insights
│   │   ├── dashboard/
│   │   │   └── page.jsx        # Main Admin Dashboard (Live metrics, Open vs Closed chart, Recent Tickets)
│   │   ├── login/
│   │   │   └── page.jsx        # Login page (calls POST /auth/login, redirects by role)
│   │   ├── security/
│   │   │   └── page.jsx        # Enterprise security monitoring view
│   │   ├── technicianDashboard/
│   │   │   └── page.jsx        # Technician assigned workload view
│   │   ├── ticketDetails/
│   │   │   └── page.jsx        # Ticket Detail page (/ticketDetails?id=T0059) with full breakdown
│   │   ├── tickets/
│   │   │   └── page.jsx        # Admin Ticket Management (Live API data & real-time filtering)
│   │   ├── layout.js
│   │   └── page.js             # OpsMemory AI landing page
│   ├── lib/
│   │   ├── api.js              # apiFetch() & apiRequest() HTTP helpers to http://localhost:5000
│   │   ├── auth.js             # getToken(), getUser(), saveToken(), logout() cookie helpers
│   │   └── protectedRoute.js   # requireAdmin() & requireTechnician() client guards
│   ├── middleware.js           # Next.js Route Protection & RBAC Middleware (/dashboard, /tickets, /analytics)
│   ├── package.json
│   └── AGENTS.md               # Architecture & Documentation Guide
```

---

## 4. API Endpoints & Detailed Logic Breakdown

### Auth Endpoints

#### `POST /auth/login`
- **Route Handler**: `backend/routes/authRoutes.js` -> `backend/controllers/authController.js`
- **Authentication**: Public
- **Request Body**: `{ email, password }`
- **Detailed Step-by-Step Logic**:
  1. Validates presence of `email` and `password`. Returns `400 Bad Request` if missing.
  2. Queries Supabase `users` table: `.from("users").select("*").eq("email", email).single()`.
  3. Returns `401 Unauthorized` (`Invalid Credentials`) if user record does not exist or DB query errors out.
  4. Compares plain text password against `user.password` stored in DB using `comparePassword(password, user.password)` (bcrypt comparison).
  5. Returns `401 Unauthorized` (`Invalid Credentials`) if password comparison fails.
  6. Generates a signed JWT token via `generateToken(user)` with payload `{ id, email, role, engineer_id }` and 24-hour expiration.
  7. Sets HTTP cookie `token` (`maxAge: 24h`, `sameSite: "lax"`, `httpOnly: false`).
  8. Returns HTTP `200 OK` JSON response:
     ```json
     {
       "success": true,
       "token": "<jwt_token>",
       "user": {
         "id": "...",
         "name": "...",
         "email": "...",
         "role": "admin|technician",
         "engineer_id": "..."
       }
     }
     ```

---

### Ticket Endpoints

#### `GET /tickets`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Middleware**: `verifyToken` (`backend/middleware/authMiddleware.js`)
- **Detailed Logic**:
  1. Express middleware `verifyToken` checks `req.cookies.token`, decodes JWT via `jwt.verify(token, process.env.JWT_SECRET)`, and attaches `req.user`. Returns `401 Unauthorized` if token is missing or invalid.
  2. Executes Supabase query: `.from("tickets").select("*")`.
  3. Returns `500 Internal Server Error` if DB fails, or returns JSON array of all ticket objects.

#### `GET /tickets/:ticket_id`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Middleware**: `verifyToken`
- **Parameters**: `ticket_id` (URL parameter, e.g. `T0059` or `1`)
- **Detailed Logic**:
  1. Middleware verifies JWT token.
  2. Extracts `ticket_id` from `req.params`.
  3. Executes Supabase query: `.from("tickets").select("*").eq("ticket_id", ticket_id).single()`.
  4. Returns `404 Not Found` (`Ticket not found`) if no record matches, or returns single ticket JSON object.

#### `POST /tickets`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Authentication**: Public / System Ingestion
- **Request Body**: Ticket object (`{ issue, atm_id, location, engineer_id, ... }`)
- **Detailed Logic**:
  1. Reads ticket payload from `req.body`.
  2. Inserts new record into Supabase `tickets` table: `.from("tickets").insert(ticket).select()`.
  3. Returns `500` on error, or `201 Created` with inserted ticket data.

#### `PATCH /tickets/:ticket_id`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Parameters**: `ticket_id`
- **Request Body**: `{ technician_notes }`
- **Detailed Logic**:
  1. Updates Supabase record: `.from("tickets").update({ technician_notes, status: "Closed" }).eq("ticket_id", ticket_id).select().single()`.
  2. If DB error occurs, returns `500 Internal Server Error`.
  3. Triggers AI Analysis asynchronously via `analyzeCurrentTicket(ticket_id)` from `aiController.js`.
  4. Returns HTTP `200 OK` JSON response:
     ```json
     {
       "success": true,
       "message": "Ticket completed successfully.",
       "data": { ...updatedTicket },
       "analysis": { ...aiAnalysisResult }
     }
     ```

---

### AI Analysis Endpoints

#### `POST /analyze/:ticket_id`
- **Route Handler**: `backend/routes/aiRoutes.js` -> `backend/controllers/aiController.js`
- **Parameters**: `ticket_id`
- **Detailed Logic**:
  1. Fetches current ticket from Supabase `tickets` table by `ticket_id`. Throws error if ticket not found.
  2. Extracts search keywords from `ticket.issue` (first 3 words).
  3. Finds similar historical tickets in Supabase via ILIKE query: `.from("tickets").select("*").ilike("issue", %keywords%).limit(10)`.
  4. Excludes current ticket from historical results.
  5. Checks Redis cache using key `analysis:<lowercased_issue>`. If cached, returns parsed JSON immediately (**Cache Hit**).
  6. On **Cache Miss**, invokes Ollama service `analyzeTicket(ticket, similarTickets)` in `backend/services/aiService.js`.
  7. Parses AI JSON response (fields: `root_cause`, `repair_method`, `repair_type`, `confidence_score`, `preventive_action`, `historical_pattern`, `recommended_fix`).
  8. Saves analysis response to Redis with 24-hour expiration (`EX: 86400`).
  9. Inserts analysis record into Supabase `ai_analysis` table (`ticket_id`, `root_cause`, `repair_method`, `repair_type`, `confidence_score`, `preventive_action`, `historical_pattern`, `recommended_fix`, `similar_tickets_found`).
  10. Returns HTTP `200 OK` JSON response:
      ```json
      {
        "success": true,
        "ticket_id": "...",
        "similar_tickets_found": 3,
        "analysis_saved": true,
        "historical_tickets": [ ... ],
        "analysis": { ... }
      }
      ```

---

### Technician Endpoints

#### `GET /technician/tickets`
- **Route Handler**: `backend/routes/technicianRoutes.js`
- **Middleware**: `verifyToken`
- **Detailed Logic**:
  1. Reads `engineer_id` from decoded token `req.user.engineer_id`.
  2. Queries Supabase: `.from("tickets").select("*").eq("engineer_id", engineer_id)`.
  3. Returns `500` on error, or returns JSON array of tickets assigned to the logged-in technician.

---

## 5. Authentication & Role-Based Access Control (RBAC) Flow

### Client-Side Authentication (`frontend/lib/auth.js` & `frontend/lib/protectedRoute.js`)
- `getToken()`: Parses `document.cookie` for `token=...`.
- `getUser()`: Uses `jwtDecode(token)` to extract `{ id, email, role, engineer_id }`.
- `requireAdmin()`: Called on component mount. Checks if user token exists and `user.role.toLowerCase() === "admin"`. Redirects non-admin users to `/login`.
- `logout()`: Clears `token` cookie and redirects to `/login`.

### Next.js Server Middleware (`frontend/middleware.js`)
- Protects `/dashboard`, `/analytics`, `/tickets`, `/aiEngine`, `/security`.
- Checks for `token` cookie.
- Decodes JWT and ensures `user.role.toLowerCase() === "admin"`.
- Protects `/technicianDashboard` requiring `user.role.toLowerCase() === "technician"`.
- Redirects unauthorized requests to `/login`.

### Express Backend Middleware (`backend/middleware/authMiddleware.js` & `roleMiddleware.js`)
- `verifyToken`: Reads `req.cookies.token`, verifies via `jwt.verify(token, JWT_SECRET)`, attaches `req.user`.
- `requireRole(...roles)`: Verifies `req.user.role` matches allowed roles before controller execution.

---

## 6. Guidelines for AI Agents

1. **Do Not Rewrite Working Code**: Maintain existing patterns, API contracts, and file boundaries.
2. **Reuse Existing APIs**: Always check `backend/routes/` and `backend/controllers/` before introducing any new logic.
3. **No Direct Database Access from Frontend**: All database operations must go through Express backend controllers via `apiFetch()`.
4. **Preserve Design System**: Retain existing OpsMemory AI styling (colors, typography, cards, borders, icons).
5. **Handle All UI States**: Ensure components implement Loading indicators, Error banners with Retry triggers, and Empty state views.
<!-- END:nextjs-agent-rules -->
