export function pill(kind: "green" | "yellow" | "red" | "gray") {
  const map = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    yellow: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    gray: "bg-slate-50 text-slate-700 ring-slate-200",
  };

  return `inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${map[kind]}`;
}
