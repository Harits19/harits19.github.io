
export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className=" -3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3 text-slate-900">
        <div className="flex min-h-11 min-w-11 items-center justify-center  -2xl bg-slate-950 text-white"></div>
        <div>
          <div className="text-sm font-semibold">{value}</div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
