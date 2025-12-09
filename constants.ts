
import { Opportunity, OpportunityType } from './types';

// Cleared mock data as requested. The app starts empty.
export const MOCK_OPPORTUNITIES: Opportunity[] = [];

export const CATEGORIES = [
  { id: 'all', key: 'categoryAll', icon: 'Grid' },
  { id: OpportunityType.JOB, key: 'catJob', icon: 'Briefcase' },
  { id: OpportunityType.INTERNSHIP, key: 'catInternship', icon: 'GraduationCap' },
  { id: OpportunityType.SCHOLARSHIP, key: 'catScholarship', icon: 'Award' },
  { id: OpportunityType.COURSE, key: 'catCourse', icon: 'BookOpen' },
  { id: OpportunityType.VOLUNTEER, key: 'catVolunteer', icon: 'Heart' },
];
