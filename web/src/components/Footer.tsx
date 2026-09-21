import Link from "next/link";
import Logo from "./Logo";

const AUTHOR_LINKS = [
  { href: "/editorial-process", label: "Guidelines" },
  { href: "/ethics", label: "Ethics" },
  { href: "/editorial-process", label: "Submit" },
];

const BROWSE_LINKS = [
  { href: "/journals", label: "Journals" },
  { href: "/topics", label: "Topics" },
  { href: "/specials", label: "Specials" },
  { href: "/search", label: "Search" },
];

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy", label: "Privacy" },
  { href: "/legal/terms-of-use", label: "Terms" },
  { href: "/legal/copyright-and-licensing", label: "Copyright" },
  { href: "/legal/cookie-policy", label: "Cookies" },
];

interface FooterLink {
  href: string;
  label: string;
}

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <>
      {links.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href} className="site-footer-link">
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div className="site-footer-col site-footer-about">
            <Logo variant="light" />
            <p>
              Fair Press publishes peer-reviewed science under fair, transparent
              and author-friendly terms. Rigorous research deserves a permanent,
              open and citable home.
            </p>
            <a className="site-footer-mail" href="mailto:editorial@fairpressjournal.org">
              editorial@fairpressjournal.org
            </a>
          </div>
          <div className="site-footer-col">
            <h4>For Authors</h4>
            <FooterLinks links={AUTHOR_LINKS} />
          </div>
          <div className="site-footer-col">
            <h4>Browse</h4>
            <FooterLinks links={BROWSE_LINKS} />
          </div>
          <div className="site-footer-col">
            <h4>Legal</h4>
            <FooterLinks links={LEGAL_LINKS} />
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 Fair Press. All rights reserved.</span>
          <span>ISSN 2077-0130 (Print) · ISSN 2077-0131 (Online)</span>
        </div>
      </div>
    </footer>
  );
}
