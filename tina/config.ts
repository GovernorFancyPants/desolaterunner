import { defineConfig } from "tinacms";
import { post_templateFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "70466840-e41d-4851-93f4-7f749f744820", // Get this from tina.io
  token: "bd54addf647b334fdb5bcbea95d92924a5b249c1", // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "./",
    },
  },
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: '_posts',
        defaultItem: () => {
          return {
            // When a new post is created the layout field will be set to "article"
            layout: 'article',
          }
        },
        fields: [
          { 
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          { 
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags',
            }
          },
          {
            type: "object",
            name: "image",
            label: "Cover image",
            required: true,
            fields: [
              {
                type: "image",
                name: "feature",
                label: "Feature",
                required: true,
              },
              {
                type: "image",
                name: "teaser",
                label: "Thumbnail",
                required: true,
              },
            ],
          },
          { 
            type: "string",
            name: "categories",
            label: "Categories",
          },
          { 
            type: "boolean",
            name: "ads",
            label: "Ads",
          },
          { 
            type: "boolean",
            name: "comments",
            label: "Comments",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
          },
          {
            type: "string",
            name: "introduction",
            label: "Introduction",
          },
        ],
      },
    ],
  },
});
