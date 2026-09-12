import { useEffect, useState } from "react";
import { ArrowRight, Camera, Search, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Logo from "../components/Logo";
import Card from "../components/Card";
import Button from "../components/Button";
import EmergencyCard from "../components/EmergencyCard";
import { useApp } from "../context/AppContext";

export function EmergencyAccess() {
  const [id,setId]=useState("");
  const navigate=useNavigate();
  function submit(e){e.preventDefault(); if(id.trim()) navigate(`/emergency/${encodeURIComponent(id.trim())}`);}
  return <div className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"><Logo compact/><Link to="/" className="text-sm font-bold text-slate-500">Home</Link></div></header>
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600"><ShieldCheck size={23}/></span><h1 className="mt-5 text-3xl font-black tracking-tight">Emergency Health ID</h1><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">No account required. Scan a CODE BLUE QR or enter the Emergency ID to view limited critical information.</p></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card className="p-6 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Camera size={22}/></span><h2 className="mt-4 font-extrabold">Scan QR</h2><div className="mx-auto mt-4 grid h-28 w-28 place-items-center rounded-xl border border-dashed border-blue-200 bg-blue-50/50 text-xs font-bold text-blue-600">Camera preview</div><p className="mt-3 text-xs text-slate-400">Prototype scanner</p></Card>
        <Card className="p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-700"><Search size={21}/></span><h2 className="mt-4 font-extrabold">Enter Emergency ID</h2><form onSubmit={submit} className="mt-4 space-y-3"><input value={id} onChange={e=>setId(e.target.value)} placeholder="EHID-20260831-0042" className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-sm font-bold outline-none focus:border-blue-400"/><Button className="w-full">View Emergency Profile <ArrowRight size={16}/></Button></form></Card>
      </div>
      <p className="mt-6 text-center text-xs text-slate-400">Public view is intentionally limited to emergency-critical information.</p>
    </main>
  </div>;
}

export function EmergencyProfile() {
  const { emergencyId } = useParams();
  const { patient, notify } = useApp();
  const [status,setStatus]=useState("identifying");
  useEffect(()=>{ const a=setTimeout(()=>setStatus("found"),700); return()=>clearTimeout(a)},[]);
  const valid = decodeURIComponent(emergencyId||"") === patient.emergencyId;
  if (!valid) return <div className="min-h-screen grid place-items-center bg-slate-50 p-4"><Card className="max-w-md p-7 text-center"><h1 className="text-xl font-black">Emergency ID not found.</h1><p className="mt-2 text-sm text-slate-500">Check the QR or Emergency ID and try again.</p><Link to="/emergency" className="mt-5 inline-block text-sm font-extrabold text-blue-600">Back to emergency access</Link></Card></div>;
  if(status==="identifying") return <div className="min-h-screen grid place-items-center bg-slate-50 p-4"><div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"/><p className="mt-4 font-extrabold">Identifying patient...</p><p className="mt-1 text-sm text-slate-500">Please wait</p></div></div>;
  return <div className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4"><Logo compact/><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold text-emerald-700"><ShieldCheck size={14}/> Patient found</span></div></header>
    <main className="mx-auto max-w-2xl px-4 py-6 pb-28 sm:py-10">
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><EmergencyCard patient={patient} onCall={()=>{notify("Calling Rohan Mishra…"); window.location.href=`tel:${patient.contacts[0].phone}`}}/></motion.div>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs leading-5 text-blue-800"><strong>Limited view:</strong> This public emergency profile intentionally excludes full history, reports and private documents.</div>
      <p className="mt-5 text-center text-[11px] text-slate-400">Emergency ID: {patient.emergencyId}</p>
    </main>
    <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0"><div className="mx-auto max-w-2xl"><Button variant="success" className="w-full sm:hidden" onClick={()=>window.location.href=`tel:${patient.contacts[0].phone}`}>Call Emergency Contact</Button></div></div>
  </div>;
}
