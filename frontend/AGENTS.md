<!-- BEGIN:nextjs-agent-rules -->
# OpsMemory AI - Project Architecture & API Code Flow Documentation

## 1. Project Overview

**Project Name**: OpsMemory AI  
**Repository**: `team-Ghazal`  
**Purpose**: OpsMemory AI is an enterprise AI-powered operational memory platform designed for maintenance ticketing, incident management, and automated AI analysis. It captures technician notes from completed tickets, analyzes historical patterns using an on-premise/local LLM (Ollama / Llama 3.1), and generates root cause diagnoses, repair methods, preventive actions, and recommendations.

### Core Incident & Dual-Phase AI Lifecycle:
```
                System Incident / Monitoring
                             │
                             ▼
               Ticket Created (Status = "Open")
                             │
                             ▼
         Phase 1: Predictive AI Recommendation
 (AI scans past CLOSED tickets & presents Suggested Fix)
                             │
                             ▼
           Assigned to Engineer / Technician
                             │
                             ▼
         Technician Work & Notes Entry (Status = "In Progress")
                             │
                             ▼
      Technician Submits Completion (Status = "Closed")
                             │
                             ▼
               Database Lock & Resolution Time
       (resolution_time calculated; DB locked against edits)
                             │
                             ▼
         Phase 2: Knowledge Base Enrichment
  (AI extracts root_cause, repair_method, & preventive_action)
                             │
                             ▼
  Saved to tickets & ai_analysis tables as Permanent Historic Knowledge
```

---

## 2. Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React, Lucide React Icons
- **Styling**: Vanilla CSS with Tailwind CSS tokens
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
  - `tickets`: Incident records (`ticket_id`, `atm_id`, `issue`, `status`, `engineer_id`, `engineer`, `technician_notes`, `resolution_time`, `root_cause`, `repair_method`, `repair_type`, `preventive_action`, `location`, `asset_model`, `created_date`)
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
│   │   └── ticketController.js # CRUD handlers for tickets with status locking, resolution_time calculation & AI sync
│   ├── middleware/
│   │   ├── authMiddleware.js   # verifyToken Express middleware (validates req.cookies.token via JWT)
│   │   └── roleMiddleware.js   # requireRole Express RBAC middleware (checks req.user.role)
│   ├── routes/
│   │   ├── aiRoutes.js         # POST /analyze/:ticket_id -> aiController.analyzeCurrentTicket
│   │   ├── authRoutes.js       # POST /auth/login -> authController.login
│   │   ├── technicianRoutes.js # GET /technician/tickets -> assigned tickets query for logged-in technician
│   │   └── ticketRoutes.js     # GET /tickets, GET /tickets/:id, POST /tickets, PUT/PATCH /tickets/:id
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
│   │   │   └── page.jsx        # Admin Operational Analytics (Live DB metrics, standard TopNav: Dashboard | Tickets | Analytics)
│   │   ├── dashboard/
│   │   │   └── page.jsx        # Main Admin Dashboard (Live metrics, Open vs Closed chart, Recent Tickets)
│   │   ├── login/
│   │   │   └── page.jsx        # Login page (calls POST /auth/login, redirects by role)
│   │   ├── technicianDashboard/
│   │   │   └── page.jsx        # Technician assigned workload overview & Technician TopNav
│   │   ├── technicianTickets/
│   │   │   └── page.jsx        # Technician assigned tickets list (GET /technician/tickets, simplified filters)
│   │   ├── technicianTicketDetails/
│   │   │   └── page.jsx        # Dedicated Technician Ticket Detail (Editable notes form, status toggle, DB lock badge)
│   │   ├── ticketDetails/
│   │   │   └── page.jsx        # Admin Ticket Detail (/ticketDetails?id=...) strictly protected by requireAdmin()
│   │   ├── tickets/
│   │   │   └── page.jsx        # Admin Ticket Management (Full DB ticket dataset, 4-field filters, requireAdmin())
│   │   ├── layout.js
│   │   └── page.js             # OpsMemory AI landing page
│   ├── lib/
│   │   ├── api.js              # apiFetch() & apiRequest() HTTP helpers to http://localhost:5000
│   │   ├── auth.js             # getToken(), getUser(), saveToken(), logout() cookie helpers
│   │   └── protectedRoute.js   # requireAdmin() & requireTechnician() client guards
│   ├── middleware.js           # Next.js Route Protection & RBAC Middleware (/dashboard, /tickets, /analytics, /technicianDashboard, /technicianTickets, /technicianTicketDetails)
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
  3. Returns `401 Unauthorized` (`Invalid Credentials`) if user record does not exist.
  4. Compares plain text password against `user.password` stored in DB using `comparePassword(password, user.password)`.
  5. Returns `401 Unauthorized` (`Invalid Credentials`) if password comparison fails.
  6. Generates a signed JWT token via `generateToken(user)` with payload `{ id, email, role, engineer_id }` and 24h expiration.
  7. Sets HTTP cookie `token` (`maxAge: 24h`, `sameSite: "lax"`, `httpOnly: false`).
  8. Returns HTTP `200 OK` JSON response containing token and user profile.

