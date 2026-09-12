import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 min-w-0 ">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-900 text-white shadow-sm">
        <ShieldCheck size={22} strokeWidth={2.2} />
      </span>
      <span className={compact ? "hidden sm:block" : "block"}>
        <span className="block text-[18px] font-extrabold tracking-tight text-black">CODE BLUE</span>
        <span className="block text-[11px] font-medium text-slate-900">Emergency Health ID</span>
      </span>
    </Link>
  );
}
