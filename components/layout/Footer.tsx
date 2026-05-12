import Link from "next/link";
import { Rss } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
              }}
            >
              Unboxd<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
            <p
              className="mt-2 text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Weekly product teardowns. We rip apart competing products so you
              don&apos;t have to.
            </p>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/authors", label: "Authors" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Subscribe
            </h3>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--accent)" }}
            >
              <Rss className="w-4 h-4" />
              RSS Feed
            </Link>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-center text-sm"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          &copy; {new Date().getFullYear()} Unboxd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
