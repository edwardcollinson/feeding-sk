import post from "./documents/post";
import category from "./documents/category";
import author from "./documents/author";
import linkInBio from "./documents/linkInBio";
import siteSettings from "./documents/siteSettings";
import ingredient from "./objects/ingredient";
import restaurantInfo from "./objects/restaurantInfo";
import seo from "./objects/seo";

export const schemaTypes = [
  // Documents
  post,
  category,
  author,
  linkInBio,
  siteSettings,
  // Objects
  ingredient,
  restaurantInfo,
  seo,
];
