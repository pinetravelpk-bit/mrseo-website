import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`online_classes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`course_id\` integer,
  	\`starts_at\` text NOT NULL,
  	\`duration_mins\` numeric DEFAULT 120,
  	\`access_code\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`notes\` text,
  	\`student_link\` text,
  	\`teacher_link\` text,
  	\`slug\` text,
  	\`room\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`online_classes_course_idx\` ON \`online_classes\` (\`course_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`online_classes_slug_idx\` ON \`online_classes\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`online_classes_updated_at_idx\` ON \`online_classes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`online_classes_created_at_idx\` ON \`online_classes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`class_attendance\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`online_class_id\` integer NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`ip\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`online_class_id\`) REFERENCES \`online_classes\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`class_attendance_online_class_idx\` ON \`class_attendance\` (\`online_class_id\`);`)
  await db.run(sql`CREATE INDEX \`class_attendance_updated_at_idx\` ON \`class_attendance\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`class_attendance_created_at_idx\` ON \`class_attendance\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`online_classes_id\` integer REFERENCES online_classes(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`class_attendance_id\` integer REFERENCES class_attendance(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_online_classes_id_idx\` ON \`payload_locked_documents_rels\` (\`online_classes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_class_attendance_id_idx\` ON \`payload_locked_documents_rels\` (\`class_attendance_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`online_classes\`;`)
  await db.run(sql`DROP TABLE \`class_attendance\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`case_studies_id\` integer,
  	\`media_id\` integer,
  	\`services_id\` integer,
  	\`courses_id\` integer,
  	\`cities_id\` integer,
  	\`industries_id\` integer,
  	\`testimonials_id\` integer,
  	\`queries_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`courses_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cities_id\`) REFERENCES \`cities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`queries_id\`) REFERENCES \`queries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "posts_id", "pages_id", "case_studies_id", "media_id", "services_id", "courses_id", "cities_id", "industries_id", "testimonials_id", "queries_id", "users_id") SELECT "id", "order", "parent_id", "path", "posts_id", "pages_id", "case_studies_id", "media_id", "services_id", "courses_id", "cities_id", "industries_id", "testimonials_id", "queries_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cities_id_idx\` ON \`payload_locked_documents_rels\` (\`cities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_queries_id_idx\` ON \`payload_locked_documents_rels\` (\`queries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
