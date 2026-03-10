import { defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "instagram",
      title: "Instagram Handle",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
