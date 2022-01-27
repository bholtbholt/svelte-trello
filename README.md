# Svelte + Tailwind + TypeScript + Vite + Jest

This is a template to quickly get started with a Svelte project.

## Installation

### Prerequisites

- Download the latest version of [Node](https://nodejs.org/en/) and NPM.

### Startup

```
npm install
npm run dev
# then visit http://localhost:3000/
```

### Tech

- [Svelte](https://svelte.dev).
- [TailwindCSS](https://tailwindcss.com).
- [TypeScript](https://www.typescriptlang.org).
- [Vite](https://vitejs.dev).
- [Jest](https://jestjs.io) with [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro).

## Structure and Content

- `./components`: App UI, written in Svelte.
- `./entry`: CSS + JavaScript entry files.
- `./stores`: Reactive Svelte stores used by the UI. Stores are similar to _Models_ in design and primarily used for shared state between components.
- `./types`: Global types for the app.

## Testing

Tests are written with [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro) and [Jest](https://jestjs.io). All tests live next to the file they're tested. ie. Component tests are within `./components` while Store tests are within `./stores`.

Run `npm run test` for the Jest watcher.

### Test setup

Most tests need the following boilerplate:

```typescript
// Component Test
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import Component from './Component.svelte';
```

```typescript
// Store Test
import { get } from 'svelte/store';
import { store } from './store';

afterEach(() => {
  store.reset();
});
```
