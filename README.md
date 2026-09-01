<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:1a2332&height=200&text=Password%20Security%20Analyzer&fontSize=38&fontColor=58A6FF&fontAlign=50&fontAlignY=38&desc=Your%20password%20never%20leaves%20your%20browser.%20That's%20the%20whole%20point.&descAlign=50&descAlignY=58&descSize=14&descColor=8b949e" width="100%" />

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&pause=1200&color=3FB950&center=true&vCenter=true&width=650&lines=%24+analyzing+password+strength...;%24+zero+plaintext+ever+sent+to+server;%24+generating+cryptographically+secure+passwords;%24+status%3A+client-side+by+design" />

![React](https://img.shields.io/badge/-React_%2B_TypeScript-0d1117?style=for-the-badge&logo=react&logoColor=58A6FF)
![Spring](https://img.shields.io/badge/-Spring_Boot-0d1117?style=for-the-badge&logo=springboot&logoColor=6DB33F)
![JWT](https://img.shields.io/badge/-JWT_Auth-0d1117?style=for-the-badge&logo=jsonwebtokens&logoColor=fb015b)
![MySQL](https://img.shields.io/badge/-MySQL-0d1117?style=for-the-badge&logo=mysql&logoColor=4479A1)

</div>

<br/>

## 🔐 The Problem This Solves

Type your password into most "strength checker" websites and it gets sent straight to a server. You have no idea what happens to it after that.

This project treats that as a bug, not a norm. **Every byte of password analysis and generation happens in your browser.** The Spring Boot backend never sees, receives, or logs the passwords you're checking or generating — it only exists for account login, and even then it stores a BCrypt hash, never the password itself.

```
 What the backend NEVER sees          What the backend DOES handle
 ─────────────────────────────        ─────────────────────────────
 ✗ Passwords you're analyzing         ✓ Account email + hashed password
 ✗ Passwords being generated          ✓ JWT issuance for sessions
 ✗ Any personalization input          ✓ Security education content
                                       ✓ User profile metadata
```

---

## 🧭 What's Inside

<table>
<tr>
<td width="50%" valign="top">

**🔍 Password Analyzer**
Real-time strength scoring — length, character variety, common patterns, sequential runs — with a live meter and specific feedback, computed entirely in `passwordStrength.ts`.

**🎲 Password Generator**
Random mode (configurable length + character sets) and passphrase mode, both built on `crypto.getRandomValues()` — not `Math.random()`, which isn't cryptographically safe for this use case.

</td>
<td width="50%" valign="top">

**📚 Security Education**
DB-backed topic cards (passwords, 2FA, phishing) — content lives in MySQL via a `SecurityTopic` entity, not hardcoded into the frontend, so it can grow without a redeploy.

**👤 Dashboard**
Profile summary pulled from the JWT-authenticated `/api/users/me` endpoint, plus quick links into the other three tools.

</td>
</tr>
</table>

---

## 🏗️ How Auth Actually Works Here

```
  Browser                          Spring Boot                     MySQL
     │                                  │                             │
     │  POST /api/auth/register         │                             │
     ├─────────────────────────────────▶│  BCrypt.hash(password)      │
     │                                  ├────────────────────────────▶│
     │  ◀── { token, email } ───────────┤                             │
     │                                  │                             │
     │  GET /api/users/me               │                             │
     │  Authorization: Bearer <token>   │                             │
     ├─────────────────────────────────▶│  JwtAuthFilter validates,   │
     │                                  │  sets SecurityContext        │
     │  ◀── { email, memberSince } ─────┤                             │
```

Stateless JWT auth (`SessionCreationPolicy.STATELESS`) means the server holds no session state — every request carries its own proof of identity, verified by `JwtAuthFilter` before it ever reaches a controller.

---

## 🛠️ Stack Rationale

| Choice | Why |
|---|---|
| JWT over sessions | Stateless — no server-side session store to manage or scale |
| BCrypt | Adaptive hashing; deliberately slow to resist brute-force |
| `crypto.getRandomValues` | Cryptographically secure RNG, unlike `Math.random()` |
| Client-side password logic | Removes the backend as a point of exposure entirely |
| DTOs at every boundary | Entities never serialize directly to the client |
| DB-backed education content | Content can change without a frontend redeploy |

---

## ⚙️ Running It Locally

**Backend** (Java 17, MySQL)
```bash
cd backend
```
```sql
CREATE DATABASE password_analyzer_db;
```
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/password_analyzer_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update

jwt.secret=your-long-random-secret-key-at-least-32-characters
jwt.expiration-ms=86400000
```
```bash
./mvnw spring-boot:run
```
Runs on `localhost:8080` · Swagger at `/swagger-ui/index.html` · `DataSeeder` auto-populates security topics on first boot.

**Frontend** (Node + npm)
```bash
cd frontend
npm install
npm run dev
```
Runs on `localhost:5173`. If Vite picks a different port, update `setAllowedOrigins` in `SecurityConfig.java` to match — CORS is locked to a single origin on purpose.

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `POST` | `/api/auth/register` | ❌ | Create account, receive JWT |
| `POST` | `/api/auth/login` | ❌ | Authenticate, receive JWT |
| `GET` | `/api/users/me` | ✅ | Current user's profile |
| `GET` | `/api/topics` | ✅ | All security education topics |
| `GET` | `/api/topics/{id}` | ✅ | Single topic |

Every response follows one shape, success or failure:
```json
{ "success": true, "data": { "...": "..." }, "message": "Login successful" }
```

---

## 📁 Project Layout

```
password-security-analyzer/
├── backend/  com.shruti.passwordanalyzer/
│   ├── config/       JwtUtil · JwtAuthFilter · SecurityConfig · DataSeeder
│   ├── controller/   Auth · User · SecurityTopic
│   ├── service/      Business logic, kept out of controllers
│   ├── dto/          Request/response contracts
│   ├── entity/       User · SecurityTopic
│   ├── repository/   Spring Data JPA interfaces
│   └── exception/    Custom exceptions + @RestControllerAdvice
└── frontend/  src/
    ├── api/          Typed fetch wrappers per resource
    ├── components/   Dashboard · Analyzer · Generator · Education · AuthForm
    └── utils/        passwordStrength.ts · passwordGenerator.ts (all client-side)
```

---

## 🗺️ Build Progress

- [x] Architecture & project setup
- [x] Backend foundation — DTOs, global exception handling, Swagger
- [x] JWT authentication end to end
- [x] React + TypeScript frontend foundation
- [x] Client-side password analysis engine
- [x] Client-side password generator (random + passphrase)
- [x] DB-backed security education module
- [x] User dashboard
- [ ] Personalized generator mode (with dictionary-attack warnings)
- [ ] Automated test coverage
- [ ] Full responsive UI polish

---

<div align="center">

**Shruti Pawar** · CS Student, SNDT Women's University

[![GitHub](https://img.shields.io/badge/GitHub-161b22?style=flat-square&logo=github&logoColor=white)](https://github.com/shrutip04)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/shrutip04)

<sub>built on the idea that the safest place for your password is nowhere but your own browser</sub>

</div>
