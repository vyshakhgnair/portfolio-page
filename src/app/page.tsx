"use client";

import HeroSection from "@/components/HeroSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationSection from "@/components/EducationSection";
import ProjectsResearch from "@/components/ProjectsResearch";
import ResearchSection from "@/components/ResearchSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import BeyondTerminal from "@/components/BeyondTerminal";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
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
  );
}
