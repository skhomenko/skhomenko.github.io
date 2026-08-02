---
title: Bilingual Document Assistant
eyebrow: Applied AI demonstrator
summary: A retrieval-augmented assistant that answers questions in French or English about a long French agreement, and cites the article it used.
description: A working demonstrator in RAG architecture, local LLM inference, pgvector retrieval, cross-language search with multilingual embeddings, and answers traceable to source text.
order: 2
status: ongoing
role: Designer and developer of the demonstrator
collaboration: Built as a demonstrator; production use would need domain validation and a security review
technologies:
  - Next.js
  - TypeScript
  - PostgreSQL
  - pgvector
  - Local LLMs
  - Python
diagram: assistant
---

## Context

Some documents are long, dense, and consulted constantly by people who are not lawyers. A collective agreement is a good example. The answer to a given question is in there, spread across three articles that reference each other, and finding it takes twenty minutes and a colleague who has done it before.

This one is written in French, and not everyone who needs it reads French comfortably.

I built this to find out how far retrieval-augmented generation gets you on that problem, and to have something real to point at instead of an opinion about what LLMs might do.

## The problem

The obvious approach, pasting the document into a chat window, fails on contact. The text is far longer than a comfortable context window, the answer usually depends on a handful of specific passages, and a model asked to recall a policy from memory will produce something that reads correctly and cites nothing.

For this kind of document, an answer without a source is worse than no answer. Somebody is going to act on it.

## Why it was difficult

- The source is French and the questions are not, so retrieval has to match an English question against French text.
- Chunking decides retrieval quality. Split too small and clauses lose their conditions; split too large and the relevant sentence drowns.
- A small local model has a real context budget, which forces retrieval to be selective rather than generous.
- Follow-up questions need conversation memory without letting earlier turns pollute retrieval for the current one.
- Every answer has to carry its sources, which means provenance has to survive the whole pipeline rather than being reconstructed at the end.

## My role

I designed and built it: the ingestion pipeline, the retrieval design, the schema, the application, the local inference setup, and the test suite.

It is a demonstrator, and I describe it that way deliberately. Putting it in front of real users would need domain review of the answers, a security review of the data handling, and an evaluation set considerably more rigorous than my own spot checks.

## My approach

Deterministic components do the work that can be done deterministically. A Python pipeline parses the document, splits it along its own article structure, and embeds each chunk. Retrieval is a vector similarity query with a hard limit. The model receives only what was retrieved, and answers from that.

The model is not asked what the agreement says. It is asked to answer using the passages in front of it, and to point at which ones. That distinction is the whole design.

## The practice this comes from

I apply the same three levels of authority to every AI-assisted system I build, and this one is the clearest example of them running.

1. **Deterministic components establish facts.** The parser, the chunker, and the vector query decide what the document actually contains. None of that involves a model.
2. **The model interprets, inside bounds.** It receives only retrieved passages and turns them into an answer in the right language. It cannot reach past what it was given.
3. **The reader decides.** Citations exist so a person can check the claim against the source and disagree with it.

Two working rules fall out of that. Prefer ordinary code wherever a rule is sufficient, because parsing a heading or ranking a similarity score is cheaper, faster, and easier to trust than asking a model to do it. And evaluate the system rather than the model, because prompt construction, retrieval quality, what you refuse to send, and how a user checks the output all matter more here than which model is loaded. Swapping the model is the smallest variable in the list.

Model choice is a set of tradeoffs held in tension: task quality against memory, quantization, context length, latency, privacy, and cost. The largest available model is rarely the right engineering answer, and on this project it would have been the wrong one.

## Architecture or workflow

A question is embedded with the same multilingual model used at ingestion, so an English question lands near the French passages that answer it. Vector search returns the closest ones. Those passages, the conversation history, and the question go to a local model, which answers in the language the question was asked in. The response comes back with the article references attached.

Inference runs natively on the host rather than in a container, because containerized GPU access is not available on macOS and CPU-only inference is too slow to be pleasant. The application runs in Docker and reaches the host inference service across the container boundary. That split is ugly, and it is the correct tradeoff on this hardware.

## Key engineering decisions

### Keep everything local

Documents like this one are internal. Running inference and embeddings on the machine means no passage of the agreement leaves it. The cost is a smaller model and a hardware floor, which for a demonstrator is an easy trade.

### Chunk along the document's own structure

Fixed-size windows cut clauses in half. Splitting on article boundaries keeps each chunk semantically whole, which improves retrieval and makes a citation something a reader can actually go and check.

### Make retrieval visible

A debug panel shows the retrieved chunks, their similarity scores, and the timing. When an answer is wrong, that panel tells you immediately whether retrieval missed or the model fumbled what it was given. Those are different bugs with different fixes, and without the panel you are guessing.

### Fail loudly when a dependency is down

If inference or the database is unavailable, the interface says so. A RAG application that quietly degrades into a plain chatbot is worse than one that admits it is broken, because it keeps answering.

### Cite or do not answer

Every response references the articles it drew on. It is the feature that makes the thing trustworthy enough to use, and it is the reason the retrieved passages are threaded all the way through rather than dropped after the prompt is built.

## Technologies

Next.js with the App Router and TypeScript for the application, React and Tailwind for the interface. PostgreSQL with pgvector as both vector store and relational database, accessed through Drizzle. A multilingual embedding model at 768 dimensions, and a small instruction-tuned model for generation, both served locally through Ollama. A standalone Python ingestion pipeline using PyMuPDF. Docker Compose for the database and application, Vitest for unit tests, and dockerized pytest with Playwright for functional coverage.

## Outcome

It works. You ask a question in French or English, and you get an answer in the same language with references to the articles it came from. Follow-up questions carry context. The debug panel makes its reasoning inspectable, which matters more than it sounds.

What it demonstrates is the architecture: deterministic retrieval establishing what the document says, a constrained model turning that into an answer, and a citation trail so a person can check the work. I would rather show that running than describe it.

## Lessons learned

Retrieval quality dominates. Once the right passages are in front of it, a small local model answers this class of question perfectly well. When retrieval misses, no amount of prompt engineering rescues the answer, and the failure is confident and fluent.

Building it also settled a question I had been circling. The interesting engineering in an LLM application is almost entirely in the parts that are not the model: how you split the source, how you retrieve, what you refuse to send, and how a user checks the result.

## What I would improve next

- Build a labeled question set and measure retrieval before touching anything else.
- Compare the local model against a hosted one on identical questions, with the same review rubric.
- Add hybrid keyword and vector retrieval, since exact article references currently depend on similarity alone.
- Measure how often a citation genuinely supports the sentence it is attached to, which is the failure mode that would matter most in real use.

> This is a demonstrator. Production deployment would require domain validation of the answers, a security review of document handling, and evaluation evidence well beyond what I have collected.
