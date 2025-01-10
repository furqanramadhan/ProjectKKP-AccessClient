import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { insertOrganizationSchema } from "@/db/schema";
import { organizations } from "@/db/schema";
import { HTTPException } from "hono/http-exception";

// Align Zod schema with Drizzle schema
const CreateOrganizationSchema = z.object({
  id: z.string().nonempty("Organization ID is required"),
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .nonempty("Organization name is required"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    )
    .nonempty("Organization slug is required"),
  image_url: z.string().url().optional(), // Changed to match schema
  max_allowed_memberships: z.number().int().min(1).default(5), // Changed to match schema
  public_metadata: z.record(z.unknown()).optional().default({}), // Changed to match schema
  private_metadata: z.record(z.unknown()).optional().default({}), // Changed to match schema
});

const UpdateOrganizationSchema = CreateOrganizationSchema.partial().omit({
  id: true,
});

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const orgs = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, auth.userId));

    return c.json({
      success: true,
      data: orgs,
    });
  })
  .get("/:id", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const id = c.req.param("id");
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .limit(1);

    if (!org.length) {
      throw new HTTPException(404, { message: "Organization not found" });
    }

    return c.json({
      success: true,
      data: org[0],
    });
  })
  .post("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    try {
      const body = await c.req.json();
      const data = CreateOrganizationSchema.parse(body);

      // Check if slug is already taken
      const existingOrg = await db
        .select({ id: organizations.id })
        .from(organizations)
        .where(eq(organizations.slug, data.slug))
        .limit(1);

      if (existingOrg.length) {
        throw new HTTPException(400, { message: "Slug already taken" });
      }

      const now = new Date().toISOString();

      // Prepare insert data matching the schema structure
      const insertData = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        image_url: data.image_url,
        members_count: 1, // Starting with the creator
        max_allowed_memberships: data.max_allowed_memberships,
        public_metadata: data.public_metadata,
        private_metadata: data.private_metadata,
        created_at: now,
        updated_at: now,
      };

      // Validate against Drizzle schema
      const validatedData = insertOrganizationSchema.parse(insertData);

      await db.insert(organizations).values(validatedData);

      return c.json({
        success: true,
        message: "Organization created successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json(
          {
            success: false,
            errors: error.errors,
          },
          400
        );
      }
      throw error;
    }
  });

export default app;
