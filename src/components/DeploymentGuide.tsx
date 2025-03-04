
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Copy, Check, ExternalLink, FileCode } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DiscordCard from './DiscordCard';

const CodeBlock = ({ code, title }: { code: string; title: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it in your terminal",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden mb-6">
      <div className="bg-primary/10 px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-medium">{title}</span>
        <button 
          onClick={copyToClipboard}
          className="p-1 rounded hover:bg-primary/10 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      <pre className="bg-black/80 text-white p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const StepItem = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold text-sm mr-3">
          {number}
        </div>
        <h3 className="text-xl font-display font-semibold">{title}</h3>
      </div>
      <div className="pl-11">
        {children}
      </div>
    </motion.div>
  );
};

const DeploymentGuide = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Deployment Guide
        </span>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Deploy to <span className="text-gradient">GitHub Pages</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-foreground/80">
          Follow this step-by-step guide to deploy your portfolio on GitHub Pages for free hosting.
        </p>
      </motion.div>
      
      <div className="space-y-12">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center">
            <Github className="mr-2" size={24} />
            GitHub Pages Deployment
          </h2>
          
          <StepItem number={1} title="Create a GitHub Repository">
            <p className="mb-4">
              First, create a new repository on GitHub. You can name it <code className="bg-primary/10 px-2 py-1 rounded text-primary">{`username.github.io`}</code> 
              (replace "username" with your GitHub username) for it to be available at https://username.github.io.
            </p>
            <div className="flex gap-4 my-6">
              <a 
                href="https://github.com/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
              >
                <Github size={18} />
                Create New Repository
                <ExternalLink size={14} />
              </a>
            </div>
          </StepItem>
          
          <StepItem number={2} title="Prepare Your Project for GitHub Pages">
            <p className="mb-4">
              When using Vite, you need to make a few adjustments to properly deploy to GitHub Pages.
            </p>
            
            <h4 className="font-medium mb-2">Update vite.config.ts:</h4>
            <CodeBlock 
              title="vite.config.ts"
              code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Set the base to './' for GitHub Pages
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`}
            />
          </StepItem>
          
          <StepItem number={3} title="Create GitHub Actions Workflow">
            <p className="mb-4">
              Create a GitHub Actions workflow file to automate deployment.
            </p>
            
            <h4 className="font-medium mb-2">Create .github/workflows/deploy.yml:</h4>
            <CodeBlock 
              title=".github/workflows/deploy.yml"
              code={`name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1`}
            />
          </StepItem>
          
          <StepItem number={4} title="Push to GitHub">
            <p className="mb-4">
              Initialize your local repository, add your files, and push to GitHub.
            </p>
            
            <CodeBlock 
              title="Terminal Commands"
              code={`# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/username/username.github.io.git

# Push to GitHub
git push -u origin main`}
            />
          </StepItem>
          
          <StepItem number={5} title="Configure GitHub Pages">
            <p className="mb-4">
              In your GitHub repository settings, enable GitHub Pages:
            </p>
            
            <ol className="list-decimal ml-5 space-y-2 mb-6">
              <li>Go to your repository on GitHub</li>
              <li>Navigate to Settings > Pages</li>
              <li>Under "Source", select "GitHub Actions"</li>
              <li>GitHub will automatically deploy your site when changes are pushed to main</li>
            </ol>
            
            <p className="text-foreground/80 italic">
              Note: It may take a few minutes for your site to deploy after pushing your code.
            </p>
          </StepItem>
        </div>
        
        <motion.div 
          className="rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center">
            <FileCode className="mr-2" size={24} />
            Need Help?
          </h2>
          
          <p className="mb-6">
            If you encounter any issues during deployment, feel free to reach out to me on Discord! I'm happy to help with any questions or troubleshooting.
          </p>
          
          <div className="mb-6">
            <DiscordCard />
          </div>
          
          <p className="text-foreground/80 italic">
            Remember that GitHub Pages is free for public repositories. If you want to keep your code private, you might want to explore other hosting options like Netlify or Vercel.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
