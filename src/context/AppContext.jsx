import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { patientSeed, childSeed, accessLogSeed } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [patient, setPatient] = useState(() => {
    const saved = localStorage.getItem("code-blue-patient");
    return saved ? JSON.parse(saved) : patientSeed;
  });
  const [child, setChild] = useState(childSeed);
  const [accessLogs, setAccessLogs] = useState(accessLogSeed);
  const [toast, setToast] = useState(null);
  const [patientAuthed, setPatientAuthed] = useState(false);
  const [hospitalAuthed, setHospitalAuthed] = useState(false);
  const [guardianDecision, setGuardianDecision] = useState(null);

  useEffect(() => {
    localStorage.setItem("code-blue-patient", JSON.stringify(patient));
  }, [patient]);

  function notify(message, type = "success") {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2800);
  }

  function savePatient(next) {
    setPatient(next);
    notify("Medical profile updated.");
  }

  function logAccess(extra = {}) {
    const event = {
      name: extra.hospital || "City Hospital",
      action: "Viewed your profile",
      date: "Just now",
      reason: extra.reason || "Emergency",
    };
    setAccessLogs((logs) => [event, ...logs]);
    notify("Emergency access logged.");
  }

  const value = useMemo(() => ({
    patient, setPatient, savePatient,
    child, setChild,
    accessLogs, logAccess,
    patientAuthed, setPatientAuthed,
    hospitalAuthed, setHospitalAuthed,
    guardianDecision, setGuardianDecision,
    toast, notify,
  }), [patient, child, accessLogs, patientAuthed, hospitalAuthed, guardianDecision, toast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
