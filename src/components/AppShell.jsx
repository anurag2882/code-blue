import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useApp } from "../context/AppContext";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  const { toast } = useApp();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        {open && <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} />}
        <div className="min-w-0 flex-1">
          <Navbar onMenu={() => setOpen(true)} />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
        </div>
      </div>
      {toast && (
        <div className={`fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border px-4 py-3 text-sm font-bold shadow-xl ${toast.type === "error" ? "border-red-100 bg-red-50 text-red-700" : "border-emerald-100 bg-emerald-50 text-emerald-700"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
