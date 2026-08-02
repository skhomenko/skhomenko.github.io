---
title: Enterprise Quality Engineering
eyebrow: Sanitized enterprise case study
summary: Multi-product automation architecture, cloud test infrastructure, CI reliability, and technical leadership at Lightspeed.
description: A sanitized case study in enterprise automation architecture, cloud-based testing, CI/CD stability, developer enablement, and technical leadership.
order: 4
status: sanitized
role: Staff Quality Test Developer and quality engineering leader
collaboration: Cross-functional work with quality, development, product, and platform teams
technologies:
  - Frontend automation
  - Backend automation
  - Cloud testing
  - CI/CD
  - Code review
diagram: enterprise
---

## Context

At Lightspeed, quality engineering ran across several product surfaces, several teams, and several delivery workflows. Nobody was missing a test suite. The difficulty was getting automation architecture, cloud execution, CI feedback, and day-to-day engineering practice to work together while all four kept moving.

This account is deliberately sanitized. It covers responsibilities, decision patterns, and technical leadership, and leaves out proprietary architecture, internal systems, and private business information.

## The problem

Test systems fragment as products and teams grow. Suites drift into different conventions, execution gets hard to reason about, and once CI feedback becomes unreliable people quietly stop believing it. That last one is expensive, because a test suite nobody trusts still costs money to run.

The work was long-term by nature: strengthen the architecture, line automation up with real product risk, improve the test infrastructure, and give engineers a system they could maintain together.

## Why it was difficult

- Frontend and backend risks call for genuinely different validation strategies.
- Several products and teams meant several sets of constraints and release paths.
- Cloud execution brought its own environment, capacity, and observability problems.
- A technically correct framework still fails if the people using it find it unusable.
- Stabilization work has to separate product failures from infrastructure failures from test defects, and all three look identical in a CI summary.

## My role

I set technical direction on automation architecture, test reliability, CI integration, and quality strategy. In practice that meant reviewing code and design, coaching engineers, digging into unstable feedback, and working across team boundaries on the things nobody owned outright.

The architecture and the product outcomes were collaborative. I am not going to describe multi-team work as a solo effort.

## My approach

I treated the automation estate as one system with three connected layers:

1. **Product risk:** what behavior needs evidence, and at which layer.
2. **Execution architecture:** how checks get designed, isolated, and run.
3. **Feedback operations:** how CI gets monitored, diagnosed, and improved.

The value of that model is partly social. It gives developers, product partners, infrastructure engineers, and test specialists one shared view of the delivery system to argue about.

## Architecture or workflow

The workflow above shows product surfaces feeding the appropriate automation layers, running through cloud CI infrastructure, and returning operational signals. The loop at the end is the part that matters: failures and instability feed back into framework improvements, coaching, and risk decisions.

The diagram is conceptual and sanitized. It does not depict Lightspeed's private architecture.

## Key engineering decisions

### Choose the lowest useful validation layer

Not every risk needs a browser. Pushing coverage toward APIs and integrations where it fits improves speed and diagnostic value, while critical user journeys keep their end-to-end checks.

### Treat reliability as owned engineering work

Test stability is not a cleanup task someone does between sprints. Monitoring CI, classifying failure modes, improving isolation, and removing ambiguous signals are what operating an automation platform consists of.

### Design for contributors

Framework conventions, review standards, reusable patterns, and coaching all reduce local variation. The aim is safe, understandable contribution across teams, which is a different thing from central control.

### Keep product context in the strategy

Coverage decisions need product behavior, change risk, and release context behind them. A test count tells you nothing about any of the three.

### Let a model triage failures, and a person decide

I built a bot that used an LLM to sort CI failures into regressions, outdated tests, and flaky tests, then posted the classification and a suggested next step on the pull request. It reads evidence and explains itself. It does not close anything, and it does not gate the merge. Whoever reads the comment still makes the call.

### Flag code that shipped without tests

A CI check compared functional changes against the automated coverage touching them and marked the gap on the pull request. It prompts a decision rather than blocking one, which is why people kept it switched on.

## Technologies

The work covered frontend and backend automation, AWS-based test infrastructure, CI/CD integration through CircleCI, diagnostics, reporting, and review practice, across point-of-sale, loyalty, fulfillment, analytics, and cloud backend services. Specific internal technologies and implementation details are omitted.

## Outcome

Automation architecture, CI reliability, and developer enablement ended up more closely connected than they had been. Teams had clearer patterns for building and reviewing tests, and quality feedback started being treated as an engineering system that needs operating.

Two parts of it are measurable. CI usage dropped from roughly 18 million to 3 million credits a month, an 80 percent reduction worth about USD 100,000 a year at standard pricing. Flaky failures went from a steady background cost to close to zero, which came from watching runs, finding the causes that kept recurring, and hardening the framework rather than retrying around the symptoms.

Neither number is the interesting part on its own. Both came from treating the feedback system as something you operate, which is the argument this whole case study is making.

## Lessons learned

Enterprise quality systems live or die on adoption as much as architecture. A clean framework helps. Shared standards, honest review, product understanding, and feedback that behaves the same on a Tuesday as it did on a Monday are what actually produce confidence.

Technical leadership at that level is mostly connective work: making risk legible, reconciling constraints, and helping teams improve something they jointly own.

## What I would improve next

Given public, non-confidential evidence, I would define a small set of health indicators for feedback latency, failure clarity, and stability. I would also keep moving validation toward the most diagnostic layer, and spend more on contributor documentation as the architecture changes underneath it.
