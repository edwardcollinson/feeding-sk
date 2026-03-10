import { defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Override the default page title for SEO",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Override the default description for SEO",
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Override the default social sharing image",
    },
  ],
});
