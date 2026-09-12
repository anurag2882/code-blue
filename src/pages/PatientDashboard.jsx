import { Download, Edit3, FileHeart, History, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import QRCodeCard from "../components/QRCodeCard";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";

export default function PatientDashboard() {
  const { patient } = useApp();
  const actions = [
    [Edit3, "Edit Medical Profile", "Keep your critical information current.", "/patient/medical-profile"],
    [Download, "Emergency Card", "Create a clean wallet-sized emergency card.", "/emergency-card"],
    [History, "View Access Logs", "See who accessed your profile.", "/patient/access-logs"],
  ];
  return <AppShell>
    <PageHeader eyebrow="Patient Portal" title={`Good to see you, ${patient.name.split(" ")[0]}.`} subtitle="Your Emergency Health ID is ready whenever you need it." />
    <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <Card className="p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-blue-50 text-xl font-black text-blue-700">HM</div>
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-slate-400">Emergency profile</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{patient.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Age {patient.age} • Emergency ID <span className="font-bold text-slate-700">{patient.emergencyId}</span></p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold">Blood {patient.bloodGroup}</span>
              <span className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{patient.allergies.length} allergies</span>
              <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{patient.conditions.length} conditions</span>
            </div>
          </div>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Info label="Blood Group" value={patient.bloodGroup} />
          <Info label="Allergies" value={patient.allergies.join(", ")} danger />
          <Info label="Emergency Contact" value={patient.contacts[0].name} />
        </div>
      </Card>
      <QRCodeCard emergencyId={patient.emergencyId} />
    </div>

    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {actions.map(([Icon,title,desc,to]) => <Link key={title} to={to}><Card hover className="h-full p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-slate-700"><Icon size={19}/></span><h3 className="mt-4 text-sm font-extrabold">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-500">{desc}</p></Card></Link>)}
    </div>

    <Card className="mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><UserRound size={18}/></span><div><p className="text-sm font-extrabold">Your public emergency view is limited</p><p className="text-xs text-slate-500">Bystanders see only critical information.</p></div></div>
      <Link to={`/emergency/${patient.emergencyId}`}><Button variant="secondary">Preview emergency view</Button></Link>
    </Card>
  </AppShell>;
}
function Info({label,value,danger}) { return <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{label}</p><p className={`mt-1.5 text-sm font-extrabold ${danger?"text-red-700":"text-slate-900"}`}>{value}</p></div> }
