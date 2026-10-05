import datasetRaw from '@/data/ascendra_dataset.json';
import type { AscendraDataset } from '@/types/dataset';
import Hero from '@/components/hero/Hero';
import InfiniteMarquee from '@/components/common/InfiniteMarquee';
import WhyLearningSection from '@/components/sections/WhyLearningSection';
import LearningUniverseSection from '@/components/sections/LearningUniverseSection';
import ProgramExplorerSection from '@/components/sections/ProgramExplorerSection';
import LearningPathwaysSection from '@/components/sections/LearningPathwaysSection';
import TrainerStoriesSection from '@/components/sections/TrainerStoriesSection';
import TrialClassSection from '@/components/sections/TrialClassSection';
import AdmissionsSection from '@/components/sections/AdmissionsSection';
import LearningFormatsSection from '@/components/sections/LearningFormatsSection';
import CertificationJourneySection from '@/components/sections/CertificationJourneySection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import EventsWorkshopsSection from '@/components/sections/EventsWorkshopsSection';
import ScholarshipsSection from '@/components/sections/ScholarshipsSection';
import CommunitySection from '@/components/sections/CommunitySection';
import CampusesSection from '@/components/sections/CampusesSection';

const dataset = datasetRaw as unknown as AscendraDataset;

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Landing Experience Hero */}
      <Hero brand={dataset.brand} />

      {/* Kinetic Ticker Marquee */}
      <InfiniteMarquee />

      {/* Section 01: Why Are You Learning? */}
      <WhyLearningSection
        goals={dataset.learning_goals}
        courses={dataset.courses}
      />

      {/* Section 02: Learning Universe */}
      <LearningUniverseSection
        universePanels={dataset.learning_universe}
      />

      {/* Section 03: Program Explorer */}
      <ProgramExplorerSection
        courses={dataset.courses}
      />

      {/* Section 04: Learning Pathways */}
      <LearningPathwaysSection
        pathways={dataset.learning_pathways}
      />

      {/* Section 05: Trainer Stories */}
      <TrainerStoriesSection
        trainers={dataset.trainers}
      />

      {/* Section 06: Trial Class Experience */}
      <TrialClassSection
        trialClasses={dataset.trial_classes}
        trainers={dataset.trainers}
        campuses={dataset.campuses}
        courses={dataset.courses}
      />

      {/* Section 07: Admissions Experience */}
      <AdmissionsSection
        goals={dataset.learning_goals}
        courses={dataset.courses}
        formats={dataset.learning_formats}
        campuses={dataset.campuses}
      />

      {/* Section 08: Learning Formats */}
      <LearningFormatsSection
        formats={dataset.learning_formats}
      />

      {/* Section 09: Certification Journey */}
      <CertificationJourneySection
        certifications={dataset.certifications}
      />

      {/* Section 10: Success Stories & Reviews */}
      <SuccessStoriesSection
        successStories={dataset.success_stories}
        reviews={dataset.reviews}
      />

      {/* Section 11: Events & Workshops */}
      <EventsWorkshopsSection
        events={dataset.events_and_workshops}
      />

      {/* Section 12: Scholarships */}
      <ScholarshipsSection
        scholarships={dataset.scholarships}
      />

      {/* Section 13: Community */}
      <CommunitySection
        community={dataset.community}
      />

      {/* Section 14: Campuses */}
      <CampusesSection
        campuses={dataset.campuses}
      />
    </div>
  );
}
