
/**
 * GitHub Pages Deployment Utilities
 * 
 * This module provides utility functions and detailed instructions for deploying your portfolio to GitHub Pages.
 */

/**
 * Checks if the current environment is a GitHub Pages environment
 */
export const isGitHubPages = (): boolean => {
  return window.location.hostname.includes('github.io');
};

/**
 * Gets the base path for GitHub Pages deployment
 * If the repository name is 'username.github.io', the base is '/'
 * Otherwise, it's '/repository-name/'
 */
export const getBasePath = (): string => {
  // You'll need to replace 'portfolio' with your actual repository name
  return '/portfolio/';
};

/**
 * Step-by-step GitHub Pages deployment guide
 */
export const deploymentSteps = [
  {
    step: 1,
    title: "Create a GitHub repository",
    description: "Create a new repository on GitHub. For a user site, name it 'username.github.io' (replace 'username' with your GitHub username). For a project site, you can use any name like 'portfolio'.",
    code: null
  },
  {
    step: 2,
    title: "Update vite.config.ts with your repository name",
    description: "For project sites (not username.github.io), set the base path in vite.config.ts:",
    code: `
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Replace 'portfolio' with your repository name
})
`
  },
  {
    step: 3,
    title: "Add deployment scripts to package.json",
    description: "Add predeploy and deploy scripts to your package.json file:",
    code: `
// In package.json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
`
  },
  {
    step: 4,
    title: "Install the gh-pages package",
    description: "Install the gh-pages package as a development dependency:",
    code: "npm install --save-dev gh-pages"
  },
  {
    step: 5,
    title: "Connect your local repository to GitHub",
    description: "Initialize Git and connect to your GitHub repository:",
    code: `
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepositoryname.git
git push -u origin main
`
  },
  {
    step: 6,
    title: "Deploy to GitHub Pages",
    description: "Deploy your site to GitHub Pages using the script you added:",
    code: "npm run deploy"
  },
  {
    step: 7,
    title: "Configure GitHub Pages in repository settings",
    description: "Go to your repository on GitHub, click Settings > Pages, and set Source to 'gh-pages branch'.",
    code: null
  }
];

/**
 * Common GitHub Pages deployment issues and solutions
 */
export const deploymentTroubleshooting = [
  {
    issue: "404 errors when navigating routes",
    solution: "Create a 404.html file in the public folder that redirects to index.html with the proper path handling"
  },
  {
    issue: "Assets not loading (images, CSS, JS)",
    solution: "Make sure all asset references use relative paths or start with the base path defined in vite.config.ts"
  },
  {
    issue: "Blank page after deployment",
    solution: "Check browser console for errors. Ensure your base path in vite.config.ts matches your repository name exactly"
  },
  {
    issue: "Custom domain not working",
    solution: "Add a CNAME file to your 'public' folder with your domain name and configure DNS settings with your domain provider"
  }
];

/**
 * Create a simple HTML file for handling 404s with SPA routing
 * Add this to your public folder as '404.html'
 */
export const get404Html = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    (function(l) {
      if (l.search[1] === '/') {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <meta http-equiv="refresh" content="0;url=index.html">
</head>
<body>
  Redirecting to home page...
</body>
</html>
`;
};

/**
 * Example to add to index.html to handle SPA routing on GitHub Pages
 */
export const getSpaRoutingScript = () => {
  return `
<!-- Script for GitHub Pages SPA routing - add this to index.html -->
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // MIT License
  // https://github.com/rafgraph/spa-github-pages
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
`;
};

export default {
  isGitHubPages,
  getBasePath,
  deploymentSteps,
  deploymentTroubleshooting,
  get404Html,
  getSpaRoutingScript
};
