import { RiMiniProgramFill } from "react-icons/ri";

export default {
  name: "project",
  title: "Project",
  type: "document",
  icon: RiMiniProgramFill,
  initialValue: () => ({
    author: {
      _ref: "4a55f40a-2011-4ee8-8bab-45bac88f88df",
      _type: "reference",
    },
  }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Titles should be catchy, descriptive, and not too long",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Some frontends will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description:
        "Description should be descriptive on what the project is about",
    },
    {
      title: "Project URL",
      name: "projectUrl",
      type: "url",
      description: "The link to the project",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "mainImage",
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};