# CadenceSprout

**All-in-One Preschool OS for India** — purpose-built for standalone preschool chains running on WhatsApp groups and spreadsheets today.

CadenceSprout replaces the WhatsApp + ERP + Seesaw stack with a single product: a beautiful parent activity feed, AI-powered developmental milestone tracking, attendance, fee management, and a real-time engagement dashboard for school owners.

---

## What We're Building

The daily loop for 1.8M+ Indian preschools today:
- Teachers send parent updates via WhatsApp groups (unbranded, unauditable, 30+ min/day)
- Attendance on paper registers
- Fees tracked in Tally or cash
- No developmental milestone records

CadenceSprout makes it one tap: teacher takes a 15-second video → AI identifies children, tags NEP 2020 milestones, drafts a caption → parents see a beautiful branded update → school owner watches engagement score rise.

---

## Documentation

| Document | Purpose |
|----------|---------|
| [`DESIGN.md`](./DESIGN.md) | Product strategy, competitive analysis, design system, IA, interaction states, user journeys |
| [`CEO_PLAN.md`](./CEO_PLAN.md) | Vision, scope decisions, pricing, risk register, 10-month build timeline |
| [`ENG_REVIEW.md`](./ENG_REVIEW.md) | Tech stack, system architecture, data model, AI pipelines, cost model, test requirements |
| [`PRD.md`](./PRD.md) | Epics, user stories with acceptance criteria, screen inventory, API contracts |
| [`TODOS.md`](./TODOS.md) | Prioritised backlog — urgent, Phase 1, Phase 2, Phase 3 |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend API | Laravel (PHP 8.2) + Sanctum + Horizon |
| Database | PostgreSQL + Row Level Security (multi-tenancy) |
| Mobile app | React Native (iOS + Android) |
| Web admin dashboard | React + Vite |
| Queues | Laravel Horizon + Redis |
| Media | AWS S3 (ap-south-1) + CloudFront CDN |
| Real-time | Pusher + Laravel Echo |
| AI/LLM | OpenRouter (Gemini Flash → GPT-4o-mini routing) |
| Face recognition | AWS Rekognition |
| Notifications | Wapi (WhatsApp) → MSG91 (SMS fallback) |

---

## Phase 1 Scope (Month 1–10)

**Seesaw layer:**
- Parent activity feed — teacher posts photos/videos, parents see beautiful branded feed
- AI activity tagging — child identification (AWS Rekognition) + milestone suggestion + caption drafting (OpenRouter)
- Milestone tracker — NEP 2020 Foundational Stage taxonomy (~80 indicators, 5 domains)
- WhatsApp magic-link onboarding — no-install web view for parents
- AI year-end developmental portfolio — auto-generated per child
- Parent engagement score dashboard — school-level, weekly snapshot

**Core ERP layer:**
- Admissions management (inquiry → enrollment → profile)
- Fee management (manual invoicing Year 1)
- Attendance tracking (teacher-facing, daily)
- Staff management (names, roles, class assignment)
- Self-serve school onboarding

---

## Phase 1 Launch Criteria

- 1 preschool chain (5+ centers) fully live, daily active teachers and parents
- ≥70% of enrolled parents active (viewed a post in last 7 days)
- ≥3 posts per class per day by teachers
- Self-serve onboarding live — new school can sign up without founder involvement
- At least 3 schools on manual invoicing
- NPS from teachers ≥ 30

---

## Compliance

This product handles photos and videos of children (ages 3–6). **DPDP Act 2023 compliance is non-negotiable:**
- Explicit per-type parental consent before any data processing
- AWS Rekognition called only after consent is recorded
- All data stored in India (AWS ap-south-1)
- Data deletion within 24 hours of consent revocation
- Legal review must be completed before launch (see [`TODOS.md`](./TODOS.md))

---

## Competitive Context

| | Illumine | Seesaw | CadenceSprout |
|--|---------|--------|---------------|
| Funding | $2.5M seed | Established US product | Cadence Infotech backed |
| Focus | 56 countries, going wide | US market-centric | India-first, depth > breadth |
| Languages | English-primary | English | Hindi + Tamil (Phase 2) |
| Curriculum | Generic | Generic | NEP 2020 / NCERT aligned |
| WhatsApp | Not native | Not native | WhatsApp-bridge + deep links |
| Pricing | ₹800–1,500/student/year | ~$8–12/teacher/month | ₹20–30/child/month (launch) |

---

## Project Status

> **Implementation started.** Planning documents are complete, and the mobile app now has an Expo scaffold plus the first teacher home feed screen.
> Next step: add navigation, the post composer, and real data wiring.

Reviews completed:
- ✅ Office Hours (product strategy)
- ✅ CEO Review (scope & pricing)
- ✅ Design Review (UI/UX specs)
- ✅ Engineering Review (architecture & test plan)
- ✅ PRD (epics, stories, acceptance criteria)

---

## Mobile App Setup

The React Native teacher app now boots with Expo SDK 55 from the repository root.

Requirements:
- Node.js 22+
- npm 10+
- Expo Go on a device or an iOS/Android simulator

Commands:

```bash
npm install
npm start
```

Convenience scripts:
- `npm run ios`
- `npm run android`
- `npm run web`

Current implemented screen:
- Teacher `Home Feed` (`T-1`) with the warm editorial visual system from [`DESIGN.md`](./DESIGN.md) and [`PRD.md`](./PRD.md)
