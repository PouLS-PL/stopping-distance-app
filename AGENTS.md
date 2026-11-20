# Agent Guide

## Project overview

This is a React/Vite application for estimating vehicle stopping distance. It supports Polish and English interfaces, surface and incline inputs, GPS speed through Capacitor, unit conversion, and saving settings to the Android app's local data directory.

The main application is a client-side React app in `src/`, with a Vitest unit-test suite in `tests/`. The Android wrapper is maintained under `android/`, and Capacitor builds the Vite output from `dist/`.

## Source and directory structure

```text
.
├── README.md                  # Setup, quick-start, and mobile instructions
├── package.json               # npm scripts and dependencies
├── capacitor.config.json      # Capacitor app ID, name, and web directory
├── index.html                 # Vite HTML entry point
├── vite.config.js             # Vite/React configuration
├── vitest.config.js           # Test discovery configuration
├── eslint.config.js           # ESLint, React Hooks, React Refresh, and Prettier rules
├── public/                    # Static images and icons copied by Vite
├── src/
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Main application state and page composition
│   ├── Settings.jsx           # Standalone settings component
│   ├── SettingsStorage.jsx    # Native/Capacitor settings persistence
│   ├── SpeedMeasurement.jsx   # GPS speed tracking and display
│   ├── Units.jsx              # Unit selection screen
│   ├── unitSettings.js        # Default display units
│   ├── unitConversion.js      # Unit conversion helpers
│   ├── stoppingDistance.js    # Stopping-distance calculation logic
│   ├── translations.jsx       # English and Polish strings
│   └── index.css              # Application styles
├── tests/
│   └── testsUnitConversion.js # Vitest unit-conversion tests
├── docs/
│   └── manual-pl.md           # Polish project manual
├── android/                   # Capacitor Android/Gradle project
├── dist/                      # Generated Vite build output
└── node_modules/              # Installed npm dependencies
```

Generated directories such as `node_modules/`, `dist/`, and Android build output should not normally be edited. ESLint ignores `dist/` and `android/` as configured in `eslint.config.js`.

## README commands

Run these commands from the repository root.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The README directs the browser to `http://localhost:5173/`, or to the URL printed by Vite.

Build and sync the web app into the Android project:

```bash
npm run build && npx cap sync
```

Open the Android project in Android Studio with Capacitor:

```bash
npx cap open android
```

You can alternatively open the `android/` directory directly in Android Studio.

## Package scripts

| Command            | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `npm start`        | Start Vite (`vite`)                               |
| `npm run dev`      | Start the Vite development server                 |
| `npm run preview`  | Preview a production build                        |
| `npm test`         | Run the Vitest suite once                         |
| `npm run build`    | Create a production build in `dist/`              |
| `npm run lint`     | Run ESLint across the repository                  |
| `npm run format`   | Format files with Prettier                        |
| `npm run prepare`  | Install/configure Husky                           |
| `npm run cap:sync` | Build the app and sync it to the Android platform |

Useful direct commands:

```bash
npm start
npm run dev
npm run preview
npm test
npm run build
npm run lint
npm run format
npm run cap:sync
npx cap sync android
npx cap open android
```

The pre-commit hook runs `npm test && npx lint-staged`. Lint-staged formats and fixes staged JavaScript/JSX files and formats staged JSON/CSS/HTML/Markdown files.

## Running the linter

Run the configured linter from the repository root:

```bash
npm run lint
```

This executes `eslint .`. ESLint ignores `dist/**` and `android/**`; JavaScript and JSX files use the recommended JavaScript, React Hooks, React Refresh, and Prettier rules.

To lint a specific file or fix lint issues where supported:

```bash
npx eslint src/App.jsx
npx eslint . --fix
```

By default, `npm run lint` completes successfully with 0 errors and 10 warnings. Warnings are reported for unused variables, React Refresh/export style, React Hook dependencies/effects, and Prettier formatting.

## Testing

Vitest is configured to include only `tests/testsUnitConversion.js`. Run all configured tests with:

```bash
npm test
```

Use npm rather than adding a separate test runner or ad hoc script.

## Code guidelines

Ensure that when creating user facing strings, both the polish version and english version are created, look at preexisting code for usage, since it varies per file.

Ensure that the UI code that is created is optimized for mobile usage, you can ignore all pc compability, not all functions work, or need to work on pc (such as gps or settings saving).
