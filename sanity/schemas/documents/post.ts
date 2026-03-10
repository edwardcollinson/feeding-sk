import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Recipe", value: "recipe" },
          { title: "Review", value: "review" },
          { title: "Lifestyle", value: "lifestyle" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "lifestyle",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short description for previews and SEO",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),

    // Recipe-only fields
    defineField({
      name: "prepTime",
      title: "Prep Time (minutes)",
      type: "number",
      hidden: ({ parent }) => parent?.postType !== "recipe",
    }),
    defineField({
      name: "cookTime",
      title: "Cook Time (minutes)",
      type: "number",
      hidden: ({ parent }) => parent?.postType !== "recipe",
    }),
    defineField({
      name: "servings",
      title: "Servings",
      type: "number",
      hidden: ({ parent }) => parent?.postType !== "recipe",
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "ingredient" }],
      hidden: ({ parent }) => parent?.postType !== "recipe",
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        },
      ],
      hidden: ({ parent }) => parent?.postType !== "recipe",
    }),

    // Review-only fields
    defineField({
      name: "restaurantInfo",
      title: "Restaurant Info",
      type: "restaurantInfo",
      hidden: ({ parent }) => parent?.postType !== "review",
    }),

    // Optional per-post ShopMy links
    defineField({
      name: "shopMyLinks",
      title: "ShopMy Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "url", title: "ShopMy URL", type: "url" },
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      postType: "postType",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, postType, media, date }) {
      const typeLabels: Record<string, string> = {
        recipe: "Recipe",
        review: "Review",
        lifestyle: "Lifestyle",
      };
      return {
        title,
        subtitle: `${typeLabels[postType] || postType} — ${date ? new Date(date).toLocaleDateString() : "Draft"}`,
        media,
      };
    },
  },
});
