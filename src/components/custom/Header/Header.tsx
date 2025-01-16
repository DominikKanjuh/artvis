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
    <header className="bg-cream shadow-md relative">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-8">
          <Link href="/" className="text-4xl font-bold text-coffee shrink-0">
            ArtVis
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 justify-end flex-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-coffee hover:text-brown font-semibold transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brown transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-coffee"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute z-[1000] top-full left-0 right-0 bg-cream shadow-md md:hidden">
            <ul className="container mx-auto px-4 py-2 space-y-4">
              {navItems.map((item) => (
                <li key={item.name} className="text-right">
                  <Link
                    href={item.href}
                    className="block text-coffee font-semibold py-2 transition-all relative group active:text-brown"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-latte transform scale-x-0 origin-right transition-transform group-hover:scale-x-100 group-active:scale-x-100" />
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
