import { Bell, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";

export default function Settings(){
 const {notify}=useApp(); const [alerts,setAlerts]=useState(true); const [publicView,setPublicView]=useState(true);
 return <AppShell><PageHeader eyebrow="Patient Portal" title="Settings" subtitle="Manage notifications, security and emergency access preferences."/><div className="max-w-3xl space-y-4"><Setting icon={Bell} title="Emergency access notifications" desc="Notify you when your profile is accessed." value={alerts} setValue={setAlerts}/><Setting icon={ShieldCheck} title="Limited public emergency view" desc="Allow your secure Emergency ID to reveal critical emergency information." value={publicView} setValue={setPublicView}/><Card className="p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-slate-600"><Lock size={18}/></span><div className="flex-1"><h2 className="text-sm font-extrabold">Security</h2><p className="mt-1 text-xs leading-5 text-slate-500">Your QR contains only an emergency identifier. Medical data stays outside the QR payload.</p><Button variant="secondary" className="mt-4" onClick={()=>notify("Security preferences are already protected.")}>Review security</Button></div></div></Card></div></AppShell>;
}
function Setting({icon:Icon,title,desc,value,setValue}){return <Card className="p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={18}/></span><div className="flex-1"><h2 className="text-sm font-extrabold">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p></div><button type="button" role="switch" aria-checked={value} onClick={()=>setValue(!value)} className={`relative h-7 w-12 shrink-0 rounded-full transition ${value?"bg-blue-600":"bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${value?"left-6":"left-1"}`}/></button></div></Card>}
