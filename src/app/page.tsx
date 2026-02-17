"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationSection from "@/components/EducationSection";
import ProjectsResearch from "@/components/ProjectsResearch";
import ResearchSection from "@/components/ResearchSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import BeyondTerminal from "@/components/BeyondTerminal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import ChatWidget from "@/components/ChatWidget";
import { ToastProvider } from "@/components/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceTimeline />
        <EducationSection />
        <ProjectsResearch />
        <ResearchSection />
        <AchievementsSection />
        <SkillsSection />
        <BeyondTerminal />
        <ContactSection />
      </main>
      <Footer />
      <CommandPalette />
      <ChatWidget />
    </ToastProvider>
  );
}
