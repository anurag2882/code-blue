import { Phone, ShieldAlert, UserRound } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

export default function EmergencyCard({ patient, onCall }) {
  return (
    <Card className="overflow-hidden border-slate-200">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-lg font-extrabold text-blue-700">HM</div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">{patient.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Age {patient.age} • {patient.emergencyId}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Blood Group</p>
          <p className="mt-2 text-4xl font-black tracking-tight text-slate-950">{patient.bloodGroup}</p>
          <p className="mt-2 text-xs font-bold text-emerald-700">✓ Hospital Verified</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-2 text-red-700"><ShieldAlert size={18}/><p className="text-[11px] font-extrabold uppercase tracking-wider">Drug Allergy</p></div>
          <p className="mt-2 text-xl font-black text-red-900">{patient.allergies.join(", ")}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 sm:col-span-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Emergency Contact</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-600"><UserRound size={18}/></span>
              <div><p className="font-extrabold">{patient.contacts[0].name}</p><p className="text-xs text-slate-500">{patient.contacts[0].relation} • {patient.contacts[0].phone}</p></div>
            </div>
            <Button variant="success" onClick={onCall} className="w-full sm:w-auto"><Phone size={17}/> Call Emergency Contact</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
