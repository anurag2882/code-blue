import { useState } from "react";
import { Check, FileUp, Plus, Trash2 } from "lucide-react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import VerificationBadge from "../components/VerificationBadge";
import { useApp } from "../context/AppContext";

export default function MedicalProfile() {
  const { patient, savePatient } = useApp();
  const [form,setForm]=useState(patient);
  const [newAllergy,setNewAllergy]=useState("");
  const [newMed,setNewMed]=useState("");
  const [newContact,setNewContact]=useState({name:"",relation:"",phone:""});
  const [saved,setSaved]=useState(false);

  function update(key,val){setForm({...form,[key]:val});setSaved(false)}
  function add(listKey,value,setter){if(!value.trim())return;update(listKey,[...form[listKey],value.trim()]);setter("");}
  function addContact(){if(!newContact.name.trim()||!newContact.phone.trim())return;update("contacts",[...form.contacts,newContact]);setNewContact({name:"",relation:"",phone:""});}
  function remove(key,index){update(key,form[key].filter((_,i)=>i!==index));}
  function submit(e){e.preventDefault();savePatient(form);setSaved(true);}

  return <AppShell>
    <PageHeader eyebrow="Patient Portal" title="Medical Profile" subtitle="Keep your medical information up to date." />
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-5">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Blood Group" badge={<VerificationBadge status={patient.bloodVerification} />} />
          <select value={form.bloodGroup} onChange={e=>update("bloodGroup",e.target.value)} className="mt-4 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-blue-400">
            {["O+","O-","A+","A-","B+","B-","AB+","AB-"].map(x=><option key={x}>{x}</option>)}
          </select>
          <p className="mt-2 text-xs text-slate-400">Last verified: {patient.bloodLastVerified}</p>
        </Card>
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Allergies" />
          <div className="mt-4 flex flex-wrap gap-2">{form.allergies.map((x,i)=><Chip key={x} label={x} onRemove={()=>remove("allergies",i)} danger/>)}</div>
          <div className="mt-4 flex gap-2"><input value={newAllergy} onChange={e=>setNewAllergy(e.target.value)} placeholder="Add allergy" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"/><Button type="button" variant="secondary" onClick={()=>add("allergies",newAllergy,setNewAllergy)}><Plus size={16}/> Add</Button></div>
        </Card>
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Existing Conditions" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{["Diabetes","Hypertension","Asthma","Other"].map(x=><label key={x} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 p-3 text-sm font-bold"><input type="checkbox" checked={form.conditions.includes(x)} onChange={e=>update("conditions",e.target.checked?[...form.conditions,x]:form.conditions.filter(c=>c!==x))} className="h-4 w-4 accent-blue-600"/>{x}</label>)}</div>
          <textarea value={form.notes} onChange={e=>update("notes",e.target.value)} rows={4} placeholder="Optional notes" className="mt-4 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"/>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Current Medications" />
          <div className="mt-4 space-y-2">{form.medications.map((x,i)=><Chip key={x} label={x} onRemove={()=>remove("medications",i)}/>)}</div>
          <div className="mt-4 flex gap-2"><input value={newMed} onChange={e=>setNewMed(e.target.value)} placeholder="e.g. Metformin 500mg" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"/><Button type="button" variant="secondary" onClick={()=>add("medications",newMed,setNewMed)}><Plus size={16}/> Add</Button></div>
        </Card>
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Emergency Contacts" />
          <div className="mt-4 space-y-3">{form.contacts.map((c,i)=><div key={`${c.name}-${i}`} className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><div><p className="text-sm font-extrabold">{c.name}</p><p className="text-xs text-slate-500">{c.relation} • {c.phone}</p></div><button type="button" onClick={()=>remove("contacts",i)} className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-600"><Trash2 size={16}/></button></div>)}</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3"><input value={newContact.name} onChange={e=>setNewContact({...newContact,name:e.target.value})} placeholder="Name" className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none"/><input value={newContact.relation} onChange={e=>setNewContact({...newContact,relation:e.target.value})} placeholder="Relation" className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none"/><input value={newContact.phone} onChange={e=>setNewContact({...newContact,phone:e.target.value})} placeholder="Phone" className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none"/></div>
          <Button type="button" variant="secondary" onClick={addContact} className="mt-3"><Plus size={16}/> Add Contact</Button>
        </Card>
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Medical Reports" />
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-600"><FileUp size={18}/></span><span><span className="block text-sm font-extrabold">Upload Reports</span><span className="block text-xs text-slate-500">PDF, JPG or PNG</span></span><input type="file" className="hidden"/></label>
          <div className="mt-3 space-y-2">{form.reports.map(x=><div key={x} className="rounded-xl border border-slate-100 p-3 text-xs font-bold text-slate-600">✓ {x}</div>)}</div>
        </Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center"><Button type="submit" className="sm:flex-1"><Check size={17}/> Save Changes</Button>{saved&&<span className="text-center text-sm font-bold text-emerald-600">Changes saved successfully ✓</span>}</div>
      </div>
    </form>
  </AppShell>;
}
function SectionTitle({title,badge}){return <div className="flex items-center justify-between gap-3"><h2 className="text-base font-extrabold text-slate-950">{title}</h2>{badge}</div>}
function Chip({label,onRemove,danger}){return <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${danger?"border-red-100 bg-red-50 text-red-700":"border-slate-200 bg-slate-50 text-slate-700"}`}>{label}<button type="button" onClick={onRemove} aria-label={`Remove ${label}`}><Trash2 size={13}/></button></span>}
