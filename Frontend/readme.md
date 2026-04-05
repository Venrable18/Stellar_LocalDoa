# LocalDAO Frontend Demo

A static UI demonstration of the LocalDAO platform, showcasing the dashboard with dummy data for investor presentations.

## Features

- **Dashboard View**: Displays key metrics, active DAOs, and pending proposals
- **Dummy Data**: All data is hardcoded for demonstration purposes
- **Responsive Design**: Built with React and TypeScript
- **Static Build**: No backend dependencies, deployable on Vercel

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deployment on Vercel

1. Push this code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel will automatically detect the Vite build and deploy the `dist` folder

The app is configured to build static files suitable for Vercel deployment.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
