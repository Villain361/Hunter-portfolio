
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Github, Info } from 'lucide-react';
import { deploymentSteps, deploymentTroubleshooting } from '@/utils/GithubPagesDeployment';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const CodeBlock = ({ code }: { code: string | null }) => {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-2 mb-4 rounded-md bg-black/80 p-4 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded-md bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className="text-sm text-white font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const GitHubPagesGuide = () => {
  const [activeTab, setActiveTab] = useState<'steps' | 'troubleshooting'>('steps');

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Github className="text-primary mr-3" size={24} />
        <h2 className="text-2xl font-display font-bold">Deploy to GitHub Pages</h2>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('steps')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'steps'
              ? "bg-primary text-white"
              : "bg-primary/10 text-foreground hover:bg-primary/20"
          )}
        >
          Deployment Steps
        </button>
        <button
          onClick={() => setActiveTab('troubleshooting')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'troubleshooting'
              ? "bg-primary text-white"
              : "bg-primary/10 text-foreground hover:bg-primary/20"
          )}
        >
          Troubleshooting
        </button>
      </div>

      {activeTab === 'steps' ? (
        <div className="space-y-8">
          {deploymentSteps.map((step) => (
            <div key={step.step} className="relative pl-10">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-foreground/80 mb-3">{step.description}</p>
              <CodeBlock code={step.code} />
            </div>
          ))}

          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 mt-6">
            <div className="flex items-start">
              <Info className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium text-yellow-500 mb-1">Important Note</h4>
                <p className="text-foreground/80 text-sm">
                  If your portfolio uses client-side routing (React Router), you'll need additional setup to handle route redirects. 
                  Check the troubleshooting tab for more information about handling 404 errors.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <motion.a
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#24292e] text-white font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub Pages Documentation
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {deploymentTroubleshooting.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/50">
              <h3 className="font-semibold mb-2">{item.issue}</h3>
              <p className="text-foreground/80 text-sm">{item.solution}</p>
            </div>
          ))}

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 mt-6">
            <div className="flex items-start">
              <Info className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium text-primary mb-1">Using React Router?</h4>
                <p className="text-foreground/80 text-sm mb-2">
                  For SPAs with client-side routing, create a <code className="text-xs bg-primary/20 px-1 py-0.5 rounded">404.html</code> file 
                  in your <code className="text-xs bg-primary/20 px-1 py-0.5 rounded">public</code> folder that redirects to your index page.
                </p>
                <a 
                  href="https://github.com/rafgraph/spa-github-pages" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center"
                >
                  View SPA GitHub Pages solution
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubPagesGuide;
