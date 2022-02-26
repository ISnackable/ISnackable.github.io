import { groq } from "next-sanity";

const isProduction = process.env.NODE_ENV === "production";
const filterDrafts = isProduction ? "&& !(_id in path('drafts.**'))" : "";

export const getAllPostsQuery = groq`
*[_type == "post" ${filterDrafts}]{
    _id,
    publishedAt,
    mainImage,
    title,
    "slug": slug.current,
    description,
    categories[]->{title},
}|order(publishedAt desc)`;

export const getAllProjectQuery = groq`
`;

export const getAllCategoriesQuery = groq`
`;
