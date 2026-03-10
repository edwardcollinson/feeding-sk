import { defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Feeding SK",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "heroPost",
      title: "Hero Post (Homepage)",
      type: "reference",
      to: [{ type: "post" }],
      description: "The featured post shown in the homepage hero",
    },
    {
      name: "featuredPosts",
      title: "Featured Posts (Homepage)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      description: "Curated posts shown in the homepage featured grid",
      validation: (Rule) => Rule.max(6),
    },
    {
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      initialValue: "@feedingsk",
    },
    {
      name: "shopMyProfileUrl",
      title: "ShopMy Profile URL",
      type: "url",
    },
    {
      name: "newsletterHeading",
      title: "Newsletter Heading",
      type: "string",
      initialValue: "Stay Hungry",
    },
    {
      name: "newsletterText",
      title: "Newsletter CTA Text",
      type: "string",
      initialValue:
        "Get new recipes, restaurant recs, and lifestyle inspo delivered to your inbox.",
    },
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
