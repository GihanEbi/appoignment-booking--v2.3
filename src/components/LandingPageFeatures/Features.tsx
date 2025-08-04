import { Sparkles, Clock, Bot } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const features: Feature[] = [
  {
    title: 'Smart Responses',
    description:
      'Get instant, context‑aware responses to your queries, making conversations flow naturally.',
    Icon: Sparkles,
  },
  {
    title: '24/7 Availability',
    description:
      'Our AI bot is always available, providing support and information whenever you need it.',
    Icon: Clock,
  },
  {
    title: 'Seamless Integration',
    description:
      'Integrates smoothly with your existing ChatApp account, enhancing your current experience without any hassle.',
    Icon: Bot,
  },
];

export default function Features() {
  return (
    <section className="mx-auto my-24 max-w-7xl px-4">
      {/* --- Heading & sub‑copy --- */}
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Unlock the Power of&nbsp;AI in&nbsp;Your Chats
        </h2>
        <p className="text-muted-foreground mt-4 md:text-lg">
          Our ChatApp AI bot brings a new level of intelligence to your
          conversations, making them more efficient and enjoyable.
        </p>
      </div>

      {/* --- Feature cards --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {features.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="group border-border/70 bg-background rounded-xl border p-6 transition-shadow hover:shadow-lg"
          >
            <Icon className="text-primary mb-4 h-6 w-6" />
            <h3 className="mb-2 text-base font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
