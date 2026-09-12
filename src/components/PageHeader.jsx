export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-extrabold uppercase tracking-[.16em] text-blue-600">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
