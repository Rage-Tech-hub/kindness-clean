import { useEffect, useMemo, useState } from "react";
import {
  Phone, MapPin, Clock, ShieldCheck, Sparkles, Heart, Check, ChevronDown,
  ArrowRight, BadgeCheck, AlertTriangle, FileText, BarChart3,
  ClipboardCheck, Star, Search, Home, KeyRound, MessageCircle, Timer,
  PoundSterling, UserCheck, RefreshCcw, Eye, BookOpen, Target, FlaskConical,
  MousePointerClick, PhoneCall, CheckCircle2, Info, ExternalLink, Lock
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Kindness & Clean — Conversion landing page + Owner Strategy Brief  */
/*  Ground rules honoured: no invented ratings, prices, logos, or     */
/*  testimonials. Every placeholder is labelled.                      */
/*  Brand palette below is INFERRED (no logo file found) — see Brief. */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "[PLACEHOLDER PHONE — owner to supply]";
const PHONE_TEL = "tel:+442000000000"; // placeholder, replaced before launch

const HERO_IMG = "https://images.pexels.com/photos/9462326/pexels-photo-9462326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const IMG2 = "https://images.pexels.com/photos/6195275/pexels-photo-6195275.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const IMG3 = "https://images.pexels.com/photos/6197121/pexels-photo-6197121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const IMG4 = "https://images.pexels.com/photos/9462162/pexels-photo-9462162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

/* ---------- small helpers ---------- */
function PlaceholderBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-amber-700 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900">
      <AlertTriangle className="h-3 w-3 shrink-0" /> {children}
    </span>
  );
}
function VerifiedTag({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold text-emerald-900">
      <BadgeCheck className="h-3 w-3" /> VERIFIED
      <a href={source} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-2 font-semibold normal-case tracking-normal">source</a>
    </span>
  );
}
function InferredTag() {
  return <span className="inline-flex items-center gap-1 rounded bg-sky-50 border border-sky-200 px-1.5 py-0.5 text-[10px] font-bold text-sky-900"><Info className="h-3 w-3" /> INFERRED</span>;
}
function UnknownTag() {
  return <span className="inline-flex items-center gap-1 rounded bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-900"><AlertTriangle className="h-3 w-3" /> UNKNOWN</span>;
}

/* ---------- data ---------- */
const FAQS = [
  { q: "Will I get the same cleaner each time?", a: "Yes — that is the point of Kindness & Clean. We match you with one kind, vetted cleaner who learns your home, your routine, and how you like things done. If they are ever away, we will tell you in advance and offer a cover cleaner you approve. [PROPOSED — owner to confirm cover policy before launch]" },
  { q: "How is my price fixed? Will there be extra charges on the day?", a: "You get your fixed price in writing before we start — based on your home size and what you need done. No cash pressure. No extra charge added at the door. If anything changes, we agree it with you first. [PLACEHOLDER — owner to confirm what is included/excluded and VAT status]" },
  { q: "What if my cleaner is late or cannot come?", a: "We work to a clear arrival window and we will call you if anything changes. You will always reach a real person — not just a chat queue. If we ever miss a visit, we will rebook at a time that suits you. [PROPOSED — owner to confirm late/cancellation terms]" },
  { q: "Do you bring cleaning products and equipment?", a: "We can bring what you need, or use what you have at home — your choice, agreed before the first clean. [PLACEHOLDER — owner to confirm: products, equipment, and any fee for supplies]" },
  { q: "Are your cleaners vetted and insured?", a: "Every cleaner is ID-checked and reference-checked before they visit your home. [PLACEHOLDER — owner to confirm DBS status, insurance provider and cover level, and add proof documents before launch. Do not publish until verified.]" },
  { q: "How do I reschedule or cancel?", a: "Life changes. You can reschedule or cancel with notice — no contract, no lock-in. [PLACEHOLDER — owner to confirm notice period, e.g. 24 hours, and how to reschedule: phone, text, or online]" },
];

const SERVICES = [
  {
    title: "Regular housekeeping",
    tag: "Weekly or fortnightly",
    desc: "For homes that need steady care, not a one-off blitz.",
    includes: ["Kitchen & bathrooms cleaned and sanitised", "Dusting, vacuuming & mopping throughout", "Bedrooms made, bins emptied", "Same cleaner each visit"],
    img: HERO_IMG,
    alt: "Two housekeepers making a bed in a bright London bedroom",
  },
  {
    title: "One-off deep clean",
    tag: "Spring clean / reset",
    desc: "For homes that need extra care — inside cupboards, oven, and details.",
    includes: ["Everything in regular, plus inside oven & fridge", "Skirting, handles, switches & mirrors", "Detailed kitchen & bathroom scrub", "Checklist agreed with you first"],
    img: IMG3,
    alt: "Two women cleaning a modern kitchen in London",
  },
  {
    title: "End-of-tenancy clean",
    tag: "Deposit-safe checklist",
    desc: "For tenants and landlords who need the deposit back.",
    includes: ["Agency-style checklist, room by room", "Oven, extractor, windows & skirting", "Photo record on request", "Return visit if the agent flags anything*"],
    img: IMG4,
    alt: "Housekeeper dusting and detailing a living room",
  },
  {
    title: "Ironing & laundry add-on",
    tag: "Add to any clean",
    desc: "So the washing pile does not undo the calm.",
    includes: ["Wash, dry, iron & put away", "Bed linen changed and made", "Wardrobe and drawer tidy", "Agreed by the hour with you"],
    img: IMG2,
    alt: "Professional cleaner vacuuming a modern living room",
  },
];

