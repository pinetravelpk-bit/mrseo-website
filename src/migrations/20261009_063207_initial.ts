import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_takeaways\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_takeaways_order_idx\` ON \`posts_takeaways\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_takeaways_parent_id_idx\` ON \`posts_takeaways\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_paragraph\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_paragraph_order_idx\` ON \`posts_blocks_paragraph\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_paragraph_parent_id_idx\` ON \`posts_blocks_paragraph\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_paragraph_path_idx\` ON \`posts_blocks_paragraph\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_heading2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading2_order_idx\` ON \`posts_blocks_heading2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading2_parent_id_idx\` ON \`posts_blocks_heading2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading2_path_idx\` ON \`posts_blocks_heading2\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_heading3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading3_order_idx\` ON \`posts_blocks_heading3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading3_parent_id_idx\` ON \`posts_blocks_heading3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_heading3_path_idx\` ON \`posts_blocks_heading3\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_items_order_idx\` ON \`posts_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_items_parent_id_idx\` ON \`posts_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ordered\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_order_idx\` ON \`posts_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_parent_id_idx\` ON \`posts_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_path_idx\` ON \`posts_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'tip' NOT NULL,
  	\`title\` text,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_callout_order_idx\` ON \`posts_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_callout_parent_id_idx\` ON \`posts_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_callout_path_idx\` ON \`posts_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_slides_slides_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_slides_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_slides_points_order_idx\` ON \`posts_blocks_slides_slides_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_slides_points_parent_id_idx\` ON \`posts_blocks_slides_slides_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_slides_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_slides_order_idx\` ON \`posts_blocks_slides_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_slides_parent_id_idx\` ON \`posts_blocks_slides_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_order_idx\` ON \`posts_blocks_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_parent_id_idx\` ON \`posts_blocks_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_slides_path_idx\` ON \`posts_blocks_slides\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_steps_order_idx\` ON \`posts_blocks_video_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_steps_parent_id_idx\` ON \`posts_blocks_video_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_order_idx\` ON \`posts_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_parent_id_idx\` ON \`posts_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_path_idx\` ON \`posts_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_items_order_idx\` ON \`posts_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_items_parent_id_idx\` ON \`posts_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_order_idx\` ON \`posts_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_parent_id_idx\` ON \`posts_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_stats_path_idx\` ON \`posts_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_bars_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` numeric NOT NULL,
  	\`display\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_bars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_bars_items_order_idx\` ON \`posts_blocks_bars_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_bars_items_parent_id_idx\` ON \`posts_blocks_bars_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_bars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_bars_order_idx\` ON \`posts_blocks_bars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_bars_parent_id_idx\` ON \`posts_blocks_bars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_bars_path_idx\` ON \`posts_blocks_bars\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_order_idx\` ON \`posts_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_steps_parent_id_idx\` ON \`posts_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_order_idx\` ON \`posts_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_parent_id_idx\` ON \`posts_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_process_path_idx\` ON \`posts_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_left_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_compare\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_left_items_order_idx\` ON \`posts_blocks_compare_left_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_left_items_parent_id_idx\` ON \`posts_blocks_compare_left_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare_right_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_compare\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_right_items_order_idx\` ON \`posts_blocks_compare_right_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_right_items_parent_id_idx\` ON \`posts_blocks_compare_right_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_compare\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`left_label\` text NOT NULL,
  	\`right_label\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_order_idx\` ON \`posts_blocks_compare\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_parent_id_idx\` ON \`posts_blocks_compare\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_compare_path_idx\` ON \`posts_blocks_compare\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_checklist_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_checklist\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_checklist_items_order_idx\` ON \`posts_blocks_checklist_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_checklist_items_parent_id_idx\` ON \`posts_blocks_checklist_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_checklist_order_idx\` ON \`posts_blocks_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_checklist_parent_id_idx\` ON \`posts_blocks_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_checklist_path_idx\` ON \`posts_blocks_checklist\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_table_head\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_head_order_idx\` ON \`posts_blocks_table_head\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_head_parent_id_idx\` ON \`posts_blocks_table_head\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_table_rows_cells\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_table_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_rows_cells_order_idx\` ON \`posts_blocks_table_rows_cells\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_rows_cells_parent_id_idx\` ON \`posts_blocks_table_rows_cells\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_table_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_rows_order_idx\` ON \`posts_blocks_table_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_rows_parent_id_idx\` ON \`posts_blocks_table_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_order_idx\` ON \`posts_blocks_table\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_parent_id_idx\` ON \`posts_blocks_table\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_table_path_idx\` ON \`posts_blocks_table\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`cite\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_order_idx\` ON \`posts_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_parent_id_idx\` ON \`posts_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_path_idx\` ON \`posts_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_sources_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_sources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_sources_items_order_idx\` ON \`posts_blocks_sources_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_sources_items_parent_id_idx\` ON \`posts_blocks_sources_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_sources_order_idx\` ON \`posts_blocks_sources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_sources_parent_id_idx\` ON \`posts_blocks_sources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_sources_path_idx\` ON \`posts_blocks_sources\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_faqs_order_idx\` ON \`posts_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_faqs_parent_id_idx\` ON \`posts_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_related\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_related_order_idx\` ON \`posts_related\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_related_parent_id_idx\` ON \`posts_related\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`keyword\` text NOT NULL,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`publish_at\` text NOT NULL,
  	\`content_updated_at\` text,
  	\`hide_from_site\` integer,
  	\`category\` text NOT NULL,
  	\`accent\` text DEFAULT 'green' NOT NULL,
  	\`icon\` text DEFAULT 'search' NOT NULL,
  	\`feature_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`feature_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_publish_at_idx\` ON \`posts\` (\`publish_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_feature_image_idx\` ON \`posts\` (\`feature_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_sections_order_idx\` ON \`pages_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_sections_parent_id_idx\` ON \`pages_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_faqs_order_idx\` ON \`pages_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_faqs_parent_id_idx\` ON \`pages_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`published\` integer DEFAULT true,
  	\`noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_results\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_results_order_idx\` ON \`case_studies_results\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_results_parent_id_idx\` ON \`case_studies_results\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_sections_order_idx\` ON \`case_studies_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_sections_parent_id_idx\` ON \`case_studies_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_faqs_order_idx\` ON \`case_studies_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_faqs_parent_id_idx\` ON \`case_studies_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`client\` text,
  	\`industry\` text,
  	\`city\` text,
  	\`summary\` text NOT NULL,
  	\`image_id\` integer,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`published\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_image_idx\` ON \`case_studies\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE TABLE \`services_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sections_order_idx\` ON \`services_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sections_parent_id_idx\` ON \`services_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faqs_order_idx\` ON \`services_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faqs_parent_id_idx\` ON \`services_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`sub\` text,
  	\`desc\` text NOT NULL,
  	\`icon\` text,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`courses_outcomes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_outcomes_order_idx\` ON \`courses_outcomes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_outcomes_parent_id_idx\` ON \`courses_outcomes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_tools\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_tools_order_idx\` ON \`courses_tools\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_tools_parent_id_idx\` ON \`courses_tools\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_sections_order_idx\` ON \`courses_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_sections_parent_id_idx\` ON \`courses_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_faqs_order_idx\` ON \`courses_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_faqs_parent_id_idx\` ON \`courses_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`tier\` text DEFAULT 'pro' NOT NULL,
  	\`sub\` text,
  	\`short\` text,
  	\`desc\` text NOT NULL,
  	\`duration\` text NOT NULL,
  	\`hours\` text,
  	\`level\` text,
  	\`fee\` text NOT NULL,
  	\`fee_note\` text,
  	\`seats\` text,
  	\`mode\` text,
  	\`intern\` text,
  	\`schedule\` text,
  	\`icon\` text,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cities_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cities_sections_order_idx\` ON \`cities_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cities_sections_parent_id_idx\` ON \`cities_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cities_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cities_faqs_order_idx\` ON \`cities_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cities_faqs_parent_id_idx\` ON \`cities_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`urdu\` text,
  	\`note\` text,
  	\`clients\` text,
  	\`comp\` text,
  	\`pop\` text,
  	\`icon\` text,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cities_slug_idx\` ON \`cities\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`cities_updated_at_idx\` ON \`cities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cities_created_at_idx\` ON \`cities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industries_kws\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_kws_order_idx\` ON \`industries_kws\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_kws_parent_id_idx\` ON \`industries_kws\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_stats_order_idx\` ON \`industries_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_stats_parent_id_idx\` ON \`industries_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_sections_order_idx\` ON \`industries_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_sections_parent_id_idx\` ON \`industries_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_faqs_order_idx\` ON \`industries_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_faqs_parent_id_idx\` ON \`industries_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`urdu\` text,
  	\`desc\` text NOT NULL,
  	\`icon\` text,
  	\`quick\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_slug_idx\` ON \`industries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`city\` text,
  	\`text\` text NOT NULL,
  	\`order\` numeric DEFAULT 100,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`queries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'contact' NOT NULL,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text,
  	\`phone\` text,
  	\`city\` text,
  	\`service\` text,
  	\`website\` text,
  	\`course\` text,
  	\`mode\` text,
  	\`education\` text,
  	\`message\` text,
  	\`notes\` text,
  	\`page\` text,
  	\`ip\` text,
  	\`emailed\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`queries_updated_at_idx\` ON \`queries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`queries_created_at_idx\` ON \`queries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`settings_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`settings_socials_order_idx\` ON \`settings_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`settings_socials_parent_id_idx\` ON \`settings_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`settings_founder_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`settings_founder_same_as_order_idx\` ON \`settings_founder_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`settings_founder_same_as_parent_id_idx\` ON \`settings_founder_same_as\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`owner_name\` text NOT NULL,
  	\`brand_tagline\` text,
  	\`email\` text NOT NULL,
  	\`whatsapp\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`base_city\` text NOT NULL,
  	\`base_region\` text,
  	\`campus\` text NOT NULL,
  	\`campus_city\` text NOT NULL,
  	\`campus_area\` text,
  	\`office_hours\` text,
  	\`years_experience\` text,
  	\`websites_ranked\` text,
  	\`clients_served\` text,
  	\`footer_text\` text,
  	\`author_bio\` text,
  	\`whatsapp_message\` text,
  	\`default_meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_hero_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_points_order_idx\` ON \`home_hero_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_hero_points_parent_id_idx\` ON \`home_hero_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_stats_order_idx\` ON \`home_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_hero_stats_parent_id_idx\` ON \`home_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_card_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_card_points_order_idx\` ON \`home_card_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_card_points_parent_id_idx\` ON \`home_card_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_steps_order_idx\` ON \`home_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_steps_parent_id_idx\` ON \`home_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_whys\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_whys_order_idx\` ON \`home_whys\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_whys_parent_id_idx\` ON \`home_whys\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_faqs_order_idx\` ON \`home_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_faqs_parent_id_idx\` ON \`home_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`hero_eyebrow\` text,
  	\`hero_title\` text,
  	\`hero_desc\` text,
  	\`card_role\` text,
  	\`card_location\` text,
  	\`card_label\` text,
  	\`answer_label\` text,
  	\`answer_text\` text,
  	\`services_head_eyebrow\` text,
  	\`services_head_title\` text,
  	\`services_head_sub\` text,
  	\`courses_head_eyebrow\` text,
  	\`courses_head_title\` text,
  	\`courses_head_sub\` text,
  	\`short_title\` text,
  	\`short_text\` text,
  	\`cities_head_eyebrow\` text,
  	\`cities_head_title\` text,
  	\`cities_head_sub\` text,
  	\`industries_head_eyebrow\` text,
  	\`industries_head_title\` text,
  	\`industries_head_sub\` text,
  	\`process_head_eyebrow\` text,
  	\`process_head_title\` text,
  	\`why_head_eyebrow\` text,
  	\`why_head_title\` text,
  	\`testimonials_head_eyebrow\` text,
  	\`testimonials_head_title\` text,
  	\`faq_head_eyebrow\` text,
  	\`faq_head_title\` text,
  	\`contact_head_eyebrow\` text,
  	\`contact_head_title\` text,
  	\`contact_head_sub\` text,
  	\`cta_title\` text,
  	\`cta_text\` text,
  	\`cta_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`about_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_stats_order_idx\` ON \`about_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_stats_parent_id_idx\` ON \`about_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_sections_order_idx\` ON \`about_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_sections_parent_id_idx\` ON \`about_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`card_role\` text,
  	\`card_location\` text,
  	\`card_skills\` text,
  	\`answer\` text,
  	\`industries_head_eyebrow\` text,
  	\`industries_head_title\` text,
  	\`cta_title\` text,
  	\`cta_text\` text,
  	\`cta_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_page_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_faqs_order_idx\` ON \`contact_page_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_faqs_parent_id_idx\` ON \`contact_page_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`desc\` text,
  	\`faq_head_eyebrow\` text,
  	\`faq_head_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`courses_page_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_badges_order_idx\` ON \`courses_page_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_badges_parent_id_idx\` ON \`courses_page_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_includes_pro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_includes_pro_order_idx\` ON \`courses_page_includes_pro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_includes_pro_parent_id_idx\` ON \`courses_page_includes_pro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_includes_short\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_includes_short_order_idx\` ON \`courses_page_includes_short\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_includes_short_parent_id_idx\` ON \`courses_page_includes_short\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_how_it_runs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_how_it_runs_order_idx\` ON \`courses_page_how_it_runs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_how_it_runs_parent_id_idx\` ON \`courses_page_how_it_runs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_campus_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_campus_facts_order_idx\` ON \`courses_page_campus_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_campus_facts_parent_id_idx\` ON \`courses_page_campus_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_faqs_order_idx\` ON \`courses_page_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_faqs_parent_id_idx\` ON \`courses_page_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`desc\` text,
  	\`answer_question\` text,
  	\`answer\` text,
  	\`pro_head_eyebrow\` text,
  	\`pro_head_title\` text,
  	\`pro_head_sub\` text,
  	\`short_head_eyebrow\` text,
  	\`short_head_title\` text,
  	\`short_head_sub\` text,
  	\`short_note\` text,
  	\`includes_head_eyebrow\` text,
  	\`includes_head_title\` text,
  	\`includes_head_sub\` text,
  	\`how_head_eyebrow\` text,
  	\`how_head_title\` text,
  	\`apply_head_eyebrow\` text,
  	\`apply_head_title\` text,
  	\`apply_head_sub\` text,
  	\`faq_head_eyebrow\` text,
  	\`faq_head_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`hub_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`services_meta_title\` text,
  	\`services_meta_description\` text,
  	\`services_eyebrow\` text,
  	\`services_title\` text,
  	\`services_desc\` text,
  	\`locations_meta_title\` text,
  	\`locations_meta_description\` text,
  	\`locations_eyebrow\` text,
  	\`locations_title\` text,
  	\`locations_desc\` text,
  	\`industries_meta_title\` text,
  	\`industries_meta_description\` text,
  	\`industries_eyebrow\` text,
  	\`industries_title\` text,
  	\`industries_desc\` text,
  	\`blog_meta_title\` text,
  	\`blog_meta_description\` text,
  	\`blog_eyebrow\` text,
  	\`blog_title\` text,
  	\`blog_desc\` text,
  	\`case_studies_meta_title\` text,
  	\`case_studies_meta_description\` text,
  	\`case_studies_eyebrow\` text,
  	\`case_studies_title\` text,
  	\`case_studies_desc\` text,
  	\`audit_head_eyebrow\` text,
  	\`audit_head_title\` text,
  	\`audit_head_sub\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_takeaways\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_paragraph\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_heading2\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_heading3\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_slides_slides_points\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_slides_slides\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_slides\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video_steps\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_bars_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_bars\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_left_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare_right_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_compare\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_checklist_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_checklist\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_table_head\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_table_rows_cells\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_table_rows\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_table\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_sources_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_sources\`;`)
  await db.run(sql`DROP TABLE \`posts_faqs\`;`)
  await db.run(sql`DROP TABLE \`posts_related\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`pages_sections\`;`)
  await db.run(sql`DROP TABLE \`pages_faqs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`case_studies_results\`;`)
  await db.run(sql`DROP TABLE \`case_studies_sections\`;`)
  await db.run(sql`DROP TABLE \`case_studies_faqs\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`services_sections\`;`)
  await db.run(sql`DROP TABLE \`services_faqs\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`courses_outcomes\`;`)
  await db.run(sql`DROP TABLE \`courses_tools\`;`)
  await db.run(sql`DROP TABLE \`courses_sections\`;`)
  await db.run(sql`DROP TABLE \`courses_faqs\`;`)
  await db.run(sql`DROP TABLE \`courses\`;`)
  await db.run(sql`DROP TABLE \`cities_sections\`;`)
  await db.run(sql`DROP TABLE \`cities_faqs\`;`)
  await db.run(sql`DROP TABLE \`cities\`;`)
  await db.run(sql`DROP TABLE \`industries_kws\`;`)
  await db.run(sql`DROP TABLE \`industries_stats\`;`)
  await db.run(sql`DROP TABLE \`industries_sections\`;`)
  await db.run(sql`DROP TABLE \`industries_faqs\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`queries\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`settings_socials\`;`)
  await db.run(sql`DROP TABLE \`settings_founder_same_as\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`DROP TABLE \`home_hero_points\`;`)
  await db.run(sql`DROP TABLE \`home_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`home_card_points\`;`)
  await db.run(sql`DROP TABLE \`home_steps\`;`)
  await db.run(sql`DROP TABLE \`home_whys\`;`)
  await db.run(sql`DROP TABLE \`home_faqs\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`about_stats\`;`)
  await db.run(sql`DROP TABLE \`about_sections\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`DROP TABLE \`contact_page_faqs\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`courses_page_badges\`;`)
  await db.run(sql`DROP TABLE \`courses_page_includes_pro\`;`)
  await db.run(sql`DROP TABLE \`courses_page_includes_short\`;`)
  await db.run(sql`DROP TABLE \`courses_page_how_it_runs\`;`)
  await db.run(sql`DROP TABLE \`courses_page_campus_facts\`;`)
  await db.run(sql`DROP TABLE \`courses_page_faqs\`;`)
  await db.run(sql`DROP TABLE \`courses_page\`;`)
  await db.run(sql`DROP TABLE \`hub_pages\`;`)
}
