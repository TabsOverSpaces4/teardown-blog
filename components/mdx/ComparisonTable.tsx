"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  products: Record<string, string | boolean>;
}

interface ComparisonTableProps {
  data?: string;
  features?: string;
  products?: string;
}

function parseRows(
  data?: string,
  features?: string,
  products?: string,
): ComparisonRow[] {
  if (data) {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  if (features && products) {
    const productNames = products.split(",").map((p) => p.trim());
    return features.split(";;").filter(Boolean).map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      const feature = parts[0];
      const prods: Record<string, string | boolean> = {};
      productNames.forEach((name, i) => {
        const val = parts[i + 1] || "";
        if (val === "true") prods[name] = true;
        else if (val === "false") prods[name] = false;
        else prods[name] = val;
      });
      return { feature, products: prods };
    });
  }

  return [];
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-emerald-500" />
    ) : (
      <X className="mx-auto size-4 text-red-400" />
    );
  }
  return <span className="text-[var(--text-primary)]">{value}</span>;
}

export function ComparisonTable({ data, features, products }: ComparisonTableProps) {
  const rows = parseRows(data, features, products);
  if (!rows.length) return null;

  const productNames = Object.keys(rows[0].products);

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="sticky top-0 z-10 bg-[var(--bg-secondary)]">
            <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">
              Feature
            </th>
            {productNames.map((product) => (
              <th
                key={product}
                className="px-4 py-3 text-center font-semibold text-[var(--text-primary)]"
              >
                {product}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-t border-[var(--border)] transition-colors",
                i % 2 === 0
                  ? "bg-[var(--bg-primary)]"
                  : "bg-[var(--bg-secondary)]/50",
              )}
            >
              <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                {row.feature}
              </td>
              {productNames.map((product) => (
                <td key={product} className="px-4 py-3 text-center text-sm">
                  <CellValue value={row.products[product]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
