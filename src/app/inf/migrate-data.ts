import { config } from "dotenv";
import mongoose from "mongoose";
import payload from "payload";
import CrewBrief from "./models/CrewBrief";
import FBOManager from "./models/FBOManager";
import PressRelease from "./models/PressRelease";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// Load environment variables
config({ path: ".env" });

const payloadConfig = buildConfig({
  admin: {
    user: "users",
  },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "role",
          type: "select",
          options: ["admin"],
          defaultValue: "admin",
          required: true,
        },
      ],
    },
    {
      slug: "crew-briefs",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "text",
          required: true,
        },
        {
          name: "banner",
          type: "text",
        },
        {
          name: "sections",
          type: "array",
          fields: [
            {
              name: "type",
              type: "select",
              options: ["heading", "paragraph", "quote", "image"],
              required: true,
            },
            {
              name: "content",
              type: "textarea",
              required: false,
            },
            {
              name: "image",
              type: "text",
            },
            {
              name: "leftImage",
              type: "text",
            },
            {
              name: "rightImage",
              type: "text",
            },
          ],
        },
        {
          name: "summary",
          type: "textarea",
        },
      ],
    },
    {
      slug: "fbo-managers",
      fields: [
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
          name: "phone",
          type: "text",
          required: true,
        },
        {
          name: "role",
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
        {
          name: "photo",
          type: "text",
        },
      ],
    },
    {
      slug: "press-releases",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "text",
          required: true,
        },
        {
          name: "banner",
          type: "text",
        },
        {
          name: "sections",
          type: "array",
          fields: [
            {
              name: "type",
              type: "select",
              options: ["heading", "paragraph", "quote", "image"],
              required: true,
            },
            {
              name: "content",
              type: "textarea",
              required: false,
            },
            {
              name: "image",
              type: "text",
            },
            {
              name: "leftImage",
              type: "text",
            },
            {
              name: "rightImage",
              type: "text",
            },
          ],
        },
        {
          name: "summary",
          type: "textarea",
        },
      ],
    },
  ],
  db: mongooseAdapter({
    url: process.env.MONGO_DB_URI!,
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: "payload-types.ts",
  },
});

async function migrateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URI!);

    // Initialize Payload
    await payload.init({
      config: payloadConfig,
    });

    console.log("Starting migration...");

    // Migrate Crew Briefs
    console.log("Migrating Crew Briefs...");
    const crewBriefs = await CrewBrief.find({});
    for (const brief of crewBriefs) {
      const plainBrief = brief.toObject();
      await payload.create({
        collection: "crew-briefs",
        data: {
          title: plainBrief.title,
          date: plainBrief.date,
          banner: plainBrief.banner,
          sections: plainBrief.sections,
          summary: plainBrief.summary,
        },
      });
    }
    console.log(`Migrated ${crewBriefs.length} Crew Briefs`);

    // Migrate FBO Managers
    console.log("Migrating FBO Managers...");
    const fboManagers = await FBOManager.find({});
    for (const manager of fboManagers) {
      const plainManager = manager.toObject();
      await payload.create({
        collection: "fbo-managers",
        data: {
          name: plainManager.name,
          email: plainManager.email,
          phone: plainManager.phone,
          role: plainManager.role,
          location: plainManager.location,
          about: plainManager.about,
          photo: plainManager.photo,
        },
      });
    }
    console.log(`Migrated ${fboManagers.length} FBO Managers`);

    // Migrate Press Releases
    console.log("Migrating Press Releases...");
    const pressReleases = await PressRelease.find({});
    for (const release of pressReleases) {
      const plainRelease = release.toObject();
      await payload.create({
        collection: "press-releases",
        data: {
          title: plainRelease.title,
          date: plainRelease.date,
          banner: plainRelease.banner,
          sections: plainRelease.sections,
          summary: plainRelease.summary,
        },
      });
    }
    console.log(`Migrated ${pressReleases.length} Press Releases`);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrateData();
