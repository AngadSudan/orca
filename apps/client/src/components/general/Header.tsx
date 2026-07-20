import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
function Header() {
  const headerLinks = [
    { url: "/about", name: "About" },
    { url: "/feature", name: "Features" },
    { url: "/pricing", name: "Pricing" },
  ];
  return (
    <header className="w-full px-4 flex justify-evenly">
      <Link href="/">
        <Image
          src={logo}
          alt="orca-logo"
          loading="eager"
          className="object-contain w-40 scale-130"
        />
      </Link>

      <div className="flex items-center justify-evenly p-4 w-1/2">
        {headerLinks.map((link, index) => {
          return (
            <Link key={index} href={link.url} className="text-lg font-medium">
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Link href={"/login"} className="text-lg text-gray-800 font-normal">
          Log in |
        </Link>
        <Link
          href={"/signup"}
          className="bg-black text-white px-4 py-2 rounded-full text-lg font-normal"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Header;
