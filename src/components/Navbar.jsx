import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {onMenu && <button onClick={onMenu} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={21}/></button>}
          <Logo compact />
        </div>
        <div className="flex items-center gap-2">
          <Link to="/guardian/notification" aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100"><Bell size={19}/></Link>
          <span className="hidden h-9 w-9 place-items-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700 sm:grid">HM</span>
        </div>
      </div>
    </header>
  );
}
