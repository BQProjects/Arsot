import type { CollectionConfig } from "payload";

export const CrewBrief: CollectionConfig = {
  slug: "crew-briefs",
  access: {
    read: () => true, // Allow public read access
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "text",
    },
    {
      name: "banner",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "sections",
      type: "blocks",
      blocks: [
        {
          slug: "heading",
          labels: {
            singular: "Heading",
            plural: "Headings",
          },
          fields: [
            {
              name: "content",
              type: "text",
            },
          ],
        },
        {
          slug: "paragraph",
          labels: {
            singular: "Paragraph",
            plural: "Paragraphs",
          },
          fields: [
            {
              name: "content",
              type: "textarea",
            },
          ],
        },
        {
          slug: "quote",
          labels: {
            singular: "Quote",
            plural: "Quotes",
          },
          fields: [
            {
              name: "content",
              type: "textarea",
            },
          ],
        },
        {
          slug: "image",
          labels: {
            singular: "Image",
            plural: "Images",
          },
          fields: [
            {
              name: "leftImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "rightImage",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
  ],
};