---

### Ticket Endpoints

#### `GET /tickets`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Middleware**: `verifyToken` (`backend/middleware/authMiddleware.js`)
- **Detailed Logic**:
  1. Middleware `verifyToken` validates `req.cookies.token`.
  2. Executes Supabase query: `.from("tickets").select("*")`.
  3. Returns JSON array of all database ticket objects across all engineers (used by Admin portal).

#### `GET /tickets/:ticket_id`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Middleware**: `verifyToken`
- **Parameters**: `ticket_id` (URL parameter, e.g. `T0059` or `1`)
- **Detailed Logic**:
  1. Middleware verifies JWT token.
  2. Queries Supabase: `.from("tickets").select("*").eq("ticket_id", ticket_id).single()`.
  3. Returns single ticket JSON object or `404 Not Found`.

#### `PUT /tickets/:ticket_id` & `PATCH /tickets/:ticket_id`
- **Route Handler**: `backend/routes/ticketRoutes.js` -> `backend/controllers/ticketController.js`
- **Middleware**: `verifyToken`
- **Request Body**: `{ technician_notes, status }`
- **Detailed Logic & DB Lock Enforcement**:
  1. Fetches existing ticket from Supabase. Returns `404` if not found.
  2. **Database Lock Check**: If `existingTicket.status.toLowerCase() === "closed"`, returns `400 Bad Request`:
     `"Ticket is already Closed and locked in the database. Further updates are prohibited."`
  3. Sets `targetStatus` to requested status or retains current status (updating `"Open"` to `"In Progress"` when notes are added).
  4. If `targetStatus === "Closed"`, calculates exact `resolution_time` in minutes (`current_time - created_date`).
  5. Updates Supabase `tickets` record.
  6. If closing ticket, triggers `analyzeCurrentTicket(ticket_id)` AI service to extract `root_cause`, `repair_method`, `repair_type`, and `preventive_action` and updates the ticket and `ai_analysis` table.
  7. Returns HTTP `200 OK` JSON with updated ticket data and AI analysis.

---

### AI Analysis Endpoints

#### `POST /analyze/:ticket_id`
- **Route Handler**: `backend/routes/aiRoutes.js` -> `backend/controllers/aiController.js`
- **Parameters**: `ticket_id`
- **Detailed Logic**:
  1. Fetches ticket record from Supabase `tickets` table by `ticket_id`.
  2. Extracts keywords from `ticket.issue` to query similar historical tickets (`.ilike("issue", %keywords%).limit(10)`).
  3. Checks Redis cache (`analysis:<lowercased_issue>`). Returns cached result on **Cache Hit**.
  4. On **Cache Miss**, invokes Ollama LLM service `analyzeTicket(ticket, similarTickets)` in `backend/services/aiService.js`.
  5. Stores generated analysis into Redis (24h TTL) and inserts record into Supabase `ai_analysis` table.

---

### Technician Endpoints

#### `GET /technician/tickets`
- **Route Handler**: `backend/routes/technicianRoutes.js`
- **Middleware**: `verifyToken`
- **Detailed Logic**:
  1. Reads `engineer_id` from decoded token `req.user.engineer_id`.
  2. Queries Supabase `tickets` table: `.from("tickets").select("*").eq("engineer_id", Number(engineer_id))`.
  3. Returns JSON array of assigned tickets for the logged-in technician.

---

## 5. Authentication & Role-Based Access Control (RBAC) Flow

### Client-Side Protection (`frontend/lib/protectedRoute.js`)
- `requireAdmin()`: Restricts access to `ADMIN` role. Used on `/dashboard`, `/tickets`, `/analytics`, `/ticketDetails`.
- `requireTechnician()`: Restricts access to `TECHNICIAN` role. Used on `/technicianDashboard`, `/technicianTickets`, `/technicianTicketDetails`.

### Next.js Server Middleware (`frontend/middleware.js`)
- **Admin Routes**: `/dashboard`, `/tickets`, `/analytics`, `/ticketDetails` $\rightarrow$ Enforces `role === "admin"`.
- **Technician Routes**: `/technicianDashboard`, `/technicianTickets`, `/technicianTicketDetails` $\rightarrow$ Enforces `role === "technician"`.
- **Redirects**: Unauthenticated or unauthorized role requests are automatically redirected to `/login`.

---

## 6. Guidelines for AI Agents

1. **Do Not Rewrite Working Code**: Maintain existing patterns, API contracts, and file boundaries.
2. **Reuse Existing APIs**: Always check `backend/routes/` and `backend/controllers/` before introducing any new logic.
3. **No Direct Database Access from Frontend**: All database operations must go through Express backend controllers via `apiFetch()`.
4. **Preserve Design System**: Retain standard OpsMemory AI styling (colors, typography, cards, borders, icons).
5. **Enforce DB Locking**: Closed tickets must remain read-only and immutable.
<!-- END:nextjs-agent-rules -->
