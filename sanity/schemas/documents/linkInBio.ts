import { defineType } from "sanity";

export default defineType({
  name: "linkInBio",
  title: "Link in Bio",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon/Emoji",
      type: "string",
      description: "An emoji or short text to display beside the link",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    },
    {
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
      isActive: "isActive",
    },
    prepare({ title, icon, isActive }) {
      return {
        title: `${icon || ""} ${title}`.trim(),
        subtitle: isActive ? "Active" : "Hidden",
      };
    },
  },
});
