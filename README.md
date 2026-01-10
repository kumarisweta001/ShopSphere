# Product Listing Page (PLP) - E-commerce Application

A modern, fully-tested e-commerce product listing and shopping cart application built with Vue 3, TypeScript, and Vite. This application demonstrates best practices in state management, component architecture, and comprehensive testing strategies.

## Features

- **Product Listing**: Browse products fetched from a remote API with responsive card layouts
- **Shopping Cart**: Add, remove, and manage products with real-time cart updates
- **Payment Flow**: Complete checkout process with cart summary and payment views
- **Responsive Design**: Mobile-first design with Bootstrap 5 integration
- **State Management**: Pinia stores for products and cart with persistent storage
- **Type Safety**: Full TypeScript implementation across the application
- **Comprehensive Testing**:
  - Unit tests with Vitest for stores, components, and views
  - Component tests with Cypress for isolated component testing
  - End-to-end tests with Cypress for complete user workflows

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Pinia** for state management
- **Vue Router** for navigation
- **Bootstrap 5** for styling
- **Vitest** for unit testing
- **Cypress** for component and E2E testing

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
