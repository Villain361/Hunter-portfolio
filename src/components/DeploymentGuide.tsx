
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, ExternalLink, CheckCircle } from 'lucide-react';

const DeploymentStep = ({ 
  number, 
  title, 
  description,
  code
}: { 
  number: number;
  title: string;
  description: string;
  code?: string;
}) => {
  return (
    <motion.div
      className="border border-border rounded-lg p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
    >
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
          {number}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-sm text-foreground/70 mb-3">{description}</p>
          
          {code && (
            <div className="bg-background/50 rounded-md p-3 overflow-x-auto">
              <pre className="text-xs text-foreground/90 whitespace-pre-wrap">{code}</pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DeploymentGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
      <div className="mb-6 text-center">
        <motion.h2 
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Deploying to GitHub Pages
        </motion.h2>
        <motion.p
          className="text-foreground/70"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Follow these steps to host your portfolio on GitHub Pages
        </motion.p>
      </div>
      
      <DeploymentStep
        number={1}
        title="Create a GitHub repository"
        description="First, create a new repository on GitHub. You can name it something like 'portfolio' or 'your-username.github.io' for a custom domain."
      />
      
      <DeploymentStep
        number={2}
        title="Install GitHub Pages dependency"
        description="Add the gh-pages package to your project dependencies."
        code="npm install --save-dev gh-pages"
      />
      
      <DeploymentStep
        number={3}
        title="Update package.json"
        description="Add the following scripts and homepage field to your package.json file."
        code={`{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    // ... other scripts
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}`}
      />
      
      <DeploymentStep
        number={4}
        title="Configure Vite for base path"
        description="Update your vite.config.ts file to include the base path for GitHub Pages."
        code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/repository-name/' // Replace with your repo name
})`}
      />
      
      <DeploymentStep
        number={5}
        title="Deploy to GitHub Pages"
        description="Run the deploy script to publish your website to GitHub Pages."
        code="npm run deploy"
      />
      
      <DeploymentStep
        number={6}
        title="Configure GitHub Pages settings"
        description="Go to your repository settings, find the GitHub Pages section, and select the gh-pages branch as the source."
      />
      
      <motion.div
        className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex items-start">
          <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Success!</h3>
            <p className="text-sm text-foreground/70">
              Your portfolio will be available at: <br />
              <a 
                href="https://yourusername.github.io/repository-name" 
                className="text-primary hover:underline flex items-center mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://yourusername.github.io/repository-name 
                <ExternalLink size={12} className="ml-1" />
              </a>
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-8 flex justify-center">
        <motion.a
          href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          <span>GitHub Pages Documentation</span>
        </motion.a>
      </div>
    </div>
  );
};

export default DeploymentGuide;
