export const CURRENT_USER = {
  id: "u1",
  username: "user1",
  name: "User1",
  role: "Senior Operations Manager",
  department: "Operations",
  avatar: "MH",
};

export const MOCK_TELEGRAMS = [
  {
    id: "t001", refNo: "TEL-2026-0312-001",
    from: { name: "James Korfield", dept: "Finance", id: "u2" },
    to: [{ name: "Margaret Holloway", dept: "Operations", id: "u1" }],
    subject: "Q1 Budget Reallocation – Urgent Approval Required",
    body: "Further to our meeting on Tuesday, please review the attached reallocation proposal for Q1. Finance requires your sign-off no later than end of business Friday. The figures have been revised to reflect the updated projections.",
    priority: "URGENT", status: "UNREAD", classification: "CONFIDENTIAL",
    date: "2026-03-12T09:14:00", folder: "inbox",
  },
  {
    id: "t002", refNo: "TEL-2026-0311-007",
    from: { name: "Priya Subramaniam", dept: "HR", id: "u3" },
    to: [{ name: "Margaret Holloway", dept: "Operations", id: "u1" }],
    subject: "Updated Leave Policy – Effective April 1st",
    body: "Please be advised that the revised staff leave policy will come into effect on the 1st of April. All department heads are requested to brief their teams accordingly before the end of March.",
    priority: "NORMAL", status: "READ", classification: "INTERNAL",
    date: "2026-03-11T14:30:00", folder: "inbox",
  },
  {
    id: "t003", refNo: "TEL-2026-0310-003",
    from: { name: "Margaret Holloway", dept: "Operations", id: "u1" },
    to: [{ name: "Thomas Wren", dept: "Logistics", id: "u4" }],
    subject: "Warehouse Inspection – Schedule Confirmation",
    body: "This is to confirm the warehouse inspection has been scheduled for 15 March at 10:00. Please ensure all documentation is prepared in advance and the relevant staff are notified.",
    priority: "NORMAL", status: "DELIVERED", classification: "INTERNAL",
    date: "2026-03-10T11:00:00", folder: "sent",
  },
  {
    id: "t004", refNo: "TEL-2026-0309-012",
    from: { name: "Margaret Holloway", dept: "Operations", id: "u1" },
    to: [{ name: "Board of Directors", dept: "Executive", id: "u5" }],
    subject: "Annual Operations Review – Draft Presentation",
    body: "Please find attached the draft presentation for the Annual Operations Review. Feedback is requested before the 20th of March so revisions can be incorporated ahead of the final submission.",
    priority: "ROUTINE", status: "DELIVERED", classification: "CONFIDENTIAL",
    date: "2026-03-09T16:45:00", folder: "sent",
  },
  {
    id: "t005", refNo: "DRAFT-2026-0312-002",
    from: { name: "Margaret Holloway", dept: "Operations", id: "u1" },
    to: [{ name: "Priya Subramaniam", dept: "HR", id: "u3" }],
    subject: "Staff Restructuring Proposal",
    body: "Following our recent discussions, I have begun drafting a proposal for the restructuring of the operations team. This document outlines the proposed changes and their projected impact on departmental efficiency.",
    priority: "URGENT", status: "DRAFT", classification: "CONFIDENTIAL",
    date: "2026-03-12T08:00:00", folder: "drafts",
  },
  {
    id: "t006", refNo: "TEL-2026-0308-009",
    from: { name: "Thomas Wren", dept: "Logistics", id: "u4" },
    to: [{ name: "Margaret Holloway", dept: "Operations", id: "u1" }],
    subject: "Fleet Maintenance Report – February",
    body: "Attached is the February fleet maintenance report. Two vehicles require immediate attention. Awaiting your authorisation to proceed with the repair work as outlined in section 3 of the report.",
    priority: "URGENT", status: "UNREAD", classification: "INTERNAL",
    date: "2026-03-08T09:00:00", folder: "inbox",
  },
  {
    id: "t007", refNo: "TEL-2026-0307-005",
    from: { name: "Margaret Holloway", dept: "Operations", id: "u1" },
    to: [{ name: "James Korfield", dept: "Finance", id: "u2" }],
    subject: "March Operational Expenditure Forecast",
    body: "Please find enclosed the operational expenditure forecast for March. Let me know if any line items require clarification before the finance committee meeting on Friday.",
    priority: "NORMAL", status: "DELIVERED", classification: "INTERNAL",
    date: "2026-03-07T13:20:00", folder: "sent",
  },
  {
    id: "t008", refNo: "TEL-2026-0305-011",
    from: { name: "Elena Vasquez", dept: "Legal", id: "u6" },
    to: [{ name: "Margaret Holloway", dept: "Operations", id: "u1" }],
    subject: "Contract Renewal – Third Party Vendors",
    body: "Legal has completed its review of the third-party vendor contracts due for renewal in April. Your acknowledgement is required before we proceed to the next stage of negotiations.",
    priority: "NORMAL", status: "READ", classification: "CONFIDENTIAL",
    date: "2026-03-05T10:15:00", folder: "archived",
  },
  {
    id: "t009", refNo: "DRAFT-2026-0311-001",
    from: { name: "Margaret Holloway", dept: "Operations", id: "u1" },
    to: [],
    subject: "Q2 Operations Planning – Initial Thoughts",
    body: "This draft outlines preliminary considerations for Q2 operations planning. Key focus areas include supply chain optimisation, headcount review, and the rollout of the new inventory system.",
    priority: "ROUTINE", status: "DRAFT", classification: "INTERNAL",
    date: "2026-03-11T10:00:00", folder: "drafts",
  },
  {
    id: "t010", refNo: "TEL-2026-0301-004",
    from: { name: "James Korfield", dept: "Finance", id: "u2" },
    to: [{ name: "Margaret Holloway", dept: "Operations", id: "u1" }],
    subject: "Year-End Financial Summary – Operations Division",
    body: "Please find attached the year-end financial summary for the Operations Division. The figures reflect a 4% underspend against budget, which will be discussed at the upcoming board meeting.",
    priority: "NORMAL", status: "READ", classification: "CONFIDENTIAL",
    date: "2026-03-01T08:45:00", folder: "archived",
  },
];

export const PRIORITY_CONFIG = {
  URGENT:  { label: "Urgent",  color: "#c0392b", bg: "#fdecea" },
  NORMAL:  { label: "Normal",  color: "#1a5c8a", bg: "#e8f4fd" },
  ROUTINE: { label: "Routine", color: "#5a6472", bg: "#f0f2f4" },
};

export const STATUS_CONFIG = {
  UNREAD:    { label: "Unread",    dot: "#c0392b" },
  READ:      { label: "Read",      dot: "#8a94a0" },
  DELIVERED: { label: "Delivered", dot: "#27ae60" },
  DRAFT:     { label: "Draft",     dot: "#8a6fbf" },
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};