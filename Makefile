SHELL := /bin/sh

.DEFAULT_GOAL := help

.PHONY: help install dev start verify format format-fix check build preview

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*## "; print "Available commands:"} /^[a-zA-Z_-]+:.*## / {printf "  make %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install locked project dependencies
	npm ci

dev: ## Start the local development server with hot reload
	npm run dev

start: verify ## Validate, build, and start the production preview
	npm run preview

verify: format build ## Run all checks and create a production build

format: ## Check source formatting
	npm run format

format-fix: ## Apply Prettier formatting
	npm run format:write

check: ## Run Astro and TypeScript diagnostics
	npm run check

build: ## Check and build the static production site
	npm run build

preview: ## Preview the existing production build
	npm run preview
