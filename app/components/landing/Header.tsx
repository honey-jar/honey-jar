import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Our Story", to: "/" },
    { label: "Blogs", to: "/" },
    { label: "Products", to: "/" },
  ];

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 overflow-hidden">
            <img
              src="./logo.png"
              alt="HoneyJar logo"
              className="w-full h-full object-cover scale-[1.3]"
            />
          </div>
          <p className="font-medium text-base sm:text-lg">HoneyJar</p>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 tracking-tighter">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="py-2 font-custom-mono text-muted-foreground hover:text-foreground transition text-sm border-b-2 border-transparent hover:border-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-4 py-2 font-custom-mono text-sm border border-transparent text-primary-foreground bg-primary hover:text-primary hover:border-primary hover:bg-transparent transition"
          >
            Get Quote
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-full left-0 w-full md:hidden px-4 pb-4 pt-2 space-y-2 bg-background border-t">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block font-custom-mono text-muted-foreground hover:text-foreground transition text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            className="block text-center mt-2 px-4 py-2 font-custom-mono text-sm border border-transparent text-primary-foreground bg-primary hover:text-primary hover:border-primary hover:bg-transparent transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Quote
          </Link>
        </div>
      )}
    </header>
  );
}
