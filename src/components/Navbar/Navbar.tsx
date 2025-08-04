'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Image
            alt="logo"
            src="/logo.jpeg"
            width={40}
            height={40}
          />
          {/* hide this text when it came mobile view */}
          <span className="hidden md:inline">Easy Appointment</span>
        </Link>

        {/* desktop links */}
        <nav className="hidden gap-6 md:flex">
          {['Features', 'Pricing', 'Support'].map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className={cn(
              'border-primary/20 rounded-md border px-4 py-2 text-sm font-medium',
              'text-primary hover:bg-primary/10 transition-colors'
            )}
          >
            Sign&nbsp;In
          </Link>
          <Link
            href="/signup"
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium text-white shadow',
              'bg-blue-600 hover:bg-blue-900 transition-colors'
            )}
          >
            Get&nbsp;Started
          </Link>
        </div>
      </div>
    </header>
  );
}
