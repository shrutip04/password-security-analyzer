# Password Security Analyzer & Personalized Generator

A privacy-focused web application that analyzes password strength and helps users generate secure, personalized passwords — with all sensitive password logic running entirely in the browser. No plaintext password is ever sent to or stored on the backend.

## Why this project

Most password strength checkers either run misleading strength meters or send passwords to a server for "analysis," which is a security anti-pattern. This project keeps all password analysis and generation client-side, and uses the backend only for what it should be used for: authentication and non-sensitive user data.

## Tech Stack

**Frontend**
- React + TypeScript (Vite)
- Client-side password analysis engine (no external calls)

**Backend**
- Java 17 + Spring Boot
- Spring Security + JWT for stateless authentication
- Spring Data JPA + Hibernate
- MySQL
- Maven
- Bean Validation (Jakarta)

**Tooling**
- IntelliJ IDEA, VS Code
- Git / GitHub
- Postman / Swagger (OpenAPI)

## Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│   React Frontend     │         │   Spring Boot API    │
│                       │  JWT    │                       │
│  Password Analysis  ──┼────────▶│  Auth (register/     │
│  (100% client-side)  │  Auth   │  login) only          │
│                       │  only   │                       │
│  No password ever    │         │  No password logic,   │
│  sent to backend      │         │  no plaintext storage │
└─────────────────────┘         └──────────┬───────────┘
                                             │
                                             ▼
                                       ┌───────────┐
                                       │  MySQL    │
                                       │ (users)   │
                                       └───────────┘
```

**Core security principle:** the backend never receives, processes, or stores a user's actual passwords being analyzed or generated. It only handles account credentials for login (hashed with BCrypt) and issues JWTs for session management.

## Features

- [x] User registration & login with JWT-based stateless authentication
- [x] Passwords hashed with BCrypt before storage
- [x] Client-side password strength analysis (length, character variety, common patterns, sequential characters)
- [x] Real-time strength meter with actionable feedback
- [x] Global exception handling with consistent API response shape
- [x] Swagger/OpenAPI documentation
- [ ] Personalized password generator (random / passphrase / personalized modes)
- [ ] Security education module
- [ ] User dashboard

## Getting Started

### Prerequisites
- Java 17+
- Node.js + npm
- MySQL running locally

### Backend Setup

```bash
cd backend
```

Create a database:
```sql
CREATE DATABASE password_analyzer_db;
```

Add to `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/password_analyzer_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update

jwt.secret=your-long-random-secret-key-at-least-32-characters
jwt.expiration-ms=86400000
```

Run the backend:
```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`. Swagger UI at `http://localhost:8080/swagger-ui/index.html`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** if Vite starts on a different port, update `setAllowedOrigins` in `SecurityConfig.java` to match.

## API Endpoints

| Method | Endpoint             | Description               | Auth Required |
|--------|-----------------------|----------------------------|----------------|
| POST   | `/api/auth/register`  | Register a new user        | No             |
| POST   | `/api/auth/login`     | Log in and receive a JWT   | No             |

All responses follow a consistent shape:
```json
{
  "success": true,
  "data": { "token": "...", "email": "..." },
  "message": "Login successful"
}
```

## Project Structure

```
password-security-analyzer/
├── backend/
│   └── src/main/java/com/shruti/passwordanalyzer/
│       ├── config/       # Security, JWT filter/util
│       ├── controller/   # REST controllers
│       ├── service/      # Business logic
│       ├── dto/          # Request/response objects
│       ├── entity/       # JPA entities
│       ├── repository/   # Spring Data repositories
│       └── exception/    # Custom exceptions + global handler
└── frontend/
    └── src/
        ├── api/          # Backend API calls
        ├── components/   # React components
        └── utils/        # Client-side password analysis engine
```

## Roadmap

This project follows a phased build:
1. ~~Requirements & Architecture~~
2. ~~Project Setup~~
3. ~~Backend Foundation~~
4. ~~Authentication~~
5. Frontend Foundation
6. Password Analysis Engine
7. Password Generator
8. Security Education
9. User Dashboard
10. Testing
11. UI Polish
12. Documentation & Interview Prep

## Author

Built by Shruti — [GitHub](https://github.com/shrutip04)
