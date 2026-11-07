// Grantly — sample scholarship data.
// All listings are SAMPLE data created for this hackathon demo. Real applicants must
// verify eligibility, amounts and deadlines on each scheme's official portal.

export type Level = 'Class 11–12' | 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'PhD';

export type Category =
  | 'Merit'
  | 'Need-based'
  | 'Girls'
  | 'STEM'
  | 'State'
  | 'Sports'
  | 'Disability'
  | 'Minority'
  | 'Research';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: Category;
  levels: Level[];
  amount: number; // ₹ per year
  amountNote: string;
  deadline: string; // ISO date
  state: string; // 'All India' or a state name
  minMarks: number | null; // minimum % in last exam, null = no bar
  maxIncome: number | null; // family income cap in ₹ LPA, null = no cap
  gender: 'Any' | 'Female';
  minorityOnly?: boolean;
  disabilityOnly?: boolean;
  sportsOnly?: boolean;
  description: string;
  benefits: string[];
  documents: string[];
  steps: string[];
  seats: string;
  renewal: string;
  tags: string[];
  featured?: boolean;
}

export const LEVELS: Level[] = ['Class 11–12', 'Diploma', 'Undergraduate', 'Postgraduate', 'PhD'];

export const CATEGORIES: Category[] = [
  'Merit',
  'Need-based',
  'Girls',
  'STEM',
  'State',
  'Sports',
  'Disability',
  'Minority',
  'Research',
];

