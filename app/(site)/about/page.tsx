import { Metadata } from "next";
import Bio from "@/components/about/Bio";
import ContactForm from "@/components/about/ContactForm";
import { getAuthor } from "@/sanity/lib/queries";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about SK and get in touch for collaborations.",
};

export default async function AboutPage() {
  const author = await getAuthor();

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-evergreen py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute -top-1/3 -right-1/4 h-[70%] w-[70%] rounded-full opacity-20 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, #3CB961 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 h-[60%] w-[60%] rounded-full opacity-15 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, #F16A87 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-offwhite/20 px-5 py-2 text-xs tracking-[0.3em] uppercase text-offwhite/60">
            About
          </span>
          <h1 className="font-heading text-5xl md:text-7xl text-offwhite mb-4">
            Hey, I&apos;m SK
          </h1>
          <p className="mx-auto max-w-lg text-lg text-offwhite/60">
            Food lover, home cook, SF explorer & the one behind @feedingsk
          </p>
          <div
            className="mx-auto mt-6 h-px w-16"
            style={{
              backgroundImage: "linear-gradient(90deg, #3CB961, #F16A87)",
            }}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        {/* Bio from Sanity if available */}
        {author ? (
          <div className="py-16">
            <Bio author={author} />
          </div>
        ) : (
          /* Fallback bio when Sanity author doc isn't set up yet */
          <section className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Photo placeholder */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald/10 via-sky-blue/10 to-bubblegum/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-7xl">👩‍🍳</span>
                  <p className="mt-4 text-sm text-evergreen/40">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* Story */}
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-evergreen mb-6">
                  The Story Behind<br />
                  <span className="text-gradient">Feeding SK</span>
                </h2>
                <div className="space-y-4 text-evergreen/70 leading-relaxed">
                  <p>
                    I started Feeding SK as a way to share my love for food — from the
                    recipes I cook at home to the incredible restaurants I discover
                    around San Francisco.
                  </p>
                  <p>
                    Whether it&apos;s a comforting weeknight dinner, a new brunch spot
                    in the Mission, or my go-to kitchen essentials, I believe good food
                    brings people together. This space is where I share all of it.
                  </p>
                  <p>
                    When I&apos;m not in the kitchen or exploring SF&apos;s food scene,
                    you&apos;ll find me hunting for the perfect matcha latte, thrifting,
                    or planning my next trip.
                  </p>
                </div>

                {/* Quick stats */}
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="text-center">
                    <p className="font-heading text-2xl text-emerald">SF</p>
                    <p className="text-xs text-evergreen/40 uppercase tracking-wider">Based in</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-2xl text-bubblegum">100+</p>
                    <p className="text-xs text-evergreen/40 uppercase tracking-wider">Recipes</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-2xl text-sky-blue">50+</p>
                    <p className="text-xs text-evergreen/40 uppercase tracking-wider">SF Spots</p>
                  </div>
                </div>

                {/* Social link */}
                <a
                  href="https://instagram.com/feedingsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-evergreen px-6 py-3 text-sm font-semibold text-offwhite transition-all duration-300 hover:bg-emerald hover:shadow-lg"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  Follow @feedingsk
                </a>
              </div>
            </div>
          </section>
        )}

        {/* What I do section */}
        <section className="pb-16">
          <h2 className="font-heading text-3xl text-evergreen mb-10 text-center">
            What You&apos;ll Find Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🍳",
                title: "Recipes",
                description:
                  "From quick weeknight meals to weekend projects — tested, photographed, and written with love.",
                color: "emerald",
                bgClass: "from-emerald/5 to-emerald/10",
              },
              {
                emoji: "🍜",
                title: "SF Eats",
                description:
                  "Honest reviews of San Francisco's best restaurants, cafes, and hidden gems across every neighborhood.",
                color: "bubblegum",
                bgClass: "from-bubblegum/5 to-bubblegum/10",
              },
              {
                emoji: "✨",
                title: "Lifestyle",
                description:
                  "Kitchen favorites, travel guides, wellness tips, and the everyday things that make life a little sweeter.",
                color: "sky-blue",
                bgClass: "from-sky-blue/5 to-sky-blue/10",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl bg-gradient-to-br ${item.bgClass} p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <span className="mb-4 inline-block text-5xl">{item.emoji}</span>
                <h3 className="font-heading text-xl text-evergreen mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-evergreen/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section className="pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="mb-3 inline-block rounded-full bg-bubblegum/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-bubblegum">
                Get in Touch
              </span>
              <h2 className="font-heading text-3xl text-evergreen mb-2">
                Let&apos;s Work Together
              </h2>
              <p className="text-evergreen/60">
                Interested in a collaboration, brand partnership, or just want to
                say hi? I&apos;d love to hear from you.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Newsletter */}
        <div className="pb-16">
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
