
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeploymentGuide from '@/components/DeploymentGuide';

const DeploymentPage = () => {
  return (
    <div className="relative">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <DeploymentGuide />
      </main>
      <Footer />
    </div>
  );
};

export default DeploymentPage;
