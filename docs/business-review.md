# Business review log

Decision log for content/messaging reviews of the portfolio. Newest entries at the bottom.

## 2026-07-12 — Audience-fit review: founders & technical managers

### Assessment by audience
- Startup founder lens: **partially working** — Within 30 seconds a founder gets "data/ML + full-stack engineer, available, at SJSU" (hero bio, Available badge, pillar cards are genuinely good). But almost every project description leads with stack, not problem: EchoGraph opens with "LangGraph and FastAPI" before saying what anyone would use it for. There is no "what he can do for your business" sentence anywhere — the closest is "each built to solve a real problem," which asserts value without naming one. A non-technical founder can tell Prem is skilled; they cannot tell what problem to hand him.
- Technical manager lens: **projects work, experience doesn't** — The featured tier (DeployPulse, PayGuard) with metrics blocks, architecture diagrams, and honest stack lists is exactly what an eng lead wants; the streaming/ONNX/Kafka work reads as real system-building, not tutorials. But the experience timeline undercuts it: the most recent role (KLA, Aug–Dec 2025) is one vague filler sentence ("enhance more features in the website for better user experience") with a skills list (Pandas/PyTorch for website features?) that doesn't match the description. Only the Summer 2025 KLA entry has substance; the other four have no quantified results. Self-graded "Proficiency 80%" bars and stats like "GB+ data processed" and "1+ years experience" (with 5 internships listed!) actively lower credibility with this audience.

### Section-by-section verdicts
- Hero (Home.jsx): **mostly working** — Clear identity, availability signal, and pillar cards give both audiences a fast read. But "Graduate student at San Jose State University" is now stale (graduation was May 2026; it is July 2026) — he reads as less available/senior than he is.
- Experience (About.jsx): **not working** — Most recent KLA entry is placeholder-quality; 4 of 5 entries have zero outcomes/numbers. This is the section a hiring manager reads hardest, and it's the weakest content on the site. The education card's "Career Focus: Full-time · Summer 2026" is also now in the past.
- Skills (Skills.jsx): **partially working** — The 3-tier "Expert/Proficient/Expanding" view with years is honest and useful. The percentage proficiency bars and the quick stats row ("1+ years", "GB+", "20+ mastered") are self-graded fluff that technical managers discount or hold against candidates.
- Featured projects (Work.jsx + data.jsx): **working, with two caveats** — EchoGraph/DeployPulse/PayGuard deserve featured status: they're the most ambitious, most production-flavored work, and the metrics tiles are the best content on the site. Caveats: (1) EchoGraph is the only featured project with no `metrics` block — inconsistent with the other two; (2) PayGuard's "100% precision per pattern" reads as implausible self-benchmarking and invites skepticism from exactly the audience it's meant to impress — qualify it (e.g. "on synthetic replay of 5 fraud patterns") or drop it.
- Project grid (19 entries, data.jsx): **partially working** — Good breadth and honest bucketing. Tail-end entries (AirBnB Dashboard, Blood Donation, TextHidder) are fine as volume, but descriptions across the grid are tech-first; founders skim past them. The "★ —" placeholder on starless cards draws attention to missing social proof.
- Certificates/"Proof" section (Contact.jsx): **not working as "proof"** — Three undergraduate semester-rank certificates from 2020–2022 are the weakest possible closer for either audience, and the section is literally labeled "// 06 — PROOF". Known pending: user plans to add newer certificates. Until then this section signals junior more than it proves anything.
- CTA / contact paths: **working** — Available badge, mailto CTAs in hero, Work, and footer; low friction throughout.

### Recommended changes (prioritized)
1. Rewrite the KLA Aug–Dec 2025 experience entry with concrete scope and at least one result, and fix its skills list to match the work — it is the newest, most-read line on the site and currently reads as filler. (small)
2. Purge stale dates: hero "Graduate student" → graduate/alumnus framing; "Full-time · Summer 2026" → current availability. Wrong tense here makes the whole site look unmaintained. (small)
3. Add a one-line plain-English problem statement to the top of each featured project description (what breaks without it / who uses it), keeping the technical detail after — serves founders without costing technical-manager depth. Add a metrics block to EchoGraph while there; soften PayGuard's "100% precision". (medium)
4. Replace self-graded proficiency percentages and the "1+ years / GB+ / 20+" quick stats with evidence-based numbers (5 internships, 19 shipped projects, N production services orchestrated). (small)
5. Add one quantified outcome to each of the Linde/Schneider entries (users served, time saved, records handled) — even rough numbers beat none. (small)

### Scope notes
- In scope: copy and data edits in data.jsx, About.jsx, Home.jsx, Skills.jsx — high leverage, low effort, no structural change.
- Out of scope for now: visual/styling (concurrent redesign in flight on Work.jsx/diagrams.jsx); adding testimonials, case-study pages, or a blog — disproportionate for a student/new-grad portfolio; replacing the certificates section wholesale (user has new certificates pending — hold until they arrive).
- Not recommended: trimming the 19-project grid. Breadth is a legitimate signal at this career stage and CLAUDE.md protects the entries.

### Changes needed now
- Stale-date fixes (recommendation 2): as of July 2026 the site says he is a current student seeking Summer 2026 full-time — actively misleading to both audiences and cheap to fix.
- KLA Aug–Dec 2025 description rewrite (recommendation 1): a hiring manager's first click lands on the weakest sentence on the site.
