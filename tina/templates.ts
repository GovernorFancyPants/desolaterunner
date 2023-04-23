import type { TinaField } from "tinacms";
export function post_templateFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "categories",
      label: "Categories",
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "introduction",
      label: "Introduction",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "image",
      label: "Image",
      fields: [
        {
          type: "image",
          name: "feature",
          label: "Feature",
        },
        {
          type: "image",
          name: "teaser",
          label: "Teaser",
        },
      ],
    },
    {
      type: "datetime",
      name: "date",
      label: "Date published",
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
    },
    {
      type: "boolean",
      name: "comments",
      label: "Comments",
    },
    {
      type: "boolean",
      name: "ads",
      label: "Ads",
    },
  ] as TinaField[];
}
