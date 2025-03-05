
/**
 * GitHub Pages Deployment Utilities
 * 
 * This module provides utility functions and information for deploying your React application to GitHub Pages.
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
  // You'll need to replace 'repository-name' with your actual repository name
  return '/repository-name/';
};

/**
 * Steps for deploying to GitHub Pages:
 * 
 * 1. Update vite.config.ts with your repository name:
 *    ```
 *    export default defineConfig({
 *      plugins: [react()],
 *      base: '/your-repository-name/',
 *    });
 *    ```
 * 
 * 2. Add the deployment script to your package.json:
 *    ```
 *    "scripts": {
 *      "predeploy": "npm run build",
 *      "deploy": "gh-pages -d dist",
 *    }
 *    ```
 * 
 * 3. Install the gh-pages package:
 *    ```
 *    npm install --save-dev gh-pages
 *    ```
 * 
 * 4. Run the deployment command:
 *    ```
 *    npm run deploy
 *    ```
 * 
 * 5. Make sure to push your code to GitHub and set up GitHub Pages in the repository settings
 */

/**
 * Common GitHub Pages deployment issues and solutions
 */
export const deploymentTroubleshooting = [
  {
    issue: "404 errors when navigating routes",
    solution: "Create a 404.html file that redirects to index.html with the correct path"
  },
  {
    issue: "Assets not loading (images, CSS, JS)",
    solution: "Make sure all asset references use relative paths or start with the base path"
  },
  {
    issue: "Pages refresh doesn't work",
    solution: "Use HashRouter instead of BrowserRouter, or set up proper redirects"
  },
  {
    issue: "Custom domain not working",
    solution: "Add a CNAME file to your 'public' folder with your domain name"
  }
];

export default {
  isGitHubPages,
  getBasePath,
  deploymentTroubleshooting
};
