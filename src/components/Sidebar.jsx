import { LayoutDashboard, FileHeart, ClipboardList, Settings, X, ShieldCheck, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const items = [
  ["/patient/dashboard", "Dashboard", LayoutDashboard],
  ["/patient/medical-profile", "Medical Profile", FileHeart],
  ["/patient/access-logs", "Access Logs", ClipboardList],
  ["/patient/settings", "Settings", Settings],
];

export default function Sidebar({ open=false, onClose }) {
  return (
    <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-5 transition-transform lg:static lg:translate-x-0`}>
      <div className="mb-9 flex items-center justify-between">
        <Logo />
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-100 lg:hidden"><X size={18}/></button>
      </div>
      <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Patient Portal</p>
      <nav className="space-y-1">
        {items.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} onClick={onClose} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>
            <Icon size={18}/>{label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 border-t border-slate-100 pt-5">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Other flows</p>
        <NavLink to="/guardian/dashboard" className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"><Users size={18}/> Guardian</NavLink>
        <NavLink to="/hospital/dashboard" className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"><ShieldCheck size={18}/> Hospital</NavLink>
      </div>
    </aside>
  );
}
