"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import BadgeScene from "@/components/badge-scene";

const subscribeToTheme = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const getThemeSnapshot = () =>
  document.documentElement.classList.contains("dark");

const getServerThemeSnapshot = () => false;

const NAV = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  {
    title: "UI/UX Design",
    desc: "From wireframes to polished prototypes. Intuitive, visually compelling interfaces that convert visitors into users and put usability first.",
    icon: "M4 5h16v10H4zM8 19h8",
  },
  {
    title: "Frontend Dev",
    desc: "Production-grade code with Next.js, React and Tailwind CSS. Pixel-perfect, fully responsive, SEO-friendly and blazing fast — no bloat.",
    icon: "M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12",
  },
  {
    title: "Interactive 3D",
    desc: "Immersive product showcases with Three.js and React Three Fiber — physics-driven scenes like the badge on this page.",
    icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  },
];

const PROJECTS = [
  {
    tags: ["3D", "Next.js"],
    title: "Interactive Event Badge",
    desc: "A physics-based 3D lanyard badge you can grab, drag and fling — built with React Three Fiber, Rapier physics and meshline ropes.",
  },
  {
    tags: ["Landing page", "Tailwind"],
    title: "Finlo — Fintech App",
    desc: "Marketing site and onboarding flow for a personal finance app targeting young professionals. Tailwind CSS + React.",
  },
  {
    tags: ["Agency", "Animation"],
    title: "Orea — Creative Agency",
    desc: "Bold editorial site for a branding studio. Scroll-driven animations and a custom cursor to match their premium positioning.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Three.js",
  "React Three Fiber",
  "Rapier",
  "Figma",
];

const REVIEWS = [
  {
    quote:
      "Daffa delivered our redesign in record time and the quality blew us away. Our conversion rate jumped 28% in the first month. Absolutely recommend.",
    name: "Sarah Müller",
    role: "CPO, Novu",
  },
  {
    quote:
      "Working with Daffa is a dream. He asks the right questions, moves fast, and the final result always exceeds what we imagined. Our best hire of 2026.",
    name: "Thomas Renault",
    role: "Founder, Finlo",
  },
  {
    quote:
      "We had a tight deadline and a vague brief. Daffa turned both into a polished site in under two weeks. Clean code, zero hand-holding needed.",
    name: "Camille Dufresne",
    role: "Creative Director, Orea",
  },
];

const POSTS = [
  {
    tag: "3D",
    date: "Sep 12, 2026",
    title: "Physics-based UI: why your buttons should fall",
    excerpt:
      "What happens when you bring rigid-body physics into interface design — and how it makes products memorable.",
  },
  {
    tag: "Dev",
    date: "Aug 30, 2026",
    title: "Next.js App Router patterns I use on every project",
    excerpt:
      "Server components, layouts and loading states — the structure I reach for to ship features fast without spaghetti.",
  },
  {
    tag: "Freelance",
    date: "Jul 18, 2026",
    title: "5 lessons from my first year of full-time freelancing",
    excerpt:
      "Contracts, pricing, scope creep — the things nobody tells you before you go solo.",
  },
];

const STATS = [
  { n: "15+", l: "Projects done" },
  { n: "10+", l: "Happy clients" },
  { n: "3y", l: "Experience" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent font-display font-bold text-xs tracking-widest uppercase mb-3">
      {children}
    </p>
  );
}

export default function Portfolio() {
  const dark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("hero");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ids = [
      "contact",
      "blog",
      "reviews",
      "about",
      "work",
      "services",
      "hero",
    ];
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;
      if (atBottom) return setSection("contact");
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) return setSection(id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const navCls = (id: string) =>
    `nl hidden md:inline text-sm transition-colors ${
      section === id ? "on text-accent" : "hover:text-accent"
    }`;

  return (
    <div className="relative z-10">
      {/* ═══ NAV ═══ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm shadow-black/5"
            : ""
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-display font-bold text-lg">
            daffa<span className="text-accent">.</span>haidar
          </a>
          <div className="flex items-center gap-6">
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={navCls(item.id)}>
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent transition-colors"
            >
              {dark ? "☀" : "☾"}
            </button>
            <a
              href="#contact"
              className="hidden md:inline shimmer bg-accent text-white font-display font-bold text-sm px-4 py-2 rounded-full hover:bg-accent-light transition-colors"
            >
              Hire me
            </a>
            <button
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800"
            >
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </nav>
        {menu && (
          <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 px-6 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenu(false)}
                className={`text-sm py-1 ${
                  section === item.id ? "text-accent font-medium" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section
          id="hero"
          className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 grid lg:grid-cols-2 gap-10 items-center"
        >
          <div>
            <p className="reveal inline-flex items-center gap-2 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for work
            </p>
            <h1 className="reveal d1 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6">
              Hi, I&apos;m Daffa — Freelance{" "}
              <span className="text-accent">
                UI/UX Designer &amp; Frontend Developer
              </span>
              . I design and build digital products that people love to use —
              fast, clean, and accessible.
            </h1>
            <div className="reveal d2 flex flex-wrap gap-3 mb-12">
              <a
                href="#work"
                className="shimmer bg-accent text-white font-display font-bold text-sm px-6 py-3 rounded-full hover:bg-accent-light transition-colors"
              >
                View my work
              </a>
              <a
                href="#contact"
                className="font-display font-bold text-sm px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-accent hover:text-accent transition-colors"
              >
                Get in touch
              </a>
            </div>
            <div className="reveal d3 flex gap-10">
              {STATS.map((s) => (
                <div key={s.l}>
                  <p className="font-display font-bold text-3xl text-accent">
                    {s.n}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* interactive 3D badge — strap hangs from the very top of the page */}
          <div className="reveal d2 relative h-[380px] sm:h-[480px] select-none lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:h-auto">
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-zinc-400 dark:text-zinc-500 pointer-events-none">
              ↑ drag the badge — it&apos;s physical
            </span>
            <BadgeScene />
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-20">
          <div className="reveal">
            <Eyebrow>What I do</Eyebrow>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10">
              Services
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`reveal d${
                  (i % 3) + 1
                } card-h border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-accent`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent grid place-items-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d={s.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ WORK ═══ */}
        <section id="work" className="max-w-6xl mx-auto px-6 py-20">
          <div className="reveal">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10">
              Portfolio
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className={`reveal d${
                  (i % 3) + 1
                } card-h border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-accent`}
              >
                <div className="h-40 bg-gradient-to-br from-accent/15 via-zinc-100 to-zinc-200 dark:from-accent/20 dark:via-zinc-900 dark:to-zinc-800 grid place-items-center">
                  <span className="font-display font-bold text-4xl text-accent/60">
                    {p.title.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 rounded-full px-2.5 py-1 text-zinc-500 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    View case study →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reveal">
              <Eyebrow>A bit about who I am</Eyebrow>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                About me
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                I&apos;m Daffa, a freelance designer and frontend developer
                with 3 years of experience shipping digital products for
                startups and agencies. I thrive at the intersection of great
                design and clean code.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I believe great interfaces are invisible — they get out of the
                user&apos;s way. My work is fast, accessible and built to
                last. When I&apos;m not coding, you&apos;ll find me hunting
                for a good espresso.
              </p>
            </div>
            <div className="reveal d2">
              <Eyebrow>Stack &amp; tools</Eyebrow>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ REVIEWS ═══ */}
        <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
          <div className="reveal">
            <Eyebrow>Social proof</Eyebrow>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10">
              What clients say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <blockquote
                key={r.name}
                className={`reveal d${
                  (i % 3) + 1
                } card-h border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-accent`}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <footer>
                  <p className="font-display font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {r.role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ═══ BLOG ═══ */}
        <section id="blog" className="max-w-6xl mx-auto px-6 py-20">
          <div className="reveal">
            <Eyebrow>Thoughts</Eyebrow>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10">
              From the blog
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.map((p, i) => (
              <article
                key={p.title}
                className={`reveal d${
                  (i % 3) + 1
                } card-h border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-accent`}
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  <span className="text-accent font-medium">{p.tag}</span>
                  {" · "}
                  {p.date}
                </p>
                <h3 className="font-display font-bold text-lg leading-snug mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {p.excerpt}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reveal">
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                I&apos;m open to UI/UX and frontend missions, short or
                long-term. Landing page, full product redesign, or just a
                second pair of eyes — let&apos;s talk.
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:hello@daffahaidar.dev"
                    className="hover:text-accent transition-colors"
                  >
                    hello@daffahaidar.dev
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/daffahaidar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    linkedin.com/in/daffahaidar
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/daffahaidar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    github.com/daffahaidar
                  </a>
                </li>
              </ul>
            </div>
            <div className="reveal d2">
              {sent ? (
                <div className="border border-accent/30 bg-accent/10 rounded-2xl p-8 h-full grid place-items-center text-center">
                  <p className="font-display font-bold text-lg text-accent">
                    Thanks! Your message is noted — I&apos;ll get back to you
                    soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="Name *"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <input
                    placeholder="Subject"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="shimmer w-full bg-accent text-white font-display font-bold text-sm py-3.5 rounded-xl hover:bg-accent-light transition-colors"
                  >
                    Send message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 Daffa Haidar. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Built with Next.js, Tailwind CSS &amp; React Three Fiber
          </p>
        </div>
      </footer>
    </div>
  );
}
