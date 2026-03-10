import { defineType } from "sanity";

export default defineType({
  name: "restaurantInfo",
  title: "Restaurant Info",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "website",
      title: "Website",
      type: "url",
    },
    {
      name: "priceRange",
      title: "Price Range",
      type: "string",
      options: {
        list: [
          { title: "$", value: "$" },
          { title: "$$", value: "$$" },
          { title: "$$$", value: "$$$" },
          { title: "$$$$", value: "$$$$" },
        ],
      },
    },
    {
      name: "rating",
      title: "Rating (out of 5)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5).precision(1),
    },
    {
      name: "cuisine",
      title: "Cuisine",
      type: "string",
    },
    {
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
    },
    {
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    },
  ],
});
