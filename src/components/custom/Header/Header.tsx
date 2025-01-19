import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Global Exhibitions", href: "/global-exhibitions" },
  { name: "Geographic Trends", href: "/geographic-trends" },
  { name: "Artist Demographics", href: "/artist-demographics" },
  { name: "Artist-Exhibition Connections", href: "/artist-connections" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-cream relative shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="text-coffee shrink-0 text-4xl font-bold">
            ArtVis
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden flex-1 justify-end space-x-8 md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-coffee hover:text-brown group relative font-semibold transition-colors"
                >
                  {item.name}
                  <span className="bg-brown absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="text-coffee md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="bg-cream absolute left-0 right-0 top-full z-[1000] shadow-md md:hidden">
            <ul className="container mx-auto space-y-4 px-4 py-2">
              {navItems.map((item) => (
                <li key={item.name} className="text-right">
                  <Link
                    href={item.href}
                    className="text-coffee active:text-brown group relative block py-2 font-semibold transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="bg-latte absolute inset-0 origin-right scale-x-0 transform transition-transform group-hover:scale-x-100 group-active:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
