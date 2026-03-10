import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-evergreen text-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl mb-2">Feeding SK</h3>
            <p className="text-offwhite/70 text-sm">
              Recipes, SF eats & lifestyle content.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-offwhite/50">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/links", label: "Links" },
                { href: "/shop", label: "Shop" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/70 hover:text-emerald transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-offwhite/50">
              Connect
            </h4>
            <a
              href="https://instagram.com/feedingsk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-offwhite/70 hover:text-emerald transition-colors"
            >
              @feedingsk on Instagram
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-offwhite/10 text-center text-xs text-offwhite/40">
          &copy; {new Date().getFullYear()} Feeding SK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
