import { defineType } from "sanity";

export default defineType({
  name: "ingredient",
  title: "Ingredient",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "amount",
      title: "Amount",
      type: "string",
    },
    {
      name: "unit",
      title: "Unit",
      type: "string",
    },
    {
      name: "notes",
      title: "Notes",
      type: "string",
      description: "e.g. 'finely chopped', 'optional'",
    },
  ],
  preview: {
    select: {
      name: "name",
      amount: "amount",
      unit: "unit",
    },
    prepare({ name, amount, unit }) {
      return {
        title: name,
        subtitle: [amount, unit].filter(Boolean).join(" "),
      };
    },
  },
});
