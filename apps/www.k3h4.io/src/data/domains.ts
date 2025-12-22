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

export const bankingTransactions = [
  { id: 'TRX-9181', account: 'Operating', amount: '+$42,000', type: 'ACH credit', status: 'Settled' },
  { id: 'TRX-9182', account: 'Payroll', amount: '-$18,400', type: 'Batch debit', status: 'Processing' },
  { id: 'TRX-9183', account: 'Savings', amount: '-$6,000', type: 'Wire out', status: 'Released' },
]

export const bankingPayments = [
  { id: 'PAY-441', counterparty: 'Greenline Logistics', amount: '$12,200', method: 'Same-day ACH', status: 'Ready' },
  { id: 'PAY-442', counterparty: 'Northwind Staffing', amount: '$6,480', method: 'Wire', status: 'Queued' },
  { id: 'PAY-443', counterparty: 'Fleet Leasing', amount: '$18,900', method: 'ACH', status: 'Approved' },
]

export const bankingBeneficiaries = [
  { name: 'Greenline Logistics', type: 'Vendor', risk: 'Low', lastPaid: 'Today' },
  { name: 'Northwind Staffing', type: 'Vendor', risk: 'Medium', lastPaid: 'This week' },
  { name: 'Halek Holdings', type: 'Internal', risk: 'Low', lastPaid: 'Yesterday' },
]

export const bankingCompliance = [
  { title: 'KYB verification', status: 'Complete', owner: 'Compliance Bot' },
  { title: 'SOC 2 attest', status: 'In review', owner: 'Kyle Halek' },
  { title: 'OFAC screening', status: 'Passing', owner: 'Automated' },
]

export const logisticsLoads = [
  { id: 'LD-1042', route: 'MSP → DEN', status: 'In transit', eta: '4h', carrier: 'Northline' },
  { id: 'LD-1043', route: 'CHI → MSP', status: 'Awaiting pickup', eta: '8h', carrier: 'FreightCo' },
  { id: 'LD-1044', route: 'SEA → RST', status: 'Delivered', eta: 'Delivered', carrier: 'Cascade' },
]

export const logisticsExceptions = [
  { id: 'EX-201', type: 'Delay', load: 'LD-1043', action: 'Rebook carrier', severity: 'High' },
  { id: 'EX-202', type: 'Temp control', load: 'LD-1042', action: 'Verify sensors', severity: 'Medium' },
]

export const logisticsPlaybooks = [
  { title: 'Cold chain delay', steps: 'Escalate temp alarms, re-ice, notify consignee' },
  { title: 'Carrier no-show', steps: 'Auto-requote, notify shipper, rebook SLA carrier' },
  { title: 'Border crossing', steps: 'Upload documents, pre-clear customs, set geofence' },
]

export const logisticsLanes = [
  { name: 'MSP → DEN', service: '2-day', cost: '$1,240', score: 'A-' },
  { name: 'SEA → RST', service: '3-day', cost: '$1,780', score: 'B+' },
  { name: 'CHI → MSP', service: '1-day', cost: '$640', score: 'A' },
]

export const staffingRoles = [
  { title: 'Frontend Engineer', status: 'Open', location: 'Remote', applicants: 18 },
  { title: 'Logistics Coordinator', status: 'Interviewing', location: 'Hastings, MN', applicants: 9 },
  { title: 'Product Designer', status: 'Sourcing', location: 'Remote', applicants: 12 },
]

export const staffingCandidates = [
  { name: 'Anita Gomez', role: 'Frontend Engineer', stage: 'Interview', score: '8.7' },
  { name: 'Marcus Reed', role: 'Logistics Coordinator', stage: 'Screen', score: '7.9' },
  { name: 'Priya Nair', role: 'Product Designer', stage: 'Portfolio', score: '8.3' },
]

export const staffingInterviews = [
  { time: '09:00', candidate: 'Anita Gomez', type: 'Panel', interviewer: 'Kyle Halek' },
  { time: '11:30', candidate: 'Marcus Reed', type: 'Hiring Manager', interviewer: 'Ops Lead' },
  { time: '15:00', candidate: 'Priya Nair', type: 'Portfolio', interviewer: 'Design Lead' },
]

export const staffingOffers = [
  { candidate: 'Anita Gomez', role: 'Frontend Engineer', comp: '$145k + equity', status: 'Drafting' },
  { candidate: 'Marcus Reed', role: 'Logistics Coordinator', comp: '$78k + bonus', status: 'Review' },
]

export const adCampaigns = [
  { name: 'Winter Freight Awareness', status: 'Live', spend: '$12.4k', cpm: '$8.10' },
  { name: 'Driver Hiring Push', status: 'Paused', spend: '$4.1k', cpm: '$6.90' },
  { name: 'Regional Expansion', status: 'Planning', spend: '$0', cpm: '—' },
]

export const adPlacements = [
  { id: 'POS-77', location: 'MSP Terminal', status: 'Installed', proof: 'Uploaded' },
  { id: 'POS-78', location: 'I-94 Corridor', status: 'Scheduled', proof: 'Pending' },
  { id: 'POS-79', location: 'Downtown Hastings', status: 'Mock', proof: 'N/A' },
]

export const adProofQueue = [
  { id: 'PRF-330', placement: 'POS-78', owner: 'Ad Ops', due: 'Today' },
  { id: 'PRF-331', placement: 'POS-79', owner: 'Design', due: 'Tomorrow' },
]

export const adFlights = [
  { window: 'Jan 2 → Jan 16', campaign: 'Winter Freight Awareness', status: 'Locked' },
  { window: 'Jan 20 → Feb 5', campaign: 'Driver Hiring Push', status: 'Draft' },
]

export const inboxItems = [
  { from: 'Compliance Bot', subject: 'KYC refresh due for Payroll', time: '2h ago' },
  { from: 'Carrier Ops', subject: 'Load LD-1043 awaiting pickup', time: '4h ago' },
  { from: 'Staffing Lead', subject: 'Interview loop scheduling', time: 'Yesterday' },
  { from: 'Ad Ops', subject: 'Proof needed for POS-78', time: 'Yesterday' },
]
