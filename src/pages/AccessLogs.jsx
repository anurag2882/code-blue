import { Building2, Clock3, Stethoscope } from "lucide-react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";

export default function AccessLogs(){
  const {accessLogs}=useApp();
  return <AppShell><PageHeader eyebrow="Patient Portal" title="Access Logs" subtitle="Track who viewed your medical profile."/><Card className="p-5 sm:p-7"><div className="relative space-y-6 sm:space-y-8">{accessLogs.map((x,i)=><div key={`${x.name}-${x.date}-${i}`} className="relative flex gap-4 sm:gap-5">{i<accessLogs.length-1&&<span className="absolute left-5 top-10 h-[calc(100%+1rem)] w-px bg-slate-200 sm:left-6"/>}<span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm"><Building2 size={17}/></span><div className="min-w-0 flex-1 rounded-2xl bg-slate-50 p-4"><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-extrabold">{x.name}</p><span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400"><Clock3 size={13}/>{x.date}</span></div><p className="mt-1 text-xs text-slate-500">{x.action} • {x.reason}</p>{i===0&&<span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">Latest access</span>}</div></div>)}</div></Card></AppShell>;
}
