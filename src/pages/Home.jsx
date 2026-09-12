import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, QrCode, HeartPulse, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Card from "../components/Card";
import { QRCodeSVG } from "qrcode.react";

const features = [
  [HeartPulse, "Emergency Medical Identity", "Critical health information organized for moments when every second matters."],
  [LockKeyhole, "Secure Access", "A secure emergency identifier keeps medical data out of the QR itself."],
  [QrCode, "Critical Information", "Bystanders and authorized staff see only the information appropriate to their role."],
  [PhoneCall, "Emergency Contacts", "Make the right call quickly with prominent, accessible contact actions."],
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <Link to="/patient/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 sm:block">Login</Link>
          <Link to="/patient/signup"><Button>Sign Up <ArrowRight size={16}/></Button></Link>
        </div>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
          <div className="relative z-10">
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-600"/> Emergency Health ID
              </span>
              <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.02] tracking-[-.045em] text-slate-950 sm:text-6xl">
                Your Emergency<br className="hidden sm:block"/> Health ID —<br/>
                <span className="text-blue-600">Ready When It Matters</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                Keep your medical information safe, accessible and always ready — for you, your loved ones and the people who help you in an emergency.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/patient/signup"><Button className="w-full sm:w-auto">Create your Health ID <ArrowRight size={17}/></Button></Link>
                <Link to="/patient/login"><Button variant="secondary" className="w-full sm:w-auto">Login</Button></Link>
              </div>
              <p className="mt-4 text-xs text-slate-400">Fictional prototype data • Built for emergency access demonstration</p>
            </motion.div>
          </div>

          <motion.div className="relative mx-auto w-full max-w-[520px]" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.65,delay:.1}}>
            <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-blue-100/60 blur-3xl"/>
            <div className="absolute -right-4 bottom-8 h-44 w-44 rounded-full bg-sky-100/70 blur-3xl"/>
            <Card className="relative overflow-hidden p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <Logo compact />
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700">Secure ID</span>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.16em] text-slate-400">Emergency profile</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">Anurag Mishra</p>
                  <p className="mt-1 text-sm text-slate-500">EHID-20260831-0042</p>
                  <div className="mt-5 flex gap-2">
                    <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold">Blood O+</span>
                    <span className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Penicillin allergy</span>
                  </div>
                </div>
                <div className="mx-auto rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                  <QRCodeSVG value="https://codeblue.demo/emergency/EHID-20260831-0042" size={150} level="M" />
                </div>
              </div>
              <div className="mt-7 rounded-xl bg-blue-50 p-4 text-sm font-bold text-blue-800">When the patient can't speak, CODE BLUE speaks for them.</div>
            </Card>
          </motion.div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([Icon,title,body], i) => (
                <motion.div key={title} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}>
                  <Card hover className="h-full p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={19}/></span>
                    <h3 className="mt-4 text-sm font-extrabold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="px-4 py-8 text-center text-xs text-slate-400">CODE BLUE • Emergency Health ID • Prototype</footer>
    </div>
  );
}
