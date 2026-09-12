export const patientSeed = {
  id: "patient-1",
  name: "Anurag Mishra",
  age: 20,
  emergencyId: "EHID-20260831-0042",
  bloodGroup: "O+",
  bloodVerification: "Hospital Verified",
  bloodLastVerified: "12 Aug 2026",
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Diabetes", "Hypertension"],
  medications: ["Metformin 500mg", "Lisinopril 10mg"],
  notes: "Carry emergency medication when travelling.",
  contacts: [
    { name: "Rohan Mishra", relation: "Brother", phone: "+91 98765 43210" },
    { name: "Swati Sharma", relation: "Friend", phone: "+91 98765 43210" }
  ],
  reports: ["Annual health report.pdf"],
};

export const childSeed = {
  id: "child-1",
  name: "XYZ",
  age: 12,
  emergencyId: "EHID-20260831-0099",
  bloodGroup: "O+",
  allergies: ["Penicillin"],
  conditions: ["Asthma"],
  medications: ["Salbutamol inhaler"],
  contacts: [{ name: "Guardian", relation: "Parent", phone: "+91 98765 43210" }],
};

export const accessLogSeed = [
  { name: "City Hospital", action: "Viewed your profile", date: "Aug 15, 2026, 3:42 PM", reason: "Emergency" },
  { name: "Sunrise Clinic", action: "Viewed your profile", date: "Aug 12, 2026, 11:15 AM", reason: "Emergency" },
  { name: "Dr. Sharma (Private Clinic)", action: "Viewed your profile", date: "Aug 10, 2026, 9:20 AM", reason: "Consultation" },
  { name: "City Hospital", action: "Viewed your profile", date: "Aug 05, 2026, 2:17 PM", reason: "Emergency" },
  { name: "ABC Diagnostics", action: "Viewed your profile", date: "Jul 20, 2026, 12:03 PM", reason: "Diagnostics" },
];
