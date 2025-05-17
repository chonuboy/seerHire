import { imgHelper } from "@/lib/image-helper";
import { roboto, robotoSerif } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Home",
    href: "/",
    icon: imgHelper.home,
  },
  {
    name: "Candidates",
    href: "/candidates",
    icon: imgHelper.candidates,
  },
  {
    name: "Clients",
    href: "/clients",
    icon: imgHelper.client,
  },
  {
    name: "Recruitment",
    href: "/recruitments",
    icon: imgHelper.recruitment,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: imgHelper.analytics,
  },
  {
    name: "Help",
    href: "/help",
    icon: imgHelper.help,
  },
  {
    name: "Search",
    href: "/search",
    icon: imgHelper.resume,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: imgHelper.settings,
  },
];

export default function NavLinks() {
  const pathname = usePathname();


  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-4 hover:bg-blue-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <img src={link.icon} alt={link.name} className="w-6 h-6" />
            <p className={`${roboto.className} hidden md:block`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