export const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'udaan-need-based',
    name: 'Udaan Need-Based Scholarship',
    provider: 'Udaan Education Trust',
    category: 'Need-based',
    levels: ['Undergraduate'],
    amount: 75000,
    amountNote: '₹75,000 per year, tuition + hostel',
    deadline: '2026-11-10',
    state: 'All India',
    minMarks: 60,
    maxIncome: 3.5,
    gender: 'Any',
    description:
      'For first-year undergraduates from low-income households. Covers a large share of tuition and hostel fees so students can focus on classes instead of costs.',
    benefits: ['₹75,000 per year', 'Renewable for full course duration', 'Mentorship from alumni'],
    documents: ['Income certificate', 'Class 12 marksheet', 'Admission letter', 'Aadhaar card', 'Bank passbook copy'],
    steps: ['Create your profile', 'Upload income certificate', 'Submit marksheet and admission letter', 'Interview (shortlisted only)'],
    seats: '2,000 seats',
    renewal: 'Maintain 60% marks each year',
    tags: ['Low income', 'First year', 'Hostel covered'],
    featured: true,
  },
  {
    id: 'national-merit',
    name: 'National Merit Scholars Award',
    provider: 'National Education Foundation',
    category: 'Merit',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 50000,
    amountNote: '₹50,000 one-time award',
    deadline: '2026-11-12',
    state: 'All India',
    minMarks: 85,
    maxIncome: null,
    gender: 'Any',
    description:
      'A pure merit award for students who scored 85% or above in their last board or university examination. No income bar — excellence is the only criterion.',
    benefits: ['₹50,000 one-time', 'Certificate of merit', 'National merit roll listing'],
    documents: ['Last exam marksheet', 'Bonafide certificate', 'Aadhaar card'],
    steps: ['Fill the application', 'Upload marksheet', 'Verification by institution'],
    seats: '5,000 seats',
    renewal: 'One-time award',
    tags: ['High scorers', 'No income bar'],
    featured: true,
  },
  {
    id: 'khelo-sports',
    name: 'Khelo India Sports Scholars',
    provider: 'Youth Sports Council',
    category: 'Sports',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 60000,
    amountNote: '₹60,000 per year + kit allowance',
    deadline: '2026-11-14',
    state: 'All India',
    minMarks: 50,
    maxIncome: null,
    gender: 'Any',
    sportsOnly: true,
    description:
      'For student-athletes who have represented their school, district or state. Keeps sporting talent in education with funding plus a training kit allowance.',
    benefits: ['₹60,000 per year', '₹10,000 kit allowance', 'Flexible exam scheduling support'],
    documents: ['Sports certificates', 'Class 10/12 marksheet', 'Bonafide certificate', 'Aadhaar card'],
    steps: ['Apply with sports record', 'District verification', 'State-level shortlist'],
    seats: '1,200 seats',
    renewal: 'Annual sports performance review',
    tags: ['Athletes', 'State level and above'],
  },
  {
    id: 'pratibha-girls',
    name: "Pratibha Girls' Education Grant",
    provider: 'Pratibha Foundation',
    category: 'Girls',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 25000,
    amountNote: '₹25,000 per year',
    deadline: '2026-11-20',
    state: 'All India',
    minMarks: 65,
    maxIncome: 5,
    gender: 'Female',
    description:
      'Encourages girls to stay in education after Class 10. A simple, quick application with minimal paperwork and direct bank transfer.',
    benefits: ['₹25,000 per year', 'Direct bank transfer', 'Career counselling sessions'],
    documents: ['Class 10 marksheet', 'Income certificate', 'Aadhaar card', 'Bank details'],
    steps: ['Register', 'Upload documents', 'School verification'],
    seats: '10,000 seats',
    renewal: 'Pass each year with 60%+',
    tags: ['Girls', 'Direct transfer'],
    featured: true,
  },
  {
    id: 'rural-talent',
    name: 'Rural Talent Scholarship',
    provider: 'Gramin Shiksha Mission',
    category: 'Merit',
    levels: ['Class 11–12'],
    amount: 12000,
    amountNote: '₹12,000 per year',
    deadline: '2026-11-25',
    state: 'All India',
    minMarks: 70,
    maxIncome: 4,
    gender: 'Any',
    description:
      'For meritorious students from rural schools entering Class 11. Small, fast, and designed to cover books, transport and exam fees.',
    benefits: ['₹12,000 per year', 'Book allowance included', 'No renewal paperwork'],
    documents: ['Class 10 marksheet', 'Rural school certificate', 'Income certificate'],
    steps: ['Apply online', 'School head verification', 'Amount credited in 30 days'],
    seats: '8,000 seats',
    renewal: 'Auto-renewed on promotion',
    tags: ['Rural schools', 'Class 11 entry'],
  },
  {
    id: 'maharashtra-merit',
    name: 'Maharashtra State Merit Scholarship',
    provider: 'Govt. of Maharashtra',
    category: 'State',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 20000,
    amountNote: '₹20,000 per year',
    deadline: '2026-11-25',
    state: 'Maharashtra',
    minMarks: 75,
    maxIncome: 8,
    gender: 'Any',
    description:
      'State merit award for students domiciled in Maharashtra with strong board results. Applied for through the state scholarship portal.',
    benefits: ['₹20,000 per year', 'State merit certificate'],
    documents: ['Domicile certificate', 'Class 10/12 marksheet', 'Income certificate', 'Aadhaar card'],
    steps: ['Apply on state portal', 'College verification', 'District approval'],
    seats: '15,000 seats',
    renewal: 'Maintain 70% marks',
    tags: ['Maharashtra domicile'],
  },
  {
    id: 'minority-merit-means',
    name: 'Minority Merit-cum-Means Grant',
    provider: 'Minority Welfare Board',
    category: 'Minority',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 30000,
    amountNote: '₹30,000 per year',
    deadline: '2026-11-30',
    state: 'All India',
    minMarks: 50,
    maxIncome: 2.5,
    gender: 'Any',
    minorityOnly: true,
    description:
      'Merit-cum-means support for students from notified minority communities pursuing professional and technical courses.',
    benefits: ['₹30,000 per year', 'Course fee reimbursement', 'Maintenance allowance'],
    documents: ['Minority community certificate', 'Income certificate', 'Admission letter', 'Fee receipt'],
    steps: ['Apply', 'Community certificate verification', 'Institute verification'],
    seats: '60,000 seats',
    renewal: 'Pass all subjects each year',
    tags: ['Minority communities', 'Professional courses'],
  },
  {
    id: 'bihar-post-matric',
    name: 'Bihar Post-Matric Support Grant',
    provider: 'Govt. of Bihar',
    category: 'State',
    levels: ['Class 11–12', 'Diploma', 'Undergraduate'],
    amount: 15000,
    amountNote: '₹15,000 per year',
    deadline: '2026-12-05',
    state: 'Bihar',
    minMarks: 50,
    maxIncome: 2.5,
    gender: 'Any',
    description:
      'Post-matric support for students from Bihar studying beyond Class 10, with priority to SC/ST and OBC applicants.',
    benefits: ['₹15,000 per year', 'Maintenance allowance', 'Exam fee cover'],
    documents: ['Domicile certificate', 'Caste certificate', 'Income certificate', 'Marksheet'],
    steps: ['Apply on state portal', 'Institute verification', 'District welfare approval'],
    seats: '50,000 seats',
    renewal: 'Annual renewal with marksheet',
    tags: ['Bihar domicile', 'Post-matric'],
  },
  {
    id: 'first-gen-learners',
    name: 'First-Generation Learners Fund',
    provider: 'Shiksha First Foundation',
    category: 'Need-based',
    levels: ['Undergraduate'],
    amount: 35000,
    amountNote: '₹35,000 per year',
    deadline: '2026-12-10',
    state: 'All India',
    minMarks: 60,
    maxIncome: 4,
    gender: 'Any',
    description:
      'For students who are the first in their family to attend college. Includes a laptop grant in the first year and a peer-mentor circle.',
    benefits: ['₹35,000 per year', 'One-time laptop grant', 'Peer mentor circle'],
    documents: ['Income certificate', 'First-generation declaration', 'Admission letter', 'Marksheet'],
    steps: ['Apply', 'Family background verification', 'Mentor matching'],
    seats: '3,000 seats',
    renewal: 'Maintain 55% marks',
    tags: ['First in family', 'Laptop grant'],
  },
  {
    id: 'vidya-stem',
    name: 'Vidya STEM Excellence Fellowship',
    provider: 'Vidya Science Trust',
    category: 'STEM',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 100000,
    amountNote: '₹1,00,000 per year',
    deadline: '2026-12-15',
    state: 'All India',
    minMarks: 80,
    maxIncome: null,
    gender: 'Any',
    description:
      'A flagship fellowship for STEM undergraduates and postgraduates with strong academics and a project or research interest. Includes a funded summer internship.',
    benefits: ['₹1,00,000 per year', 'Funded summer internship', 'Research grant up to ₹25,000'],
    documents: ['Marksheet', 'Statement of purpose', 'Project/research note', 'Recommendation letter'],
    steps: ['Apply with SOP', 'Project review', 'Panel interview'],
    seats: '500 seats',
    renewal: 'Research progress review',
    tags: ['STEM', 'Research', 'Internship'],
    featured: true,
  },
  {
    id: 'saksham-disability',
    name: 'Saksham Disability Support Scholarship',
    provider: 'National Inclusion Trust',
    category: 'Disability',
    levels: ['Class 11–12', 'Undergraduate', 'Postgraduate'],
    amount: 40000,
    amountNote: '₹40,000 per year + assistive allowance',
    deadline: '2026-12-20',
    state: 'All India',
    minMarks: 50,
    maxIncome: 6,
    gender: 'Any',
    disabilityOnly: true,
    description:
      'Support for students with disabilities, including an assistive-technology allowance for devices, software and scribes.',
    benefits: ['₹40,000 per year', '₹15,000 assistive-tech allowance', 'Scribe support for exams'],
    documents: ['Disability certificate', 'Marksheet', 'Income certificate', 'Aadhaar card'],
    steps: ['Apply', 'Disability certificate verification', 'Institute confirmation'],
    seats: '5,000 seats',
    renewal: 'Annual certificate update',
    tags: ['Assistive tech', 'Scribe support'],
  },
  {
    id: 'women-in-tech',
    name: 'Women in Tech Scholarship',
    provider: 'CodeSprint Foundation',
    category: 'Girls',
    levels: ['Undergraduate'],
    amount: 80000,
    amountNote: '₹80,000 per year',
    deadline: '2026-12-31',
    state: 'All India',
    minMarks: 70,
    maxIncome: 8,
    gender: 'Female',
    description:
      'For women pursuing computer science, engineering or design. Includes a paid internship with a partner startup and a women-in-tech community.',
    benefits: ['₹80,000 per year', 'Paid internship', 'Community & mentorship'],
    documents: ['Marksheet', 'Statement of purpose', 'Portfolio or GitHub (optional)'],
    steps: ['Apply with SOP', 'Shortlist', 'Interview + portfolio review'],
    seats: '250 seats',
    renewal: 'Maintain 65% marks',
    tags: ['Women in tech', 'Internship', 'STEM'],
  },
  {
    id: 'single-parent-support',
    name: 'Single Parent Family Support',
    provider: 'Umeed Welfare Society',
    category: 'Need-based',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 28000,
    amountNote: '₹28,000 per year',
    deadline: '2027-01-10',
    state: 'All India',
    minMarks: 55,
    maxIncome: 3,
    gender: 'Any',
    description:
      'For students raised by a single parent. A light-touch application with empathetic verification and term-wise disbursement.',
    benefits: ['₹28,000 per year', 'Term-wise disbursal', 'Counselling support'],
    documents: ['Income certificate', 'Single-parent declaration', 'Marksheet'],
    steps: ['Apply', 'Document verification', 'Approval in 3 weeks'],
    seats: '4,000 seats',
    renewal: 'Annual income check',
    tags: ['Single parent', 'Term-wise'],
  },
  {
    id: 'anusandhan-research',
    name: 'Anusandhan Research Fellowship',
    provider: 'National Research Council',
    category: 'Research',
    levels: ['Postgraduate', 'PhD'],
    amount: 200000,
    amountNote: '₹2,00,000 per year',
    deadline: '2027-01-15',
    state: 'All India',
    minMarks: 75,
    maxIncome: null,
    gender: 'Any',
    description:
      'For PG and PhD scholars with a defined research proposal. Funds research costs, conference travel and a monthly stipend top-up.',
    benefits: ['₹2,00,000 per year', 'Conference travel grant', 'Publication support'],
    documents: ['Research proposal', 'Transcripts', 'Two recommendation letters', 'Guide consent'],
    steps: ['Submit proposal', 'Peer review', 'Presentation to panel'],
    seats: '300 seats',
    renewal: 'Annual research review',
    tags: ['PhD', 'Research', 'Conference grant'],
  },
  {
    id: 'karnataka-pratibha',
    name: 'Karnataka Pratibha Puraskar',
    provider: 'Govt. of Karnataka',
    category: 'State',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 18000,
    amountNote: '₹18,000 per year',
    deadline: '2027-01-31',
    state: 'Karnataka',
    minMarks: 80,
    maxIncome: 6,
    gender: 'Any',
    description:
      'State award recognising top-performing students from Karnataka schools and colleges, with priority to government-school students.',
    benefits: ['₹18,000 per year', 'State honour certificate'],
    documents: ['Domicile certificate', 'Marksheet', 'Income certificate'],
    steps: ['Apply on state portal', 'School/college verification', 'District approval'],
    seats: '12,000 seats',
    renewal: 'Maintain 75% marks',
    tags: ['Karnataka domicile', 'Govt schools'],
  },
  {
    id: 'arts-design-creators',
    name: 'Arts & Design Creators Grant',
    provider: 'Kala Collective',
    category: 'Merit',
    levels: ['Undergraduate'],
    amount: 40000,
    amountNote: '₹40,000 per year',
    deadline: '2027-02-05',
    state: 'All India',
    minMarks: 60,
    maxIncome: null,
    gender: 'Any',
    description:
      'For students in fine arts, design, music and performing arts. Judged on portfolio, not marks alone — your work is the application.',
    benefits: ['₹40,000 per year', 'Annual showcase', 'Studio mentorship'],
    documents: ['Portfolio (10 works)', 'Marksheet', 'Bonafide certificate'],
    steps: ['Submit portfolio', 'Jury review', 'Showcase shortlist'],
    seats: '400 seats',
    renewal: 'Portfolio review each year',
    tags: ['Arts', 'Portfolio-based'],
  },
  {
    id: 'ews-higher-ed',
    name: 'EWS Higher Education Grant',
    provider: 'National Education Foundation',
    category: 'Need-based',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 45000,
    amountNote: '₹45,000 per year',
    deadline: '2027-02-15',
    state: 'All India',
    minMarks: 55,
    maxIncome: 8,
    gender: 'Any',
    description:
      'For students from Economically Weaker Section households pursuing higher education. EWS certificate is the key document — everything else is light.',
    benefits: ['₹45,000 per year', 'Fee reimbursement', 'Book allowance'],
    documents: ['EWS certificate', 'Income certificate', 'Admission letter', 'Marksheet'],
    steps: ['Apply', 'EWS verification', 'Institute verification'],
    seats: '20,000 seats',
    renewal: 'Annual EWS certificate',
    tags: ['EWS', 'Fee reimbursement'],
  },
  {
    id: 'future-teachers',
    name: 'Future Teachers Scholarship',
    provider: 'Shikshak Sangam',
    category: 'Merit',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 30000,
    amountNote: '₹30,000 per year',
    deadline: '2027-02-28',
    state: 'All India',
    minMarks: 65,
    maxIncome: 6,
    gender: 'Any',
    description:
      'For B.Ed and teaching aspirants committed to teaching in government schools for at least two years after qualifying.',
    benefits: ['₹30,000 per year', 'Teaching practicum support', 'Placement assistance'],
    documents: ['Marksheet', 'B.Ed admission letter', 'Service commitment letter'],
    steps: ['Apply', 'Commitment verification', 'College confirmation'],
    seats: '2,500 seats',
    renewal: 'Teaching practice completion',
    tags: ['B.Ed', 'Teaching'],
  },
  {
    id: 'green-energy-innovators',
    name: 'Green Energy Innovators Grant',
    provider: 'Sustain India Trust',
    category: 'STEM',
    levels: ['Undergraduate', 'Postgraduate'],
    amount: 120000,
    amountNote: '₹1,20,000 per year',
    deadline: '2027-03-10',
    state: 'All India',
    minMarks: 75,
    maxIncome: null,
    gender: 'Any',
    description:
      'For students building solutions in renewable energy, climate tech or sustainability. Includes seed funding for the best prototype each year.',
    benefits: ['₹1,20,000 per year', 'Prototype seed fund', 'Industry mentorship'],
    documents: ['Marksheet', 'Project proposal', 'Prototype photos/video (optional)'],
    steps: ['Submit proposal', 'Technical review', 'Demo day'],
    seats: '150 seats',
    renewal: 'Prototype milestone review',
    tags: ['Climate tech', 'Prototype fund'],
  },
  {
    id: 'defence-wards',
    name: 'National Defence Wards Scholarship',
    provider: 'Veer Parivar Trust',
    category: 'Merit',
    levels: ['Class 11–12', 'Undergraduate'],
    amount: 55000,
    amountNote: '₹55,000 per year',
    deadline: '2027-03-31',
    state: 'All India',
    minMarks: 60,
    maxIncome: null,
    gender: 'Any',
    description:
      'For wards of serving and retired defence personnel. Priority to families of personnel who were disabled or lost their lives in service.',
    benefits: ['₹55,000 per year', 'Priority hostel allotment', 'Career guidance'],
    documents: ['Service certificate of parent', 'Marksheet', 'Bonafide certificate'],
    steps: ['Apply', 'Service record verification', 'Approval'],
    seats: '6,000 seats',
    renewal: 'Maintain 55% marks',
    tags: ['Defence wards'],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function daysUntil(deadline: string, from: Date = new Date()): number {
  const d = new Date(deadline + 'T23:59:59');
  const diff = d.getTime() - from.getTime();
  return Math.ceil(diff / 86_400_000);
}

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function formatDeadline(deadline: string): string {
  const d = new Date(deadline + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ---------------------------------------------------------------------------
// Profile + matching
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  level: Level;
  stream: string;
  marks: number; // % in last exam
  income: number; // family income, ₹ LPA
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  gender: 'Female' | 'Male' | 'Other';
  state: string;
  disability: boolean;
  sports: boolean;
  minority: boolean;
}

export const DEFAULT_PROFILE: Profile = {
  name: 'Aarav Sharma',
  level: 'Undergraduate',
  stream: 'B.Tech Computer Science',
  marks: 82,
  income: 4.5,
  category: 'General',
  gender: 'Male',
  state: 'Maharashtra',
  disability: false,
  sports: false,
  minority: false,
};

export interface CriterionResult {
  label: string;
  status: 'met' | 'missed' | 'info';
  detail: string;
}

export function evaluate(s: Scholarship, p: Profile): { score: number; criteria: CriterionResult[] } {
  const criteria: CriterionResult[] = [];

  const levelOk = s.levels.includes(p.level);
  criteria.push({
    label: 'Education level',
    status: levelOk ? 'met' : 'missed',
    detail: levelOk ? `Open to ${p.level} students` : `Needs ${s.levels.join(' / ')}`,
  });

  if (s.minMarks !== null) {
    const ok = p.marks >= s.minMarks;
    criteria.push({
      label: 'Minimum marks',
      status: ok ? 'met' : 'missed',
      detail: ok ? `${p.marks}% — you clear the ${s.minMarks}% bar` : `Needs ${s.minMarks}% — you have ${p.marks}%`,
    });
  }

  if (s.maxIncome !== null) {
    const ok = p.income <= s.maxIncome;
    criteria.push({
      label: 'Family income',
      status: ok ? 'met' : 'missed',
      detail: ok
        ? `₹${p.income} LPA — within the ₹${s.maxIncome} LPA cap`
        : `Cap is ₹${s.maxIncome} LPA — yours is ₹${p.income} LPA`,
    });
  }

  if (s.gender === 'Female') {
    const ok = p.gender === 'Female';
    criteria.push({
      label: 'For women students',
      status: ok ? 'met' : 'missed',
      detail: ok ? 'You are eligible' : 'This grant is for women students',
    });
  }

  if (s.state !== 'All India') {
    const ok = p.state === s.state;
    criteria.push({
      label: 'State domicile',
      status: ok ? 'met' : 'missed',
      detail: ok ? `You are domiciled in ${s.state}` : `Needs ${s.state} domicile`,
    });
  }

  if (s.minorityOnly) {
    criteria.push({
      label: 'Minority community',
      status: p.minority ? 'met' : 'missed',
      detail: p.minority ? 'Community certificate applies' : 'For notified minority communities',
    });
  }

  if (s.disabilityOnly) {
    criteria.push({
      label: 'Disability certificate',
      status: p.disability ? 'met' : 'missed',
      detail: p.disability ? 'Certificate applies' : 'Needs a disability certificate',
    });
  }

  if (s.sportsOnly) {
    criteria.push({
      label: 'Sports record',
      status: p.sports ? 'met' : 'missed',
      detail: p.sports ? 'Your sports record counts' : 'Needs a recognised sports record',
    });
  }

  criteria.push({
    label: 'Deadline',
    status: daysUntil(s.deadline) >= 0 ? 'info' : 'missed',
    detail: daysUntil(s.deadline) >= 0 ? `Closes ${formatDeadline(s.deadline)}` : 'Deadline has passed',
  });

  const decisive = criteria.filter((c) => c.status !== 'info');
  const met = decisive.filter((c) => c.status === 'met').length;
  const score = decisive.length === 0 ? 100 : Math.round((met / decisive.length) * 100);
  return { score, criteria };
}

export function matchLabel(score: number): string {
  if (score >= 90) return 'Excellent match';
  if (score >= 70) return 'Strong match';
  if (score >= 50) return 'Partial match';
  return 'Low match';
}
