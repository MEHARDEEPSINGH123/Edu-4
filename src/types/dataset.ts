export interface Brand {
  name: string;
  tagline: string;
  subheadline: string;
  country: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface LearningGoal {
  id: string;
  title: string;
  tag: string;
  description: string;
  metric: string;
  accent: string;
  recommended_universe: string;
  recommended_course_ids: string[];
  recommended_pathway_id: string;
  quote: string;
  author: string;
  author_title: string;
  image: string;
}

export interface UniversePanel {
  id: string;
  title: string;
  subtitle: string;
  category_key: string;
  description: string;
  stats: string;
  color_accent: string;
  badge: string;
  featured_programs: string[];
  key_competencies: string[];
  image: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  category: string;
  universe: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Executive';
  duration: string;
  hours_total: number;
  format: string;
  fee_sgd: number;
  skillsfuture_eligible: boolean;
  skillsfuture_subsidy_sgd: number;
  net_fee_sgd: number;
  eligibility: string;
  prerequisites: string;
  overview: string;
  syllabus: {
    module_number: number;
    title: string;
    topics: string[];
  }[];
  next_cohort_date: string;
  schedule_summary: string;
  campus_locations: string[];
  trainer_ids: string[];
  certification_name: string;
  image: string;
  rating: number;
  total_enrolled: number;
  featured: boolean;
  key_outcomes: string[];
}

export interface LearningPathwayStep {
  step_number: number;
  stage_name: 'Student Profile' | 'Ascendra Program' | 'Industry Projects' | 'Global Certification' | 'Career Outcome';
  title: string;
  description: string;
  details: string[];
  highlight: string;
}

export interface LearningPathway {
  id: string;
  title: string;
  category: string;
  duration_months: number;
  target_role: string;
  avg_salary_sgd: string;
  salary_uplift: string;
  hiring_partners: string[];
  steps: LearningPathwayStep[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  credentials: string;
  quote: string;
  story: string;
  industry_expertise: string[];
  achievements: string[];
  experience_years: number;
  previous_orgs: string[];
  image: string;
  courses_taught: string[];
  campus_base: string;
}

export interface TrialClass {
  id: string;
  course_id: string;
  title: string;
  trainer_id: string;
  campus_id: string;
  date_time: string;
  duration_mins: number;
  mode: string;
  seats_total: number;
  seats_remaining: number;
  agenda: string[];
  key_takeaway: string;
  fee_sgd: number; // 0 for complimentary
}

export interface LearningFormat {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  best_for: string;
  intensity: string;
  schedule_flexibility: string;
  features: string[];
  image: string;
  accent: string;
}

export interface CertificationStep {
  stage: string;
  phase_title: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  awarding_body: string;
  accreditation_level: string;
  recognition_scope: string;
  career_benefits: string[];
  journey_steps: CertificationStep[];
  badge_image: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  previous_role: string;
  current_role: string;
  company: string;
  program_completed: string;
  salary_impact: string;
  timeframe: string;
  before: string;
  learning: string;
  transformation: string;
  outcome: string;
  quote: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  course_title: string;
  rating: number;
  year: string;
  comment: string;
  verified: boolean;
  campus: string;
}

export interface Scholarship {
  id: string;
  title: string;
  funding_amount: string;
  funding_type: string;
  eligibility: string[];
  benefits: string[];
  application_deadline: string;
  process_steps: string[];
  badge: string;
}

export interface EventWorkshop {
  id: string;
  title: string;
  type: 'Keynote' | 'Masterclass' | 'Workshop' | 'Industry Talk' | 'Career Session';
  category: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  speaker: string;
  speaker_title: string;
  speaker_image: string;
  capacity: number;
  spots_left: number;
  is_free: boolean;
  description: string;
  topics: string[];
  image: string;
}

export interface CommunityMember {
  id: string;
  type: 'Student' | 'Professional' | 'Mentor' | 'Alumni' | 'Industry Partner';
  name: string;
  title: string;
  company_or_institution: string;
  contribution: string;
  image: string;
}

export interface Campus {
  id: string;
  name: string;
  zone: 'Central' | 'West' | 'East' | 'North' | 'South';
  address: string;
  mrt: string;
  facilities: string[];
  architectural_concept: string;
  image: string;
  phone: string;
  opening_hours: string;
}

export interface AscendraDataset {
  brand: Brand;
  dataset_summary: {
    campuses: number;
    course_categories: number;
    courses: number;
    trainers: number;
    trial_classes: number;
    schedules: number;
    certifications: number;
    reviews: number;
    success_stories: number;
    scholarships: number;
    career_pathways: number;
  };
  course_categories: string[];
  learning_goals: LearningGoal[];
  learning_universe: UniversePanel[];
  courses: Course[];
  learning_pathways: LearningPathway[];
  trainers: Trainer[];
  trial_classes: TrialClass[];
  learning_formats: LearningFormat[];
  certifications: CertificationItem[];
  success_stories: SuccessStory[];
  reviews: Review[];
  scholarships: Scholarship[];
  events_and_workshops: EventWorkshop[];
  community: {
    stats: { label: string; value: string }[];
    members: CommunityMember[];
    partners: string[];
    initiatives: { title: string; description: string; tag: string }[];
  };
  campuses: Campus[];
}
