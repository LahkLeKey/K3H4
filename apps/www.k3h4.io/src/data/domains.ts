export type Domain = {
  path: string
  name: string
  headline: string
  description: string
}

export const domains: Domain[] = [
  {
    path: '/banking',
    name: 'Banking SaaS',
    headline: 'Secure, compliant, fast.',
    description: 'Onboarding, KYC, and reporting pipelines built for availability and trust.',
  },
  {
    path: '/logistics',
    name: 'Logistics Ops',
    headline: 'Shipping and load intelligence.',
    description: 'Dispatch, routing, and carrier visibility with real-time status.',
  },
  {
    path: '/staffing',
    name: 'Staffing Agency',
    headline: 'Placements that move fast.',
    description: 'Applicant funnels, assignment tracking, and timekeeping that scale.',
  },
  {
    path: '/ads',
    name: 'Out-of-House Ads',
    headline: 'Logistics-driven advertising.',
    description: 'Asset planning, inventory, and proof-of-placement aligned to ops data.',
  },
]

export const bankingAccounts = [
  { name: 'Operating', status: 'Active', balance: '$218,430', kyc: 'Verified' },
  { name: 'Savings', status: 'Active', balance: '$482,190', kyc: 'Verified' },
  { name: 'Payroll', status: 'Limited', balance: '$64,010', kyc: 'Pending refresh' },
]

export const logisticsLoads = [
  { id: 'LD-1042', route: 'MSP → DEN', status: 'In transit' },
  { id: 'LD-1043', route: 'CHI → MSP', status: 'Awaiting pickup' },
  { id: 'LD-1044', route: 'SEA → RST', status: 'Delivered' },
]

export const staffingRoles = [
  { title: 'Frontend Engineer', status: 'Open', location: 'Remote' },
  { title: 'Logistics Coordinator', status: 'Interviewing', location: 'Hastings, MN' },
  { title: 'Product Designer', status: 'Sourcing', location: 'Remote' },
]

export const adCampaigns = [
  { name: 'Winter Freight Awareness', status: 'Live', spend: '$12.4k' },
  { name: 'Driver Hiring Push', status: 'Paused', spend: '$4.1k' },
  { name: 'Regional Expansion', status: 'Planning', spend: '$0' },
]

export const inboxItems = [
  { from: 'Compliance Bot', subject: 'KYC refresh due for Payroll', time: '2h ago' },
  { from: 'Carrier Ops', subject: 'Load LD-1043 awaiting pickup', time: '4h ago' },
  { from: 'Staffing Lead', subject: 'Interview loop scheduling', time: 'Yesterday' },
]
