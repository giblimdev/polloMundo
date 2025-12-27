import React from "react";
import Link from "next/link";
import { Home, Globe, User, Briefcase, Shield, Code } from "lucide-react";

const navItems = [
  { order: 1, label: "Accueil", href: "/", icon: "home" },
  { order: 2, label: "Public", href: "/public", icon: "globe" },
  { order: 3, label: "User", href: "/user", icon: "user" },
  { order: 4, label: "HR", href: "/hr", icon: "briefcase" },
  { order: 5, label: "Admin", href: "/admin", icon: "shield" },
  { order: 6, label: "Dev", href: "/dev", icon: "code" },
];

const iconMap = {
  home: Home,
  globe: Globe,
  user: User,
  briefcase: Briefcase,
  shield: Shield,
  code: Code,
};

export default function HeaderNav() {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {navItems.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];

          return (
            <li key={item.order}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {IconComponent && <IconComponent size={20} />}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
