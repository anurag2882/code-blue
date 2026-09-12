import { AlertTriangle } from "lucide-react";
import Card from "./Card";

export default function EmergencyAlert({ items=[] }) {
  return (
    <Card className="border-red-200 bg-red-50/70 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-100 text-red-600"><AlertTriangle size={20}/></span>
        <div>
          <p className="text-sm font-extrabold text-red-900">Allergy warning</p>
          <p className="mt-1 text-sm text-red-800">{items.length ? items.join(" • ") : "No critical allergies reported."}</p>
        </div>
      </div>
    </Card>
  );
}
