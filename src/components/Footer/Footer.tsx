import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12 text-center text-sm">
      {/* --- top nav row --- */}
      <nav className="mb-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
        <Link
          href="/privacy-policy"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          Privacy&nbsp;Policy
        </Link>

        <Link
          href="/terms-of-service"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          Terms&nbsp;of&nbsp;Service
        </Link>

        <Link
          href="/contact"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          Contact&nbsp;Us
        </Link>
      </nav>

      {/* --- copyright line --- */}
      <p className="text-muted-foreground">
        ©{new Date().getFullYear()} ChatBot. All rights reserved.
      </p>
    </footer>
  );
}
