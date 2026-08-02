---
title: Test Automation Reporting Platform
eyebrow: Developer productivity platform
summary: A service that turns scattered CI test runs into one queryable record an engineer can read.
description: A case study in Go, PostgreSQL, PyTest, REST APIs, CI integration, Docker, and test-run reporting that people actually use.
order: 3
status: ongoing
role: Designer and developer of the platform
collaboration: Built to support developers, quality engineers, and CI workflows
technologies:
  - Go
  - PostgreSQL
  - PyTest
  - REST APIs
  - Docker
  - CI
  - Slack
diagram: reporting
---

## Context

CI systems run jobs well. Explaining a test run is a different job, and most of them are bad at it. Which branch was this? Which pull request? These four parallel jobs, are they one run or four? And the question every engineer actually has at 5pm on a Friday: what do I look at first?

So I stopped treating reporting as a CI feature and started treating it as a small piece of software with a data model. The goal is a durable record of execution you can query, compare, and read in the context of what was being shipped.

## The problem

The evidence exists. It is just scattered across job pages, log files, and whatever Slack message happened to fire. Engineers reconstruct the story by hand, and they do it again the next time. That gets worse the moment suites run in parallel or the same failure starts showing up on three branches.

This platform gives that evidence one home: results, execution metadata, source-control context, and the notifications built on top of them.

## Why it was difficult

Accepting a list of passed and failed tests is easy. Keeping enough context around those results to make them mean something, without welding the service to one runner or one CI provider, is the actual work.

A few things make that harder than it sounds:

- Distributed jobs report at different times, and sometimes not at all.
- Retries and duplicate test names blur what counts as a single execution.
- Branch, commit, and pull-request context has to survive the whole trip.
- A malformed submission must never corrupt a run that is already in progress.
- The report has to still be useful long after the CI job has been garbage collected.

## My role

I designed and built the service: the architecture, the API responsibilities, the persistence model, the containerized development setup, and the integration pattern the test runner uses.

How the data gets consumed is a different question, and a collaborative one. Which views matter, what belongs in a notification, and how it fits a given team's workflow are product decisions rather than mine to make alone.

## My approach

The system has four jobs: accept structured run data, work out execution identity, persist something queryable, and hand back a summary an engineer can act on. PyTest submits facts. The service owns consistency. Clients decide how to present it.

Drawing the line there keeps the test runner light and leaves the reporting model open to CI summaries, Slack, dashboards, and whatever comes next.

## Architecture or workflow

1. A CI job creates or joins a logical test run carrying branch, commit, and pull-request context.
2. PyTest submits execution events and result detail through a versioned REST API.
3. The Go service validates and normalizes what arrives.
4. PostgreSQL stores runs, executions, outcomes, and metadata as related records.
5. Reporting endpoints assemble stable summaries for engineers and notification clients.

The diagram above is simplified on purpose. It leaves out repository names, internal URLs, and deployment detail.

## Key engineering decisions

### Model runs separately from executions

One logical run can span several distributed CI jobs. Separating the run from its individual execution records makes aggregation an explicit operation, which stops job boundaries from accidentally becoming product meaning.

### Keep deterministic reporting authoritative

Counts, states, identifiers, and links come from validated data and plain rules. A model might one day summarize or classify a failure. It will never be allowed to rewrite the underlying result.

### Make context first-class

Branch, commit, pull request, environment, and runner metadata live in the data model. Reconstructing any of that by parsing log text is a trap I have watched other systems fall into.

### Design notifications as consumers

Slack output sits downstream of the reporting API. The core model stays independent of any one channel, and changing how a message looks stays a formatting change.

## Technologies

Go gives a small, explicit service layer. PostgreSQL handles relational integrity and the reporting queries. PyTest integrations capture execution events. Docker keeps local development reproducible, and the REST API keeps producers and consumers loosely coupled.

## Outcome

There is now a structured foundation for test-run history, CI context, and failure reporting. Manual reconstruction is replaced by a consistent record, which gives investigation somewhere sensible to start.

I am not going to quote a percentage here. No validated production metrics have been collected, and inventing one would undermine the point of the whole project.

## Lessons learned

Report quality is downstream of the execution model. Getting identifiers, lifecycle events, and partial-run behavior right before you think about presentation makes the summary easy. Getting them wrong makes it impossible.

It also reinforced something I keep running into: automation creates confidence only when its output makes the next action clearer.

## What I would improve next

- Add carefully chosen trends, while resisting the pull toward a vanity dashboard.
- Improve cross-run comparison and make repeated failures easier to spot.
- Extend access and retention policy for the intended operating environment.
- Test AI-assisted classification against a labeled set of real failures before trusting it anywhere near a report.

> AI-assisted analysis is a planned extension rather than a shipped capability. Deterministic run data would stay the source of truth, with any model output labeled, constrained, and reviewable.
