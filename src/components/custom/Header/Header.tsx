import Link from "next/link";

const navItems = [
  { name: "Global Exhibitions", href: "/global-exhibitions" },
  { name: "Geographic Trends", href: "/geographic-trends" },
  { name: "Artist Demographics", href: "/artist-demographics" },
  { name: "Artist-Exhibition Connections", href: "/artist-connections" },
];

function Header() {
  return (
    <header className="bg-cream shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8">
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
      </nav>
    </header>
  );
}

export default Header;
