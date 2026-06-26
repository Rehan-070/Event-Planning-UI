import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroWedding from "@/assets/hero-wedding.jpg";
import heroLuxuryWedding from "@/assets/hero-luxury-wedding.jpg";
import heroBabyShower from "@/assets/hero-baby-shower.jpg";
import heroAnniversary from "@/assets/hero-anniversary.jpg";
import heroBirthday from "@/assets/hero-birthday.jpg";
import heroCorporate from "@/assets/hero-corporate.jpg";
import heroLuxury from "@/assets/hero-luxury.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APEX AI — AI-Powered Event Planning Assistant" },
      { name: "description", content: "APEX AI helps event planners manage budgets, vendors, guests, venues and logistics with one intelligent AI platform." },
      { property: "og:title", content: "APEX AI — Plan Smarter. Execute Faster." },
      { property: "og:description", content: "AI-Powered Event Planning Assistant for Modern Event Professionals." },
    ],
  }),
  component: ApexAI,
});

type TabId = "home" | "about" | "services" | "eventpilot" | "events" | "pricing" | "contact";

const NAV: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "eventpilot", label: "EventPilot AI" },
  { id: "events", label: "Event Types" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

const SLIDES = [
  { src: heroWedding, label: "Weddings" },
  { src: heroLuxuryWedding, label: "Luxury Weddings" },
  { src: heroBabyShower, label: "Baby Showers" },
  { src: heroAnniversary, label: "Anniversaries" },
  { src: heroBirthday, label: "Birthdays" },
  { src: heroCorporate, label: "Corporate Events" },
  { src: heroLuxury, label: "Luxury Celebrations" },
];

function ApexAI() {
  const [tab, setTab] = useState<TabId>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: TabId) => {
    setTab(id);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar tab={tab} onNav={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="pt-20">
        {tab === "home" && <HomeSection onNav={go} />}
        {tab === "about" && <AboutSection onNav={go} />}
        {tab === "services" && <ServicesSection onNav={go} />}
        {tab === "eventpilot" && <EventPilotSection />}
        {tab === "events" && <EventTypesSection onNav={go} />}
        {tab === "pricing" && <PricingSection onNav={go} />}
        {tab === "contact" && <ContactSection />}
      </main>
      <Footer onNav={go} />
    </div>
  );
}

/* ----------------------------- NAVBAR ----------------------------- */
function Navbar({
  tab, onNav, mobileOpen, setMobileOpen,
}: { tab: TabId; onNav: (id: TabId) => void; mobileOpen: boolean; setMobileOpen: (b: boolean) => void; }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => onNav("home")} className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-lg btn-gold grid place-items-center font-display text-lg">A</span>
          <span className="font-display text-xl tracking-wide">APEX <span className="gold-text">AI</span></span>
        </button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${tab === n.id ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Brochure download will be available soon."); }}
            className="px-4 py-2 text-sm rounded-md btn-outline-gold"
          >
            Download Brochure
          </a>
          <button onClick={() => onNav("contact")} className="px-5 py-2.5 text-sm rounded-md btn-gold font-medium">
            Start Free Trial
          </button>
        </div>
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-6 h-0.5 bg-foreground" />
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV.map(n => (
              <button key={n.id} onClick={() => onNav(n.id)}
                className={`text-left px-3 py-2 rounded-md ${tab === n.id ? "text-primary font-semibold bg-surface" : "hover:bg-surface"}`}>
                {n.label}
              </button>
            ))}
            <div className="flex gap-2 pt-3">
              <button className="flex-1 px-4 py-2 text-sm rounded-md btn-outline-gold">Brochure</button>
              <button onClick={() => onNav("contact")} className="flex-1 px-4 py-2 text-sm rounded-md btn-gold">Free Trial</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------- HOME ----------------------------- */
function HomeSection({ onNav }: { onNav: (id: TabId) => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="fade-in">
      <div className="relative h-[calc(100vh-5rem)] min-h-[600px] w-full overflow-hidden">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === idx ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl slide-fade">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs tracking-[0.3em] uppercase glass-dark text-primary mb-6">
              AI for Event Professionals
            </span>
            <h1 className="font-display text-6xl md:text-8xl text-white leading-[0.95] mb-4">
              APEX <span className="gold-text">AI</span>
            </h1>
            <p className="font-display text-2xl md:text-4xl text-white/90 mb-3">Your AI Event Planning Partner</p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-4">
              Plan Smarter. Execute Faster.
            </p>
            <p className="text-base text-white/70 max-w-2xl mb-10">
              The intelligent AI assistant built to help event planners solve daily operational challenges —
              budgets, vendors, guests, logistics, timelines, venues and operations in one platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNav("eventpilot")} className="px-7 py-3.5 rounded-md btn-gold font-medium">
                Talk to EventPilot AI
              </button>
              <button onClick={() => onNav("contact")} className="px-7 py-3.5 rounded-md glass-dark text-white border border-primary/60 hover:bg-white/10 transition">
                Book Demo
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto flex items-center justify-between text-white/70 text-xs tracking-widest uppercase">
            <span>{SLIDES[idx].label}</span>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i+1}`}
                  className={`h-1 rounded-full transition-all ${i === idx ? "w-10 bg-primary" : "w-5 bg-white/40"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-surface section-pad !py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10k+", "Events Planned"],
            ["98%", "Client Satisfaction"],
            ["40%", "Cost Reduction"],
            ["24/7", "AI Support"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-display text-4xl gold-text">{k}</div>
              <div className="text-sm text-muted-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- ABOUT ----------------------------- */
function AboutSection({ onNav }: { onNav: (id: TabId) => void }) {
  const pillars = [
    ["Save Time", "Automate repetitive coordination, reminders and reporting."],
    ["Reduce Costs", "AI-powered budget tracking flags overruns before they happen."],
    ["Improve Client Satisfaction", "Personalized planning and instant client communication."],
    ["Increase Efficiency", "One platform replaces spreadsheets, chats, and 10+ tools."],
    ["Automate Repetitive Work", "From RSVPs to follow-ups, AI handles the busywork."],
    ["Global Vendor Intelligence", "Discover trusted vendors across USA, UK, UAE, AU & more."],
  ];
  return (
    <section className="section-pad fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary">About APEX AI</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4 mb-6">The intelligent layer<br/>behind <span className="gold-text">flawless events</span>.</h2>
            <p className="text-lg text-muted-foreground mb-4">
              APEX AI is a premium AI-powered SaaS built exclusively for event planners. We combine
              specialized AI agents with operational workflows that planners actually use — from
              budgeting and vendor sourcing to guest management and real-time analytics.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you're producing intimate baby showers in London, luxury weddings in Dubai, or
              multi-day corporate galas across North America, APEX AI gives your studio the operating
              system it deserves.
            </p>
            <button onClick={() => onNav("services")} className="px-7 py-3.5 rounded-md btn-gold font-medium">
              Explore Capabilities
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map(([t, d]) => (
              <div key={t} className="glass rounded-xl p-6 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-md btn-gold grid place-items-center font-display mb-4">✦</div>
                <h3 className="font-display text-xl mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SERVICES ----------------------------- */
function ServicesSection({ onNav }: { onNav: (id: TabId) => void }) {
  const services = [
    ["Budget Tracking & Financial Management", "Live budgets, alerts, and AI variance analysis across every event."],
    ["Vendor Discovery & Coordination", "Source, vet and coordinate trusted vendors globally."],
    ["Smart Calendar & Event Scheduling", "AI optimizes timelines and prevents conflicts automatically."],
    ["Task & Team Management", "Assign, track and ship tasks across your production team."],
    ["Venue Search & Location Intelligence", "AI-powered venue matching based on capacity, budget, vibe."],
    ["Client Communication Automation", "Always-on client updates, summaries and approvals."],
    ["Guest & RSVP Management", "Smart invites, RSVPs, dietary preferences and seating."],
    ["Contract & Payment Tracking", "Centralize contracts, milestones and payment statuses."],
    ["AI-Powered Planning Assistant", "EventPilot AI answers planner questions 24/7."],
    ["Real-Time Analytics Dashboard", "Performance, profitability and risk in one view."],
    ["Google Maps Vendor & Venue Integration", "Geo-intelligent vendor and venue discovery."],
    ["Automated Reminders & Follow-Ups", "Never miss a deadline, deposit or vendor confirmation."],
  ];
  return (
    <section className="section-pad fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Our Services</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-5">
            Empowering Planners with <span className="gold-text">AI-Driven Automation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From budget management and vendor coordination to smart scheduling and real-time operations,
            our AI agents streamline every aspect of event execution — eliminating manual workload and
            enabling planners to deliver exceptional events with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(([t, d], i) => (
            <div key={t} className="group bg-card rounded-xl p-7 border border-border hover:border-primary/60 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-start gap-4">
                <div className="text-primary font-display text-2xl">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-display text-lg mb-2 group-hover:text-primary transition-colors">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-display text-2xl md:text-3xl mb-6">
            Plan smarter, coordinate faster, execute <span className="gold-text">flawless events</span>.
          </p>
          <button onClick={() => onNav("eventpilot")} className="px-7 py-3.5 rounded-md btn-gold font-medium">
            Meet EventPilot AI
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EVENTPILOT AI ----------------------------- */
type ChatMsg = { role: "user" | "assistant"; text: string };

function EventPilotSection() {
  const capabilities = [
    "Budget Planning", "Budget Tracking", "Vendor Coordination", "Vendor Selection",
    "Venue Selection", "Guest Management", "Logistics Planning", "Event Scheduling",
    "Timeline Creation", "Team Management", "Risk Management", "Event Marketing",
    "Contract Evaluation", "Event Automation",
  ];
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", text: "Hi! I'm EventPilot AI ✨ — your 24/7 event planning copilot. Ask me about budgets, vendors, venues, timelines or guest management." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: q }]);
    setBusy(true);
    // Local canned response — connect Lovable Cloud + AI Gateway to enable real responses
    await new Promise(r => setTimeout(r, 700));
    const reply =
`✅ Recommendation
Here's a starting point based on your question. Connect Lovable Cloud to unlock live AI answers powered by our event-trained model.

📌 Key Points
• Define your event scope, guest count and budget range
• Shortlist 3 vendors per category for comparison
• Lock the timeline 6–8 weeks before event date

🎯 Next Step
Enable Lovable Cloud so EventPilot AI can deliver real-time, expert event guidance.`;
    setMessages(m => [...m, { role: "assistant", text: reply }]);
    setBusy(false);
  };

  return (
    <section className="section-pad fade-in" style={{ background: "linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">EventPilot AI</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-4">
            Meet <span className="gold-text">EventPilot AI</span>
          </h2>
          <p className="text-muted-foreground text-lg">24/7 AI assistant built for Event Professionals.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl mb-5">Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map(c => (
                <span key={c} className="px-4 py-2 rounded-full glass text-sm">{c}</span>
              ))}
            </div>
            <div className="mt-8 glass rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                Trained on event-industry workflows. Provides crisp, actionable answers in seconds —
                budgets, vendors, venues, logistics and more.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-[600px]" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="px-6 py-4 flex items-center gap-3 border-b border-border bg-surface">
                <div className="w-10 h-10 rounded-full btn-gold grid place-items-center font-display">EP</div>
                <div>
                  <div className="font-display text-lg">EventPilot AI</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Online · responds in seconds
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-foreground text-background rounded-br-sm"
                        : "bg-surface text-foreground rounded-bl-sm border border-border"
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className="flex justify-start">
                    <div className="bg-surface border border-border rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                      EventPilot is thinking…
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
              <div className="border-t border-border p-4 flex gap-2 bg-card">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") send(); }}
                  placeholder="Ask about budgets, vendors, venues, timelines…"
                  className="flex-1 px-4 py-3 rounded-md bg-surface border border-border outline-none focus:border-primary text-sm"
                />
                <button onClick={send} disabled={busy} className="px-6 py-3 rounded-md btn-gold text-sm font-medium disabled:opacity-50">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EVENT TYPES ----------------------------- */
function EventTypesSection({ onNav }: { onNav: (id: TabId) => void }) {
  const cards = useMemo(() => ([
    { img: heroWedding, title: "Wedding", desc: "End-to-end planning for unforgettable weddings." },
    { img: heroLuxuryWedding, title: "Luxury Wedding", desc: "White-glove coordination for high-end celebrations." },
    { img: heroBirthday, title: "Birthday Party", desc: "From intimate dinners to milestone galas." },
    { img: heroBabyShower, title: "Baby Shower", desc: "Elegant, modern showers planned in minutes." },
    { img: heroAnniversary, title: "Anniversary", desc: "Romantic anniversary experiences, curated." },
    { img: heroCorporate, title: "Corporate Event", desc: "Conferences, galas and brand activations at scale." },
  ]), []);
  return (
    <section className="section-pad fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Event Types</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-4">
            Built for every <span className="gold-text">occasion</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From intimate gatherings to global corporate productions, APEX AI scales with your studio.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {cards.map(c => (
            <article key={c.title} className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/60 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 font-display text-2xl text-white">{c.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-5">{c.desc}</p>
                <button onClick={() => onNav("contact")} className="text-sm font-medium text-primary hover:translate-x-1 inline-flex items-center gap-2 transition-transform">
                  Plan with APEX AI →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PRICING ----------------------------- */
function PricingSection({ onNav }: { onNav: (id: TabId) => void }) {
  const plans = [
    { name: "Starter", price: "$30", per: "/month", popular: false,
      features: ["AI Assistant", "Budget Tracking", "Vendor Management", "Basic Reports"], cta: "Subscribe" },
    { name: "Professional", price: "$40", per: "/month", popular: true,
      features: ["Everything in Starter", "Unlimited Events", "Advanced Analytics", "Premium Support"], cta: "Subscribe" },
    { name: "Enterprise", price: "Custom", per: "Pricing", popular: false,
      features: ["Multi-Team Access", "API Integration", "Dedicated Account Manager", "Custom SLAs"], cta: "Contact Sales" },
  ];
  return (
    <section className="section-pad fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Pricing</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-4">
            Simple, <span className="gold-text">premium pricing</span>
          </h2>
          <p className="text-muted-foreground">Choose the plan that fits your studio. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {plans.map(p => (
            <div key={p.name}
              className={`relative rounded-2xl p-8 border transition-all ${p.popular ? "border-primary bg-card scale-[1.02]" : "border-border bg-card hover:border-primary/60"}`}
              style={{ boxShadow: p.popular ? "var(--shadow-elegant)" : "var(--shadow-card)" }}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs btn-gold font-medium">
                  Most Popular
                </span>
              )}
              <div className="text-sm tracking-[0.25em] uppercase text-primary mb-3">{p.name}</div>
              <div className="font-display text-5xl mb-1">{p.price}</div>
              <div className="text-sm text-muted-foreground mb-7">{p.per}</div>
              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNav("contact")}
                className={`w-full py-3 rounded-md font-medium ${p.popular ? "btn-gold" : "btn-outline-gold"}`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function ContactSection() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <section className="section-pad fade-in">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Contact</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-5">
            Let's plan your next <span className="gold-text">signature event</span>.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Reach our team for demos, partnerships and enterprise inquiries. We respond within one business day.
          </p>
          <div className="space-y-4 text-sm">
            <div><div className="text-muted-foreground">Email</div><div className="font-medium">hello@apexai.events</div></div>
            <div><div className="text-muted-foreground">Phone</div><div className="font-medium">+1 (415) 555-0184</div></div>
            <div><div className="text-muted-foreground">Serving</div><div className="font-medium">USA · Canada · UK · UAE · Australia · Worldwide</div></div>
          </div>
        </div>
        <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">✨</div>
              <h3 className="font-display text-2xl mb-2">Thank you</h3>
              <p className="text-muted-foreground">Our team will be in touch shortly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" name="name" required />
              <Input label="Company Name" name="company" />
              <Input label="Email" type="email" name="email" required />
              <Input label="Phone" name="phone" />
              <Input label="Country" name="country" />
              <Input label="Event Type" name="eventType" />
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea name="message" rows={4} required
                  className="mt-1.5 w-full px-4 py-3 rounded-md bg-surface border border-border focus:border-primary outline-none text-sm" />
              </div>
              <button type="submit" className="px-6 py-3 rounded-md btn-gold font-medium">Submit Inquiry</button>
              <button type="button" className="px-6 py-3 rounded-md btn-outline-gold font-medium">Schedule Demo</button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input {...props}
        className="mt-1.5 w-full px-4 py-3 rounded-md bg-surface border border-border focus:border-primary outline-none text-sm" />
    </div>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer({ onNav }: { onNav: (id: TabId) => void }) {
  return (
    <footer className="bg-dark text-white/80 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-lg btn-gold grid place-items-center font-display text-lg text-foreground">A</span>
            <span className="font-display text-xl text-white">APEX <span className="gold-text">AI</span></span>
          </div>
          <p className="text-sm text-white/60">AI-powered event planning platform for modern event professionals worldwide.</p>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map(n => (
              <li key={n.id}><button onClick={() => onNav(n.id)} className="hover:text-primary transition-colors">{n.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Budget Management</li>
            <li>Vendor Coordination</li>
            <li>Guest Management</li>
            <li>Venue Intelligence</li>
            <li>EventPilot AI</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>hello@apexai.events</li>
            <li>+1 (415) 555-0184</li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">Instagram</a>
              <a href="#" className="hover:text-primary">X</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© 2026 Apex AI. All Rights Reserved.</span>
          <span>Designed for event professionals worldwide.</span>
        </div>
      </div>
    </footer>
  );
}
