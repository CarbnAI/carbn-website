import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RevealItem } from "@/components/ui/reveal";
import { productHref, type Product } from "@/lib/content/products";
import { cn } from "@/lib/utils";

/** Module card. The flagship (CarbnBenchmarks) is the group's single Volt cell. */
export function ModuleCard({
  product,
  n,
  total,
}: {
  product: Product;
  n: number;
  total: number;
}) {
  const featured = n === 1;
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <RevealItem className={cn("border-r border-b", featured && "bg-volt")}>
      <Link
        href={productHref(product.slug)}
        className={cn(
          "group flex h-full min-h-[300px] flex-col p-6 transition-colors duration-200 ease-carbn md:p-8",
          featured ? "text-graphite-950" : "hover:bg-graphite-900",
        )}
      >
        <div className="flex items-start justify-between">
          {featured ? (
            <span className="type-mono text-[48px] leading-none">{pad(n)}</span>
          ) : (
            <span className="type-mono text-graphite-400">
              {pad(n)} / {pad(total)}
            </span>
          )}
          <ArrowUpRight
            aria-hidden
            className={cn(
              "size-5 stroke-[1.5] transition-[translate,color] duration-200 ease-carbn group-hover:translate-x-1 group-hover:-translate-y-1",
              featured
                ? "text-graphite-950"
                : "text-graphite-400 group-hover:text-volt",
            )}
          />
        </div>
        <p
          className={cn(
            "type-label mt-auto pt-12",
            featured ? "text-graphite-950" : "text-graphite-400",
          )}
        >
          {product.stage}
        </p>
        <h3
          className={cn(
            "type-heading mt-3 text-h3",
            featured ? "text-graphite-950" : "text-graphite-50",
          )}
        >
          {product.name}
        </h3>
        <p
          className={cn(
            "mt-3 text-body",
            featured ? "text-graphite-950" : "text-graphite-300",
          )}
        >
          {product.summary}
        </p>
      </Link>
    </RevealItem>
  );
}
