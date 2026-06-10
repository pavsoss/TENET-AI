import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import PipelineSection from './components/PipelineSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import ComparisonTable from './components/ComparisonTable';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import BreachCards from './components/BreachCards';
import InstallSection from './components/InstallSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="page">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="main">
        {/* Section 1: Hero Area + Real-Time Security Log Terminal */}
        <Hero />

        {/* Section 2: Core Metrics & Counter Animation Strip */}
        <StatsSection />

        {/* Section 3: Threat Mitigation Pipeline Flow */}
        <PipelineSection />

        {/* Section 4: Deep Security Feature Cards Matrix */}
        <FeaturesSection />

        {/* Section 5: Real-Time Interactive Attack Sandbox */}
        <DemoSection />

        {/* Section 6: Standard Filter Capability Comparison */}
        <ComparisonTable />

        {/* Section 7: Middleware Flow Architecture Topology */}
        <ArchitectureDiagram />

        {/* Section 8: Severity Incident Timelines & Interactive Case Studies */}
        <BreachCards />

        {/* Section 9: Installation Configurations */}
        <InstallSection />

        {/* Section 10: Call-To-Action (CTAs) */}
        <CtaSection />
      </main>

      {/* Global Footer navigation & Back To Top */}
      <Footer />
    </div>
  );
}
