import { Metadata } from "next";
import Bio from "@/components/about/Bio";
import ContactForm from "@/components/about/ContactForm";
import { getAuthor } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about SK and get in touch for collaborations.",
};

export default async function AboutPage() {
  const author = await getAuthor();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {author && <Bio author={author} />}

      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl text-evergreen mb-2">
          Let&apos;s Work Together
        </h2>
        <p className="text-evergreen/60 mb-8">
          Interested in a collaboration? Fill out the form below and I&apos;ll
          get back to you.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
