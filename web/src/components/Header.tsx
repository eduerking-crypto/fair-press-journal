"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/journals", label: "Journals" },
  { href: "/topics", label: "Topics" },
  { href: "/specials", label: "Specials" },
  { href: "/editorial-process", label: "Editorial Process" },
  { href: "/about", label: "About" },
];

type SessionUser = { name: string; email: string } | null;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SessionUser>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  }

  const firstName = user?.name.split(" ")[0];

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          href="/"
          className="site-brand"
          aria-label="Fair Press Journal of Science — Home"
          onClick={close}
        >
          <Logo />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-actions">
          {user ? (
            <>
              <span className="site-user">Hi, {firstName}</span>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-ghost">
              Sign In / Sign Up
            </Link>
          )}
          <Link href="/submit" className="btn">
            Submit
          </Link>
          <button
            type="button"
            className="site-burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="site-mobile-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-mobile-link"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="site-mobile-link" onClick={close}>
            {user ? `Signed in as ${user.name}` : "Sign In / Sign Up"}
          </Link>
          <Link href="/submit" className="btn site-mobile-submit" onClick={close}>
            Submit
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
