import Link from "next/link";
import { buildHref } from "@/lib/url/buildHref";

export default function ItemsPagination(props: {
  basePath: string;
  baseParams: Record<string, string | number | undefined | null>;
  page: number;
  totalPages: number;
}) {
  const { basePath, baseParams, page, totalPages } = props;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex items-center justify-center gap-3 mt-12">
      <Link
        aria-disabled={prevDisabled}
        className={`px-4 py-2 rounded-lg border ${
          prevDisabled
            ? "text-gray-400 border-gray-200 pointer-events-none"
            : "hover:bg-gray-50 border-gray-300"
        }`}
        href={buildHref(basePath, { ...baseParams, page: page - 1 })}
      >
        Prev
      </Link>

      <div className="text-gray-700">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <Link
        aria-disabled={nextDisabled}
        className={`px-4 py-2 rounded-lg border ${
          nextDisabled
            ? "text-gray-400 border-gray-200 pointer-events-none"
            : "hover:bg-gray-50 border-gray-300"
        }`}
        href={buildHref(basePath, { ...baseParams, page: page + 1 })}
      >
        Next
      </Link>
    </div>
  );
}
