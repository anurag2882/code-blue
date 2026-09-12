import { Download, Maximize2, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";

export default function QRCodeCard({ emergencyId, label="Scan this QR to view your emergency profile" }) {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);

  function downloadQR() {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${emergencyId}-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-slate-950">Emergency QR</p>
            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">{label}</p>
          </div>
          <span className="rounded-full bg-blue-50 p-2 text-blue-600"><ShieldCheck size={17} /></span>
        </div>
        <div ref={qrRef} className="mx-auto grid max-w-[230px] place-items-center rounded-2xl border border-slate-100 bg-white p-5">
          <QRCodeSVG value={`https://codeblue.demo/emergency/${encodeURIComponent(emergencyId)}`} size={190} level="M" includeMargin />
        </div>
        <p className="mt-4 text-center text-sm font-extrabold tracking-wide text-slate-900">{emergencyId}</p>
        <p className="mt-1 text-center text-[11px] text-slate-400">Secure identifier only — no medical data is stored in the QR.</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={downloadQR}><Download size={16} /> Download</Button>
          <Button onClick={() => setOpen(true)}><Maximize2 size={16} /> Fullscreen</Button>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Emergency QR">
        <div className="grid place-items-center">
          <div className="rounded-3xl border border-slate-100 p-6">
            <QRCodeSVG value={`https://codeblue.demo/emergency/${encodeURIComponent(emergencyId)}`} size={280} level="M" includeMargin />
          </div>
          <p className="mt-5 text-center text-base font-extrabold">{emergencyId}</p>
          <p className="mt-1 text-center text-xs text-slate-500">Secure emergency identifier</p>
        </div>
      </Modal>
    </>
  );
}
