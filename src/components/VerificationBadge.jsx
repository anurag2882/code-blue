import { CheckCircle2, ShieldCheck, CircleAlert } from "lucide-react";

const styles = {
  "Hospital Verified": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Document Verified": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Self Reported": "bg-slate-100 text-slate-600 border-slate-200",
  "Needs Verification": "bg-amber-50 text-amber-700 border-amber-100",
};

export default function VerificationBadge({ status="Self Reported" }) {
  const Icon = status.includes("Verified") ? ShieldCheck : status.includes("Needs") ? CircleAlert : CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${styles[status] || styles["Self Reported"]}`}>
      <Icon size={13} /> {status}
    </span>
  );
}
