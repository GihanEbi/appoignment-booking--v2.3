import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto my-20 grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
      <div className="relative isolate overflow-hidden rounded-xl p-8">
        <div className="absolute inset-0 -z-10 rounded-xl" />
        <Image
          src="/images/hero/hero3.png"
          alt="ChatApp bot on mobile"
          width={320}
          height={640}
          priority
          className="mx-auto h-auto w-auto rounded-[28px]"
        />
      </div>

      <div>
        <h1 className=" mb-4 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
          Your AI&nbsp;Assistant on&nbsp;ChatApp
        </h1>

        <p className="text-muted-foreground mb-8 max-w-prose md:text-lg">
          Enhance your ChatApp experience with our AI‑powered bot. Get instant
          answers, automate tasks, and stay connected like never before.
        </p>

        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-900 focus-visible:ring-primary inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium text-white shadow transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Get&nbsp;Started
        </Link>
      </div>
    </section>
  );
}
