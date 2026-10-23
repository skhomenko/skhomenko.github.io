---
title: pytest-graphql
eyebrow: Open source test library
summary: A GraphQL test client for Python. Calls are built from the schema and checked against it before they are sent.
description: A case study of pytest-graphql, an open source Python library for testing GraphQL APIs with pytest. Built on graphql-core and httpx, released on PyPI.
order: 1
status: ongoing
role: Author and maintainer
collaboration: Open source, MIT licensed
technologies:
  - Python
  - pytest
  - GraphQL
  - graphql-core
  - httpx
  - PyPI
diagram: library
---

## What it does

pytest-graphql is a GraphQL test client for Python. A test names an operation, and the client chooses the fields to ask for. The test holds no query text.

```python
def test_user_has_a_name(gql):
    user = gql.query("user", id="u1")
    assert user.name == "Ada Lovelace"
```

The `gql` fixture is a client that has already read the schema. It builds the call, sends it over HTTP to a server that is running, and returns a response that reads like a Python object.

## Why it exists

Many GraphQL tests keep the query as a string and read the answer as a dictionary. That string is a second copy of the schema. When a field is renamed, someone must find every string that names it. A typo shows up late, and often only as an `errors` list inside a response with status 200. A test that forgets to look at that list passes for the wrong reason.

I wanted a test to say what it checks and nothing else.

## Design choices

- **The schema is the source.** The client reads it by introspection, or from a file. Auto-selection builds the selection set from it, and `fields=` takes over when a test needs exact fields.
- **Wrong names fail early.** A wrong operation, argument or field name fails in the client, before anything is sent. The message names the closest correct one.
- **Safe defaults.** A response with errors raises. A test that expects an error says so with `gql.expect_error()`. A field that is not in the response raises, so a typo cannot pass as a null value.
- **Failures show the calls.** A failed test lists its calls, hides the headers and variables that you mark as secrets, and ends with a `curl` line that repeats the failed call.
- **Open to change.** You can replace the transport, load the schema from a file, register custom scalars, add middleware, or use the pytest hooks.
- **The core does not need pytest.** `build_client()` works in `unittest` and in scripts.

I also wrote down what it is not for. It does not mock a GraphQL server, it is not a client for production code, and it does not fuzz an API.

## Stack

Python 3.10 through 3.14. The required dependencies are `graphql-core`, `httpx` and `certifi`. `pytest` is optional. It is published on PyPI, and the documentation is a separate site.

## Status

Released on PyPI. It is a 0.x library, so the API may change between minor versions, and the changelog records every change.

## Links

- Documentation: https://skhomenko.github.io/pytest-graphql/
- PyPI: https://pypi.org/project/pytest-graphql/
- Source code: https://github.com/skhomenko/pytest-graphql