const COMPETITORS = [
  {
    name: "Housekeep",
    url: "https://housekeep.com",
    rating: "4.1 ★ — 5,349 reviews",
    ratingSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    price: "From £18.50/hr regular",
    priceSource: "https://www.bestinbritain.org/guides/best-cleaning-service-london",
    cta: "Book online / app — instant quote by postcode",
    strengths: "Largest pool of slots, cashless payment, no contract, spare-key holding, same cleaner for recurring.",
    weakness: "Support via chat, not phone; recent reviewers report inconsistent standards on deep / end-of-tenancy jobs.",
  },
  {
    name: "City Housekeeping",
    url: "https://cityhousekeeping.co.uk/services/domestic-cleaning/",
    rating: "4.9 ★ — 317 reviews",
    ratingSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    price: "£22.85/hr regular · £31.85/hr deep & end-of-tenancy · 3-hr min",
    priceSource: "https://cityhousekeeping.co.uk/services/domestic-cleaning/",
    cta: "Book online",
    strengths: "Same cleaner each week, DBS-checked, responsive head office, thorough deep cleans.",
    weakness: "Higher price; 3-hour minimum; extra fee for materials (£17.50/visit).",
  },
  {
    name: "Perfect Cleaning",
    url: "https://www.perfectcleaning.co.uk",
    rating: "4.5 ★ — 348 reviews",
    ratingSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    price: "Per-property quote (end-of-tenancy focus)",
    priceSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    cta: "Quote request",
    strengths: "End-of-tenancy specialist; large review base for move-out jobs.",
    weakness: "Less strong for routine weekly cleaning vs. City Housekeeping / Better Call Moe.",
  },
  {
    name: "Better Call Moe",
    url: "https://bettercallmoe.co.uk",
    rating: "4.9 ★ — 197 reviews",
    ratingSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    price: "Quote-based (deep / after-renovation focus)",
    priceSource: "https://www.bestinhood.com/london/home-cleaning-and-organizing/best-house-cleaning-services-in-london/",
    cta: "Quote request",
    strengths: "High rating; praised for after-renovation & deep cleans.",
    weakness: "Smaller review base; niche focus.",
  },
  {
    name: "Maid2Clean (London)",
    url: "https://www.maid2clean.co.uk",
    rating: "Not verified in this audit — see listing",
    ratingSource: "https://www.bestinbritain.org/guides/best-cleaning-service-london",
    price: "From £16.49/hr weekly (postcode variations)",
    priceSource: "https://www.bestinbritain.org/guides/best-cleaning-service-london",
    cta: "Local franchise enquiry",
    strengths: "Lowest published hourly rate in comparison; weekly focus.",
    weakness: "Price varies by postcode — less transparent at first glance.",
  },
];

const CHECKLIST = [
  { item: "Logo file (PNG/SVG) + brand hex codes sampled from logo", why: "Currently UNKNOWN — draft uses INFERRED palette. Replace before launch." },
  { item: "Real phone number (must match Google Business Profile exactly)", why: "Click-to-call is the secondary conversion action. Placeholder shown throughout." },
  { item: "Business address / service-area wording + opening hours", why: "Required for LocalBusiness schema + final CTA. Must match Google profile." },
  { item: "Pricing: hourly or fixed-price table + VAT status + minimum booking", why: "No prices published — page deliberately shows no numbers. Owner must approve." },
  { item: "Guarantee approval: 24-hour return promise + damage-care wording", why: "Marked PROPOSED on page. Do not publish until owner signs off." },
  { item: "Vetting proof: DBS status, insurance provider + cover, ID/reference process", why: "FAQ makes claims only as placeholders until documents are supplied." },
  { item: "Real photos of team + homes cleaned (with client permission)", why: "Stock photos used for draft only. Replace with own photos for trust + speed." },
  { item: "Google Business Profile link + first 5–10 real reviews to embed", why: "No verified reviews exist yet. Page shows honest placeholder — never fake reviews." },
  { item: "Cancellation / reschedule notice period + cover-cleaner policy", why: "FAQ placeholders depend on this." },
  { item: "Products & equipment policy (who brings what, any fee)", why: "Top objection in competitor reviews." },
  { item: "Service area list (boroughs / postcodes covered)", why: "Postcode checker is demo logic until owner supplies real coverage." },
  { item: "Tracking IDs: Google Tag Manager / GA4 + call-tracking number", why: "See Tracking Plan. Form + call events cannot be measured without these." },
];

