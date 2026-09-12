import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Phone, UserRound, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

export function PatientSignup() {
  const navigate = useNavigate();
  const { setPatientAuthed, notify } = useApp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({name:"",phone:"",email:"",password:""});
  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPatientAuthed(true);
    notify("Account created successfully.");
    navigate("/patient/dashboard");
  }

  return <AuthLayout title="Create your account" subtitle="Set up your Emergency Health ID in a few steps.">
    <form onSubmit={submit} className="space-y-4">
      <Field icon={UserRound} label="Full Name" value={form.name} onChange={(v)=>setForm({...form,name:v})} error={errors.name} />
      <Field icon={Phone} label="Phone Number" value={form.phone} onChange={(v)=>setForm({...form,phone:v})} />
      <Field icon={Mail} label="Email Address" type="email" value={form.email} onChange={(v)=>setForm({...form,email:v})} error={errors.email} />
      <Field icon={Lock} label="Password" type={show?"text":"password"} value={form.password} onChange={(v)=>setForm({...form,password:v})} error={errors.password} trailing={<button type="button" onClick={()=>setShow(!show)} className="text-slate-400">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button>} />
      <Button type="submit" className="mt-2 w-full">Sign Up</Button>
    </form>
    <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link className="font-extrabold text-blue-600" to="/patient/login">Login</Link></p>
  </AuthLayout>;
}

export function PatientLogin() {
  const navigate = useNavigate();
  const { setPatientAuthed, notify } = useApp();
  const [form,setForm]=useState({email:"",password:""});
  function submit(e){e.preventDefault();setPatientAuthed(true);notify("Welcome back.");navigate("/patient/dashboard");}
  return <AuthLayout title="Welcome back" subtitle="Access your secure Emergency Health ID.">
    <form onSubmit={submit} className="space-y-4">
      <Field icon={Mail} label="Email Address" type="email" value={form.email} onChange={(v)=>setForm({...form,email:v})} />
      <Field icon={Lock} label="Password" type="password" value={form.password} onChange={(v)=>setForm({...form,password:v})} />
      <div className="flex justify-end"><button type="button" className="text-xs font-bold text-blue-600">Forgot password?</button></div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
    <p className="mt-6 text-center text-sm text-slate-500">New to CODE BLUE? <Link className="font-extrabold text-blue-600" to="/patient/signup">Create account</Link></p>
  </AuthLayout>;
}

function AuthLayout({title,subtitle,children}) {
  return <div className="grid min-h-screen lg:grid-cols-[.8fr_1.2fr]">
    <div className="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <Logo />
      <div><p className="text-sm font-bold text-blue-100">Emergency Health ID</p><h2 className="mt-4 max-w-md text-5xl font-black leading-tight">Ready when it matters.</h2><p className="mt-5 max-w-md text-sm leading-7 text-blue-100">A clean, secure identity for critical information when the patient cannot communicate.</p></div>
      <p className="text-xs text-blue-200">CODE BLUE • Prototype</p>
    </div>
    <div className="flex items-center justify-center bg-slate-50 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 lg:hidden"><Logo /></div>
        <Card className="p-6 sm:p-8">
          <div className="mb-7"><div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><ShieldCheck size={21}/></div><h1 className="text-2xl font-black text-slate-950">{title}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p></div>
          {children}
        </Card>
      </div>
    </div>
  </div>;
}

function Field({icon:Icon,label,value,onChange,error,type="text",trailing}) {
  return <label className="block"><span className="mb-1.5 block text-xs font-extrabold text-slate-700">{label}</span><span className={`flex min-h-12 items-center gap-3 rounded-xl border bg-white px-3.5 ${error?"border-red-300":"border-slate-200 focus-within:border-blue-400"}`}><Icon size={17} className="shrink-0 text-slate-400"/><input aria-label={label} type={type} value={value} onChange={e=>onChange(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"/>{trailing}</span>{error&&<span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
