import type { CollectionConfig } from "payload";

export const FBOManager: CollectionConfig = {
  slug: "fbo-managers",
  access: {
    read: () => true, // Allow public read access
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "about",
      type: "textarea",
      required: true,
    },
  ],
};
