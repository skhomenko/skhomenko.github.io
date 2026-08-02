---
title: Booking & Scheduling Platform
eyebrow: Product engineering
summary: A Go and React scheduling product, from the booking lifecycle down to the deploy pipeline.
description: A case study in Go service design, React and TypeScript frontend work, PostgreSQL, booking conflict prevention, OAuth, rate limiting, and single-operator deployment.
order: 1
status: ongoing
role: Designer and developer of the whole system
collaboration: Built solo, with architecture decisions written down as they were made
technologies:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - Docker
  - Playwright
diagram: scheduling
---

## Context

This is a scheduling product: providers publish availability, customers book against it, and both sides get reminded before the appointment. The details are unglamorous and the correctness bar is high, which is exactly what makes it interesting to build.

I own all of it. Domain model, Go services, React frontend, database schema, test architecture, CI, and the deploy that puts it on a server. Nobody else is going to catch my mistakes, so the system has to be built in a way that catches them for me.

## The problem

Double-booking is the failure everyone notices. Two customers holding the same slot is not a cosmetic bug, it is a person showing up to a door that is already occupied, and no apology email fixes that afternoon.

Underneath it sits a pile of quieter problems. Timezones that differ between provider and customer. Reschedules that need to release the old slot and claim the new one without a gap where both are free. Reminder emails that must fire once, even when the process restarts mid-send.

## Why it was difficult

- Availability is a derived value. It depends on provider rules, existing bookings, timezone, and the current time, and it changes underneath you while a customer is choosing.
- Conflict prevention needs to hold under concurrency, which rules out checking availability and then writing.
- A booking has a lifecycle, and reschedule is not the same operation as cancel-then-rebook even though it looks similar from the outside.
- Public booking links are unauthenticated by design, so every one of them is an abuse surface.
- Demo and test data live in the same database as real bookings and must never leak into a public listing.
- One person deploying to one server means recovery has to be automatic, because nobody is watching at 3am.

## My role

Everything, which is the point of including it here. The other case studies on this site describe work inside an organization where outcomes were shared. This one shows what I build when the architecture decisions are all mine and there is nobody to hand the hard parts to.

## My approach

I kept the domain rules in Go and out of the database and the UI. The frontend renders availability and collects intent. The service decides whether a booking is legal. PostgreSQL enforces the invariants that must hold no matter what the service believes.

Conflict prevention runs at three layers rather than one. The UI hides slots it knows are taken, the service validates against current availability inside the write path, and the database has the final say. The first two layers exist for a good experience. The third exists because the first two will eventually be wrong.

Architecture decisions get written down as they are made, each with the decision, the reason, the tradeoff accepted, and the files where it lives. That record is the only thing standing between me and re-litigating a choice I already made six months ago and forgot the reasoning for.

## Architecture or workflow

A booking request arrives with a provider, a slot, and a timezone. The service resolves the real availability window, validates against it, and writes inside a transaction where the database constraints apply. Lifecycle state and an audit trail persist together. A background worker picks up reminders and sends them in the recipient's language.

The reminder worker claims rows with `FOR UPDATE SKIP LOCKED`, which makes sending idempotent across restarts and lets a second worker exist later without a redesign. Rescheduling re-arms the reminder rather than leaving a stale one queued.

## Key engineering decisions

### Put the last line of defense in the database

Application checks are the ones you can reason about. Database constraints are the ones that survive a race, a retry, and a code path you forgot existed. Both are worth having, and I would not ship the first without the second.

### Treat public surfaces as hostile

Booking links resolve without a login, so they carry capability tokens instead of guessable identifiers, invitation codes are hashed at rest with a peppered HMAC, redemption is single-use, and the endpoints sit behind rate limits. None of this is visible when the product works.

### Tag every row with where it came from

Rows are marked as production, demo, or test at write time. Public listings filter on that tag at a single chokepoint, and the cleanup tool refuses to touch production rows. It closes an entire category of embarrassing bug, cheaply.

### Make recovery automatic

A restart policy, a systemd unit, a liveness watchdog, and per-container memory limits. CI gates every pull request, and releases go out as a tagged image that gets scanned before it is pulled onto the server. Migrations are additive so a rollback does not strand the schema.

### Test through the interface a user actually touches

Playwright drives real flows against a real database, with a `data-testid` contract so the tests do not break every time the markup moves. Fixtures generate their own data, which is what lets the suite run in parallel.

## Technologies

Go for the API and command-line tools. React 19, TypeScript, and Vite on the frontend, with FullCalendar for the availability views and react-i18next for French and English throughout. PostgreSQL for storage. Docker Compose for local development and for the deployed topology. Playwright and pytest for functional coverage, `go test` on every push, and gitleaks scanning staged changes for secrets.

## Outcome

The platform runs, takes bookings, prevents conflicts, and sends bilingual reminders and confirmations. It is in active development and I ship to it regularly.

I am deliberately not quoting adoption numbers. It is a young product, and the engineering is the part worth showing.

## Lessons learned

Working alone removes every excuse and most of the safety nets. What replaces them is written-down decisions, constraints in the database, and tests that run without being asked. That turns out to be a reasonable substitute for a team, though a slower one.

The other thing worth saying: doing quality engineering for two decades made me faster here, not more cautious. I know which failures actually cost you, so I spend the effort there and leave the rest alone.

## What I would improve next

- Move the rate limiter out of process so a second API instance becomes possible.
- Add tracing across the booking write path, where most of the interesting latency lives.
- Extend the audit trail into a fuller event history, which reporting will want later.
- Keep pushing coverage toward the service layer, where a failure explains itself better than a browser test does.