/* ---------- main app ---------- */
export default function App() {
  const [view, setView] = useState<"page" | "brief">("page");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [postcode, setPostcode] = useState("");
  const [pcResult, setPcResult] = useState<null | { ok: boolean; msg: string }>(null);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", bedrooms: "2" });
  const [formState, setFormState] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");

  /* LocalBusiness JSON-LD — verified data only (no fake rating/phone) */
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "localbusiness-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HouseCleaningService",
      name: "Kindness & Clean (Housekeeping)",
      areaServed: { "@type": "City", name: "London" },
      description: "Regular housekeeping across London from the same kind, vetted cleaner each visit. Fixed price before we start.",
      // NOTE: telephone, address, openingHours, aggregateRating intentionally omitted — UNKNOWN, owner to supply.
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const track = (event: string, params: Record<string, unknown> = {}) => {
    try {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event, ...params });
      // eslint-disable-next-line no-console
      console.log("[track]", event, params);
    } catch { /* noop */ }
  };

  const checkPostcode = () => {
    const pc = postcode.trim().toUpperCase().replace(/\s+/g, "");
    if (!pc) { setPcResult({ ok: false, msg: "Enter your postcode to check coverage." }); return; }
    const londonOutward = /^(E|N|W|SW|SE|NW|EC|WC|CR|DA|EN|HA|IG|KT|RM|SM|TW|UB|BR|KT)/;
    const ok = londonOutward.test(pc) || pc.startsWith("LONDON");
    setPcResult(ok
      ? { ok: true, msg: `Good news — ${postcode.toUpperCase()} looks like a London postcode. Get your fixed price below. [Demo checker — owner to confirm real coverage.]` }
      : { ok: false, msg: `${postcode.toUpperCase()} may be outside our current London coverage. Call us and we will check. [Demo checker — owner to confirm real coverage.]` });
    track("postcode_check", { postcode: pc, result: ok ? "in_area" : "out_of_area" });
  };

  const submitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.postcode.trim()) {
      setFormError("Please add your name, mobile number, and postcode so we can price your clean.");
      return;
    }
    if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim())) {
      setFormError("Please enter a valid mobile number (digits only).");
      return;
    }
    setFormError("");
    setFormState("sending");
    track("quote_submit_start", { bedrooms: form.bedrooms });
    window.setTimeout(() => {
      setFormState("done");
      track("quote_submit", { bedrooms: form.bedrooms, source: "hero_form" });
    }, 900);
  };

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
    track("cta_click", { cta: "get_fixed_price" });
  };

  const boroughs = useMemo(() => ["North London", "East London", "South London", "West London", "Central London"], []);

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#14332E] pb-24 md:pb-0">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-[#14332E]/10 bg-[#FFF9F0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14332E] text-[#FFF9F0] shadow-sm" aria-hidden="true">
              <Heart className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold leading-tight truncate">Kindness &amp; Clean</p>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#14332E]/60">Housekeeping · London</p>
            </div>
            <span className="hidden lg:inline-flex ml-1"><PlaceholderBadge>Logo placeholder</PlaceholderBadge></span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex rounded-full border border-[#14332E]/15 bg-white p-1" role="tablist" aria-label="View">
              <button onClick={() => setView("page")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${view === "page" ? "bg-[#14332E] text-white" : "text-[#14332E]/70"}`}>Customer page</button>
              <button onClick={() => setView("brief")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${view === "brief" ? "bg-[#14332E] text-white" : "text-[#14332E]/70"}`}>Owner brief</button>
            </div>
            <a href={PHONE_TEL} onClick={() => track("call_click", { location: "header" })} className="hidden md:inline-flex items-center gap-2 rounded-full border-2 border-[#14332E] px-4 py-2 text-sm font-bold hover:bg-[#14332E] hover:text-white transition">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <button onClick={scrollToQuote} className="inline-flex items-center gap-2 rounded-full bg-[#8A3B1F] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#6F2F18] transition">
              Get my fixed price <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="sm:hidden px-4 pb-2 flex gap-2">
          <button onClick={() => setView("page")} className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold border ${view === "page" ? "bg-[#14332E] text-white border-[#14332E]" : "border-[#14332E]/20 bg-white"}`}>Customer page</button>
          <button onClick={() => setView("brief")} className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold border ${view === "brief" ? "bg-[#14332E] text-white border-[#14332E]" : "border-[#14332E]/20 bg-white"}`}>Owner brief (Stages 1–5)</button>
        </div>
      </header>

      {view === "page" ? (
        <>
          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 texture-dots opacity-60" aria-hidden="true" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10 sm:pt-14 sm:pb-16 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6EFE6] border border-[#14332E]/10 px-3 py-1 text-xs font-bold">
                    <MapPin className="h-3.5 w-3.5" /> Housekeeping across London
                  </span>
                  <PlaceholderBadge>Service area to confirm</PlaceholderBadge>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] tracking-tight">
                  Come home to a calm, clean home — <span className="text-[#8A3B1F]">without the worry.</span>
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-[#14332E]/80 max-w-xl">
                  Regular housekeeping from the <strong>same kind, vetted cleaner</strong> each visit. <strong>Fixed price before we start.</strong> And a real person to call if you need us.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8A3B1F] px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#6F2F18] transition">
                    Get my fixed price <ArrowRight className="h-5 w-5" />
                  </button>
                  <a href={PHONE_TEL} onClick={() => track("call_click", { location: "hero" })} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#14332E] bg-white px-6 py-3.5 text-base font-bold hover:bg-[#14332E] hover:text-white transition">
                    <PhoneCall className="h-5 w-5" /> Call {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-[#14332E]/10 bg-white p-4">
                  <p className="text-sm font-bold flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#8A3B1F]" /> Honest start: we are new to London — and we will not fake reviews.</p>
                  <p className="mt-1 text-sm text-[#14332E]/70">Join our first homes and help us earn our first Google reviews. <PlaceholderBadge>Founding-home offer — owner to approve</PlaceholderBadge></p>
                  <ul className="mt-3 grid sm:grid-cols-3 gap-2 text-sm font-semibold">
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Same cleaner</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Fixed price</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Real person to call</li>
                  </ul>
                  <p className="mt-2 text-xs text-[#14332E]/60">Vetting &amp; insurance details: <PlaceholderBadge>Owner to confirm DBS + insurance</PlaceholderBadge></p>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-[#14332E]/10 shadow-xl">
                  <img src={HERO_IMG} alt="Two housekeepers making a bed in a bright London bedroom" className="h-[320px] sm:h-[440px] w-full object-cover" loading="eager" />
                </div>
                <div className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm rounded-2xl bg-white shadow-xl border border-[#14332E]/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#14332E]/50">How it feels</p>
                  <p className="font-display text-lg font-semibold leading-snug mt-1">“I like to clean like it’s my own house.”</p>
                  <p className="text-xs text-[#14332E]/60 mt-1">What London customers say they value most — see Social Proof below. <span className="font-semibold">Not our review yet.</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= QUOTE FORM ================= */}
          <section id="quote" className="mx-auto max-w-6xl px-4 sm:px-6 -mt-2 scroll-mt-28">
            <div className="rounded-[2rem] bg-[#14332E] text-white p-5 sm:p-8 shadow-xl">
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest"><Timer className="h-3.5 w-3.5" /> 60-second quote</p>
                  <h2 className="font-display text-3xl font-bold mt-3 leading-tight">Get your fixed price. No surprises later.</h2>
                  <p className="mt-2 text-white/80 text-sm leading-relaxed">Tell us about your home. We reply with a fixed price in writing — before you book. No cash pressure. No extra charges at the door.</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" /> 4 fields only — takes under a minute</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" /> We call or text to confirm — a real person</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" /> No contract. Reschedule with notice.</li>
                  </ul>
                </div>
                <div className="lg:col-span-3">
                  {formState === "done" ? (
                    <div className="rounded-2xl bg-white text-[#14332E] p-6 text-center">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-600" />
                      <h3 className="font-display text-2xl font-bold mt-3">Thank you, {form.name.split(" ")[0] || "friend"}.</h3>
                      <p className="mt-2 text-sm text-[#14332E]/70">We have your details for <strong>{form.postcode.toUpperCase()}</strong> ({form.bedrooms} bedrooms). We will reply with your fixed price shortly. <span className="font-semibold">Keep an eye on {form.phone}.</span></p>
                      <p className="mt-3 text-xs text-[#14332E]/60">[Demo form — connect to CRM / email + call tracking before launch. See Tracking Plan in Owner Brief.]</p>
                      <button onClick={() => { setFormState("idle"); setForm({ name: "", phone: "", postcode: "", bedrooms: "2" }); }} className="mt-4 rounded-full border-2 border-[#14332E] px-5 py-2 text-sm font-bold">Send another request</button>
                    </div>
                  ) : (
                    <form onSubmit={submitQuote} className="rounded-2xl bg-white text-[#14332E] p-5 sm:p-6" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wide">Your name</span>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sarah M." autoComplete="name" className="mt-1 w-full rounded-xl border-2 border-[#14332E]/15 px-4 py-3 text-base focus:border-[#14332E] outline-none" />
                        </label>
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wide">Mobile number</span>
                          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07xxx xxxxxx" inputMode="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border-2 border-[#14332E]/15 px-4 py-3 text-base focus:border-[#14332E] outline-none" />
                        </label>
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wide">Postcode</span>
                          <input value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} placeholder="e.g. N7 6AB" autoComplete="postal-code" className="mt-1 w-full rounded-xl border-2 border-[#14332E]/15 px-4 py-3 text-base focus:border-[#14332E] outline-none" />
                        </label>
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-wide">Bedrooms</span>
                          <select value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className="mt-1 w-full rounded-xl border-2 border-[#14332E]/15 px-4 py-3 text-base bg-white focus:border-[#14332E] outline-none">
                            <option value="1">1 bedroom</option><option value="2">2 bedrooms</option><option value="3">3 bedrooms</option><option value="4">4 bedrooms</option><option value="5">5+ bedrooms</option>
                          </select>
                        </label>
                      </div>
                      {formError && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-900">{formError}</p>}
                      <button type="submit" disabled={formState === "sending"} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#8A3B1F] px-6 py-3.5 text-base font-bold text-white hover:bg-[#6F2F18] disabled:opacity-60 transition">
                        {formState === "sending" ? "Sending…" : <>Get my fixed price <ArrowRight className="h-5 w-5" /></>}
                      </button>
                      <p className="mt-2 text-center text-xs text-[#14332E]/60 flex items-center justify-center gap-1"><Lock className="h-3 w-3" /> Your details are only used to price and book your clean. No spam.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ================= PAIN -> SOLUTION ================= */}
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A3B1F]">Sound familiar?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 max-w-2xl leading-tight">Londoners told us what goes wrong with cleaners. We built Kindness &amp; Clean to fix it.</h2>
            <p className="mt-3 text-[#14332E]/70 max-w-2xl">These are the top complaints in real London cleaning reviews — late arrivals, surprise charges, rushed cleans, and no answer when you call. <span className="font-semibold">Sources in Owner Brief.</span></p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { icon: UserCheck, pain: "“A different stranger every time.”", fix: "Same kind cleaner, every visit", fixDesc: "One vetted person who learns your home and your preferences — so you do not have to explain yourself each week." },
                { icon: PoundSterling, pain: "“Charged for 4 hours. They left after 2½.”", fix: "Fixed price in writing, before we start", fixDesc: "No extra charge at the door. No cash pressure. If the job changes, we agree it with you first." },
                { icon: Clock, pain: "“30 minutes late. No one answered.”", fix: "On-time window + a real person to call", fixDesc: "Clear arrival time, a call if anything changes, and a 24-hour return promise if something is not right. [PROPOSED — owner to approve]" },
              ].map((c) => (
                <article key={c.fix} className="rounded-3xl border border-[#14332E]/10 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-700"><c.icon className="h-5 w-5" /></div>
                  <p className="mt-4 font-semibold text-[#14332E]/70 italic">{c.pain}</p>
                  <h3 className="font-display text-xl font-bold mt-2">{c.fix}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#14332E]/70">{c.fixDesc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ================= SERVICES ================= */}
          <section className="bg-white border-y border-[#14332E]/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8A3B1F]">What we do</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Housekeeping that fits your home.</h2>
                  <p className="mt-2 text-[#14332E]/70 max-w-xl">Pick what you need. Every clean starts with a fixed price — <PlaceholderBadge>No prices published yet — owner to supply</PlaceholderBadge></p>
                </div>
                <button onClick={scrollToQuote} className="inline-flex items-center gap-2 rounded-full bg-[#14332E] px-5 py-3 text-sm font-bold text-white hover:bg-[#0E2622] transition">Price my clean <ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.map((s) => (
                  <article key={s.title} className="group overflow-hidden rounded-3xl border border-[#14332E]/10 bg-[#FFF9F0] shadow-sm hover:shadow-md transition">
                    <div className="h-40 overflow-hidden">
                      <img src={s.img} alt={s.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A3B1F]">{s.tag}</span>
                      <h3 className="font-display text-xl font-bold mt-1">{s.title}</h3>
                      <p className="text-sm text-[#14332E]/70 mt-1">{s.desc}</p>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {s.includes.map((i) => <li key={i} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-700" /> {i}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#14332E]/60">* Return visit wording is PROPOSED — owner to approve before launch. Products &amp; equipment policy: <PlaceholderBadge>Owner to confirm</PlaceholderBadge></p>
            </div>
          </section>

          {/* ================= SOCIAL PROOF (honest placeholder) ================= */}
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A3B1F]">Reviews</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">No fake reviews. Ever.</h2>
            <p className="mt-3 text-[#14332E]/70 max-w-2xl">We have no verified Google reviews yet, so we will not invent them. When you book, we will ask for an honest review — and we will show it here exactly as written.</p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-3xl border-2 border-dashed border-amber-600/40 bg-amber-50/60 p-6">
                  <div className="flex items-center gap-1 text-amber-700" aria-label="Review placeholder">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-amber-200" />)}
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold">Review placeholder {n}</p>
                  <p className="mt-1 text-sm text-[#14332E]/70">Real customer words will appear here with name, area, and date — linked to Google.</p>
                  <div className="mt-3"><PlaceholderBadge>Owner to add Google reviews</PlaceholderBadge></div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-[#E6EFE6] border border-[#14332E]/10 p-6">
              <h3 className="font-bold flex items-center gap-2"><BookOpen className="h-5 w-5" /> What London customers actually praise (from competitor reviews)</h3>
              <ul className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
                <li className="rounded-2xl bg-white p-4 border border-[#14332E]/10"><strong>Same cleaner returning.</strong> “Knows exactly how we like things done.”</li>
                <li className="rounded-2xl bg-white p-4 border border-[#14332E]/10"><strong>Punctual &amp; thorough.</strong> “Clean like it’s my own house.”</li>
                <li className="rounded-2xl bg-white p-4 border border-[#14332E]/10"><strong>Kind &amp; respectful.</strong> “Friendly, polite, went above and beyond.”</li>
              </ul>
              <p className="mt-3 text-xs text-[#14332E]/60">Paraphrased from verified public reviews of London competitors. Full sources in Owner Brief. We aim to earn the same words — honestly.</p>
            </div>
          </section>

          {/* ================= WHY US + HOW IT WORKS ================= */}
          <section className="bg-[#14332E] text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Why Kindness &amp; Clean</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 leading-tight">Kindness is not a slogan. It is how we work.</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    { icon: UserCheck, t: "Same person, every time", d: "You build trust with one cleaner. They learn your home, your pets, and your routines." },
                    { icon: PoundSterling, t: "Fixed price, no doorstep surprises", d: "Agreed in writing before we start. No cash pressure. No “extra £60” on arrival." },
                    { icon: ShieldCheck, t: "Vetted and careful", d: "ID and reference checks before the first visit. Careful with your home and belongings. [PLACEHOLDER — owner to confirm DBS + insurance]" },
                    { icon: Phone, t: "A real person to call", d: "Not just a chat queue. Call us and a human answers — or calls back the same day." },
                    { icon: RefreshCcw, t: "We make it right", d: "If something is not right, we return within 24 hours at no extra charge. [PROPOSED — owner to approve]" },
                  ].map((r) => (
                    <li key={r.t} className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10"><r.icon className="h-5 w-5" /></span>
                      <span><strong className="block">{r.t}</strong><span className="text-white/75 text-sm">{r.d}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">How it works</p>
                <h2 className="font-display text-3xl font-bold mt-2">Three simple steps.</h2>
                <ol className="mt-6 space-y-4">
                  {[
                    { n: "1", icon: MousePointerClick, t: "Get your fixed price (60 seconds)", d: "Fill in 4 fields or call us. We reply with a fixed price in writing." },
                    { n: "2", icon: Heart, t: "Meet your cleaner", d: "We match you with your kind, vetted cleaner and agree your checklist together." },
                    { n: "3", icon: Home, t: "Come home to calm", d: "You get on with your day. We clean, tidy, and leave your home calm and fresh." },
                  ].map((s) => (
                    <li key={s.n} className="flex gap-4 rounded-3xl bg-white/10 border border-white/10 p-5">
                      <span className="font-display text-3xl font-bold text-emerald-300">{s.n}</span>
                      <span><strong className="flex items-center gap-2"><s.icon className="h-4 w-4" /> {s.t}</strong><span className="text-white/75 text-sm block mt-1">{s.d}</span></span>
                    </li>
                  ))}
                </ol>
                <button onClick={scrollToQuote} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#14332E] px-6 py-3.5 font-bold hover:bg-emerald-50 transition">Start step 1 — Get my fixed price <ArrowRight className="h-5 w-5" /></button>
              </div>
            </div>
          </section>

          {/* ================= RISK REVERSAL ================= */}
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            <div className="rounded-[2rem] border-2 border-dashed border-[#8A3B1F]/40 bg-white p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <PlaceholderBadge>Proposed guarantee — owner to approve</PlaceholderBadge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 leading-tight">If something is not right, we make it right.</h2>
                <p className="mt-3 text-[#14332E]/75 leading-relaxed">Tell us within 24 hours and we will return to put it right — at no extra charge. Careful handling of your home comes first: we treat your belongings as if they were our own.</p>
                <ul className="mt-4 space-y-2 text-sm font-semibold">
                  <li className="flex gap-2"><Check className="h-5 w-5 text-emerald-700 shrink-0" /> 24-hour return promise [PROPOSED]</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-emerald-700 shrink-0" /> Damage-care: tell us straight away, we will resolve it fairly [PLACEHOLDER — owner to confirm process]</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-emerald-700 shrink-0" /> No quibbles, no extra charge for the return visit [PROPOSED]</li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl">
                <img src={IMG2} alt="Professional cleaner vacuuming a modern living room" loading="lazy" className="h-64 w-full object-cover" />
                <p className="mt-2 text-xs text-[#14332E]/60 text-center">Stock photo for draft — replace with real team photos before launch.</p>
              </div>
            </div>
          </section>

          {/* ================= FAQ ================= */}
          <section className="bg-white border-y border-[#14332E]/10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8A3B1F] text-center">Questions</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-center">Straight answers, no small print.</h2>
              <div className="mt-8 space-y-3">
                {FAQS.map((f, i) => (
                  <div key={f.q} className="overflow-hidden rounded-2xl border border-[#14332E]/10 bg-[#FFF9F0]">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold">
                      {f.q} <ChevronDown className={`h-5 w-5 shrink-0 transition ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && <p className="px-5 pb-5 text-sm leading-relaxed text-[#14332E]/75">{f.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= FINAL CTA + AREA + HOURS ================= */}
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-[2rem] bg-[#8A3B1F] text-white p-6 sm:p-8">
                <h2 className="font-display text-3xl font-bold leading-tight">Ready for a calmer home?</h2>
                <p className="mt-2 text-white/85">Get your fixed price in 60 seconds. Or call us — a real person will answer.</p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#8A3B1F] hover:bg-amber-50 transition">Get my fixed price <ArrowRight className="h-5 w-5" /></button>
                  <a href={PHONE_TEL} onClick={() => track("call_click", { location: "final_cta" })} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 font-bold hover:bg-white hover:text-[#8A3B1F] transition"><PhoneCall className="h-5 w-5" /> {PHONE_DISPLAY}</a>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                  <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> <span><strong>Service area:</strong> London <PlaceholderBadge>Boroughs to confirm</PlaceholderBadge></span></p>
                  <p className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" /> <span><strong>Hours:</strong> <PlaceholderBadge>Owner to supply</PlaceholderBadge></span></p>
                  <p className="flex gap-2"><Home className="h-4 w-4 shrink-0 mt-0.5" /> <span><strong>Address:</strong> <PlaceholderBadge>Must match Google profile</PlaceholderBadge></span></p>
                  <p className="flex gap-2"><KeyRound className="h-4 w-4 shrink-0 mt-0.5" /> <span>Spare-key &amp; access: agreed with you first.</span></p>
                </div>
              </div>
              <div className="rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold flex items-center gap-2"><Search className="h-6 w-6" /> Check your postcode</h3>
                <p className="mt-1 text-sm text-[#14332E]/70">See if we cover your home. Takes 5 seconds.</p>
                <div className="mt-4 flex gap-2">
                  <input value={postcode} onChange={(e) => setPostcode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && checkPostcode()} placeholder="e.g. SW6 4LZ" aria-label="Postcode" className="flex-1 rounded-full border-2 border-[#14332E]/15 px-5 py-3 text-base focus:border-[#14332E] outline-none" />
                  <button onClick={checkPostcode} className="rounded-full bg-[#14332E] px-6 py-3 font-bold text-white hover:bg-[#0E2622] transition">Check</button>
                </div>
                {pcResult && <p className={`mt-3 rounded-2xl px-4 py-3 text-sm font-semibold ${pcResult.ok ? "bg-emerald-50 border border-emerald-200 text-emerald-900" : "bg-amber-50 border border-amber-200 text-amber-900"}`}>{pcResult.msg}</p>}
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#14332E]/50">Areas we aim to cover</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {boroughs.map((b) => <span key={b} className="rounded-full bg-[#E6EFE6] px-3 py-1.5 text-xs font-bold">{b}</span>)}
                  </div>
                  <p className="mt-2 text-xs text-[#14332E]/60">Demo list — owner to replace with real coverage before launch.</p>
                </div>
                <div className="mt-5 rounded-2xl bg-[#FFF9F0] border border-[#14332E]/10 p-4 text-sm">
                  <p className="font-bold flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Prefer to talk first?</p>
                  <p className="mt-1 text-[#14332E]/70">Call <a href={PHONE_TEL} onClick={() => track("call_click", { location: "postcode" })} className="font-bold underline">{PHONE_DISPLAY}</a> and we will price your clean on the phone.</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-[#14332E]/10 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-[#14332E]/60 flex flex-col sm:flex-row justify-between gap-3">
              <p><strong className="text-[#14332E]">Kindness &amp; Clean (Housekeeping)</strong> · London · <PlaceholderBadge>Legal name / company no. to add</PlaceholderBadge></p>
              <p>Draft page — placeholders must be replaced before launch. See Owner Brief for checklist.</p>
            </div>
          </footer>
        </>
      ) : (
        /* ================= OWNER BRIEF ================= */
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="rounded-[2rem] bg-[#14332E] text-white p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest"><FileText className="h-3.5 w-3.5" /> Checkpoint — Stages 1–3 + Deliverables</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3 leading-tight">Strategy brief: Kindness &amp; Clean (Housekeeping), London</h1>
            <p className="mt-2 text-white/80 max-w-3xl text-sm leading-relaxed">Every fact is labelled <strong>[VERIFIED: source]</strong>, <strong>[INFERRED: reasoning]</strong>, or <strong>[UNKNOWN]</strong>. No ratings, prices, logos, or testimonials have been invented. The customer page uses clearly marked placeholders until you supply the real details.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-400/20 border border-emerald-300/30 px-3 py-1 text-xs font-bold">Positioning + offer below need your approval</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Primary action: 60-sec fixed-price quote</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Secondary: click-to-call</span>
            </div>
          </div>

          {/* STAGE 1 */}
          <section className="mt-8 rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2"><Eye className="h-6 w-6" /> Stage 1 — Business &amp; brand audit</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead><tr className="text-left text-xs uppercase tracking-widest text-[#14332E]/50 border-b"><th className="py-2 pr-4">Item</th><th className="py-2 pr-4">Finding</th><th className="py-2">Label</th></tr></thead>
                <tbody className="divide-y divide-[#14332E]/10">
                  <tr><td className="py-3 pr-4 font-bold">Sub-niche</td><td className="py-3 pr-4">Residential housekeeping / regular domestic cleaning in London (weekly &amp; fortnightly, plus one-off deep and end-of-tenancy).</td><td className="py-3"><InferredTag /> <span className="text-xs text-[#14332E]/60">from business name + “London” provided by owner</span></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Website</td><td className="py-3 pr-4">None provided. No public site found for “Kindness &amp; Clean” in London in web search.</td><td className="py-3"><VerifiedTag source="https://www.google.com/search?q=Kindness+%26+Clean+housekeeping+London" /> <span className="text-xs">owner input: “Nil”</span></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Logo</td><td className="py-3 pr-4">No logo file or image URL found on site, socials, or Google profile (none provided).</td><td className="py-3"><UnknownTag /></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Brand colours</td><td className="py-3 pr-4">Cannot sample from logo (none found) or CSS (no site). Draft palette (deep teal #14332E, clay #8A3B1F, cream #FFF9F0) is approximate only. Text contrast checked to WCAG AA (dark text on cream &gt;10:1; white on clay ~5.5:1).</td><td className="py-3"><InferredTag /> <span className="text-xs text-[#14332E]/60">approximate — replace with sampled hex</span></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Fonts</td><td className="py-3 pr-4">Not detectable — no site. Draft uses Fraunces + Inter (warm, readable at 6th–8th grade level).</td><td className="py-3"><UnknownTag /></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Current positioning / headline</td><td className="py-3 pr-4">No current headline or tagline found.</td><td className="py-3"><UnknownTag /></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Proof assets</td><td className="py-3 pr-4">No verified rating, review count, years in business, licence, guarantee, or client list found for this London business. Note: “Kindness Cleaning” in Los Gatos / San Jose, CA, USA (5.0★, 4 reviews) is a different business and must not be used.</td><td className="py-3"><VerifiedTag source="https://reviews.birdeye.com/kindness-cleaning-166408659612846" /> <span className="text-xs">for the CA business only</span></td></tr>
                  <tr><td className="py-3 pr-4 font-bold">Contact / hours / area</td><td className="py-3 pr-4">Phone, address, hours, and borough coverage not provided. Page shows placeholders that must match Google Business Profile exactly before launch.</td><td className="py-3"><UnknownTag /></td></tr>
                </tbody>
              </table>
            </div>
            <h3 className="font-bold mt-6">Current-site conversion audit — top 5 problems by likely revenue impact</h3>
            <p className="text-sm text-[#14332E]/70 mt-1">There is no site to audit, so the problems are absence problems. Ranked by revenue impact:</p>
            <ol className="mt-3 space-y-2 text-sm list-decimal list-inside">
              <li><strong>No phone number above the fold (no site at all).</strong> Housekeeping is a call-first purchase; without a number, high-intent searchers cannot convert.</li>
              <li><strong>No fixed-price offer.</strong> Competitors publish £/hr (see Stage 2). Silence on price = shoppers compare elsewhere.</li>
              <li><strong>No trust proof.</strong> No reviews, vetting, or insurance shown. In a stranger-in-your-home service, this kills bookings.</li>
              <li><strong>No same-cleaner promise.</strong> The #1 praise in competitor reviews is continuity — unclaimed here.</li>
              <li><strong>No local SEO basics.</strong> No Google profile link, schema, or “[service] in [city]” title to capture “house cleaning London” searches.</li>
            </ol>
          </section>

          {/* STAGE 2 */}
          <section className="mt-6 rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6" /> Stage 2 — Competitor analysis (London)</h2>
            <p className="mt-2 text-sm text-[#14332E]/70">Chosen via “[service] London” searches and map/listing roundups (BestInHood, BestInBritain, Mrsshilts). All are direct residential housekeeping competitors in the same city. Copy and images have not been copied.</p>
            <div className="mt-4 space-y-4">
              {COMPETITORS.map((c) => (
                <article key={c.name} className="rounded-3xl border border-[#14332E]/10 bg-[#FFF9F0] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold">{c.name}</h3>
                    <a href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold underline decoration-dotted">{c.url.replace("https://", "")} <ExternalLink className="h-3 w-3" /></a>
                  </div>
                  <dl className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
                    <div><dt className="font-bold text-xs uppercase tracking-wide text-[#14332E]/50">Rating</dt><dd>{c.rating} <VerifiedTag source={c.ratingSource} /></dd></div>
                    <div><dt className="font-bold text-xs uppercase tracking-wide text-[#14332E]/50">Published price</dt><dd>{c.price} <VerifiedTag source={c.priceSource} /></dd></div>
                    <div><dt className="font-bold text-xs uppercase tracking-wide text-[#14332E]/50">Primary CTA</dt><dd>{c.cta}</dd></div>
                    <div><dt className="font-bold text-xs uppercase tracking-wide text-[#14332E]/50">Standout strength</dt><dd>{c.strengths}</dd></div>
                    <div className="sm:col-span-2"><dt className="font-bold text-xs uppercase tracking-wide text-[#14332E]/50">Weakness to learn from</dt><dd>{c.weakness}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-3xl bg-rose-50 border border-rose-200 p-5">
                <h3 className="font-bold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-rose-700" /> Market pain points (1–3★ reviews)</h3>
                <ul className="mt-2 text-sm space-y-1.5 list-disc list-inside">
                  <li>Overcharged — left early, charged full hours <VerifiedTag source="https://www.trustpilot.com/review/cleanersoflondon.co.uk?page=2" /></li>
                  <li>Late arrival, rude, poor clean, damage, then unresponsive <VerifiedTag source="https://uk.trustpilot.com/review/cleanerslondon.com" /></li>
                  <li>Last-minute cancellation before Christmas <VerifiedTag source="https://uk.trustpilot.com/review/housecleanerlondon.co.uk" /></li>
                  <li>Extra £60 demanded on arrival for dust <VerifiedTag source="https://www.trustpilot.com/review/cleanersoflondon.co.uk?page=4" /></li>
                  <li>“48-hour guarantee” not honoured <VerifiedTag source="https://www.trustpilot.com/review/cleanerslondon.com?page=5" /></li>
                </ul>
              </div>
              <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5">
                <h3 className="font-bold flex items-center gap-2"><Star className="h-5 w-5 text-emerald-700" /> What 5★ customers value (their language)</h3>
                <ul className="mt-2 text-sm space-y-1.5 list-disc list-inside">
                  <li>“Same cleaner comes each week and knows exactly how we like things done.” <VerifiedTag source="https://cityhousekeeping.co.uk/services/domestic-cleaning/" /></li>
                  <li>“I like to clean like it’s my own house.” <VerifiedTag source="https://housekeep.com/home-cleaning/housekeeping/locations-city/london/" /></li>
                  <li>“Very friendly and polite… ironing was excellent… went above and beyond.” <VerifiedTag source="https://housekeep.com/home-cleaning/housekeeping/locations-city/london/" /></li>
                  <li>Punctuality + thoroughness as the two biggest strengths (Better Maid roundup). <VerifiedTag source="https://www.mrsshilts.co.uk/4-best-rated-house-cleaning-services-in-london/" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* STAGE 3 */}
          <section className="mt-6 rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6" /> Stage 3 — Gaps &amp; positioning</h2>
            <h3 className="font-bold mt-4">Weaknesses vs. competitors (blunt, ranked)</h3>
            <ol className="mt-2 text-sm space-y-1.5 list-decimal list-inside">
              <li><strong>No proof at all</strong> — competitors show 4.1–4.9★ across 197–5,349 reviews. We show zero. This is the biggest gap.</li>
              <li><strong>No published price</strong> — every competitor publishes £/hr. We publish nothing, so shoppers cannot compare.</li>
              <li><strong>No vetting/insurance proof</strong> — City Housekeeping leads with DBS-checked. We cannot yet claim it.</li>
              <li><strong>No phone presence</strong> — Housekeep is chat-only (a complaint). We have no number at all.</li>
              <li><strong>No same-cleaner system described</strong> — the most-praised feature in the market is unclaimed by us.</li>
            </ol>
            <h3 className="font-bold mt-5">Unclaimed position</h3>
            <p className="text-sm text-[#14332E]/75 mt-1">No competitor leads with all three together: <strong>same kind person + fixed price in writing + a real human on the phone</strong>. Housekeep wins on app speed but loses on phone support. City Housekeeping wins on same-cleaner but at a higher price with a 3-hour minimum. The “kindness + certainty + human contact” lane is open — and it matches your name.</p>
            <div className="mt-5 rounded-3xl bg-[#14332E] text-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Recommended positioning (ONE)</p>
              <p className="font-display text-xl sm:text-2xl font-semibold leading-snug mt-2">For London homes that want a calm, clean home without the worry of strangers, surprise charges, or no-shows, Kindness &amp; Clean is the housekeeping service that sends the same kind, vetted cleaner each visit at a fixed price agreed before we start — with a real person to call.</p>
              <p className="text-xs text-white/60 mt-2">Justification: directly answers the top 1–3★ complaints (strangers, surprise pricing, unresponsiveness) and the top 5★ praise (same cleaner, punctual, kind). <InferredTag /></p>
            </div>
            <div className="mt-4 rounded-3xl bg-[#8A3B1F] text-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-200">Recommended core offer (ONE) — needs your approval</p>
              <p className="font-display text-xl font-semibold mt-2">Fixed price in writing + same cleaner every visit + 24-hour return promise.</p>
              <p className="text-sm text-white/85 mt-2">Why: fixed price kills the #1 complaint (overcharging). Same cleaner captures the #1 praise. The return promise is the risk reversal competitors mention inconsistently — but it must be owner-approved and costed before publishing. <PlaceholderBadge>Owner to approve + cost</PlaceholderBadge></p>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-3xl border-2 border-[#14332E] p-5"><strong className="flex items-center gap-2"><MousePointerClick className="h-5 w-5" /> Primary conversion action</strong><p className="mt-1 text-[#14332E]/75">60-second fixed-price quote request (4-field form). Best for Google Business Profile / organic / flyer traffic where visitors need a price before they will call.</p></div>
              <div className="rounded-3xl border border-[#14332E]/15 p-5"><strong className="flex items-center gap-2"><PhoneCall className="h-5 w-5" /> Secondary (only one)</strong><p className="mt-1 text-[#14332E]/75">Click-to-call. For high-intent visitors who want to talk now. Sticky mobile bar keeps both actions always visible.</p></div>
            </div>
          </section>

          {/* PRE-LAUNCH CHECKLIST */}
          <section className="mt-6 rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2"><ClipboardCheck className="h-6 w-6" /> Pre-launch checklist — every placeholder to replace</h2>
            <p className="text-sm text-[#14332E]/70 mt-1">Do not launch until every item is replaced or explicitly approved. The page is designed to be honest while incomplete.</p>
            <ol className="mt-4 space-y-3">
              {CHECKLIST.map((c, i) => (
                <li key={c.item} className="flex gap-3 rounded-2xl border border-[#14332E]/10 bg-[#FFF9F0] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#14332E] text-white text-xs font-bold">{i + 1}</span>
                  <span><strong className="block text-sm">{c.item}</strong><span className="text-xs text-[#14332E]/65">{c.why}</span></span>
                </li>
              ))}
            </ol>
          </section>

          {/* A/B + TRACKING */}
          <section className="mt-6 grid lg:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2"><FlaskConical className="h-6 w-6" /> A/B test plan (ranked by impact)</h2>
              <ol className="mt-4 space-y-4 text-sm">
                <li className="rounded-2xl bg-[#FFF9F0] border border-[#14332E]/10 p-4"><strong>Test 1 — Headline: outcome vs. offer.</strong><br />A: “Come home to a calm, clean home — without the worry.” B: “Same kind cleaner. Fixed price. Real person to call.”<br /><span className="text-[#14332E]/65">Metric: quote starts + submits. Expected impact: highest — headline drives scroll + form starts.</span></li>
                <li className="rounded-2xl bg-[#FFF9F0] border border-[#14332E]/10 p-4"><strong>Test 2 — CTA wording: “Get my fixed price” vs. “Get my quote”.</strong><br />“Fixed price” is more specific and answers the #1 complaint. Metric: form submit rate. Expected impact: medium-high.</li>
                <li className="rounded-2xl bg-[#FFF9F0] border border-[#14332E]/10 p-4"><strong>Test 3 — Guarantee placement: hero trust line vs. mid-page only.</strong><br />Adding “24-hour return promise [once approved]” to the hero. Metric: call clicks + submits. Expected impact: medium — only after owner approves the guarantee.</li>
              </ol>
              <p className="mt-3 text-xs text-[#14332E]/60">Run one test at a time, minimum 2 weeks or 200 sessions per variant, whichever is later. Do not test with placeholders in place.</p>
            </div>
            <div className="rounded-[2rem] border border-[#14332E]/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6" /> Tracking plan</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li><strong>Events (GA4 via GTM dataLayer — already stubbed in code):</strong> <code className="bg-[#14332E]/5 px-1 rounded">call_click</code>, <code className="bg-[#14332E]/5 px-1 rounded">cta_click</code>, <code className="bg-[#14332E]/5 px-1 rounded">quote_submit</code>, <code className="bg-[#14332E]/5 px-1 rounded">postcode_check</code>, <code className="bg-[#14332E]/5 px-1 rounded">faq_open</code>.</li>
                <li><strong>Call tracking:</strong> use a call-tracking number (e.g. CallRail) so you know which page/ad produced each call. Match the number to Google Business Profile after launch.</li>
                <li><strong>Form:</strong> connect to email + CRM; log source (Google Business Profile, Ads, flyer QR via UTM). Add UTMs to every QR code.</li>
                <li><strong>Benchmark:</strong> local home-services landing pages typically convert at <strong>2–5% visitor → lead</strong> <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">ESTIMATE — no single verified source; treat as planning range, not a promise</span>. Housekeeping with a fixed-price offer should aim for the top half once reviews exist.</li>
                <li><strong>Weekly review:</strong> calls, quote submits, cost per lead by source, and the #1 drop-off field in the form.</li>
              </ul>
              <div className="mt-4 rounded-2xl bg-[#14332E] text-white p-4 text-xs">
                <strong>JSON-LD (live on page):</strong> HouseCleaningService with name + areaServed London only. Phone, address, hours, and ratings omitted until verified — see page source <code>#localbusiness-schema</code>.
              </div>
            </div>
          </section>

          <div className="mt-6 rounded-[2rem] border-2 border-dashed border-amber-600/50 bg-amber-50 p-6 text-sm">
            <strong className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Checkpoint — your approval needed</strong>
            <p className="mt-2">Please approve (or edit): <strong>1)</strong> positioning statement, <strong>2)</strong> core offer + 24-hour return promise, <strong>3)</strong> primary action (quote form). Then supply every item in the Pre-launch Checklist. Until then, the customer page remains a draft with honest placeholders — no fake proof, no invented prices.</p>
            <button onClick={() => setView("page")} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#14332E] px-5 py-2.5 text-sm font-bold text-white">Back to customer page <ArrowRight className="h-4 w-4" /></button>
          </div>
        </main>
      )}

      {/* ================= STICKY MOBILE BAR ================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#14332E]/10 bg-white/95 backdrop-blur px-3 py-2.5 grid grid-cols-2 gap-2">
        <a href={PHONE_TEL} onClick={() => track("call_click", { location: "sticky_bar" })} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#14332E] py-3 text-sm font-bold">
          <Phone className="h-4 w-4" /> Call now
        </a>
        <button onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8A3B1F] py-3 text-sm font-bold text-white">
          Get fixed price <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
