CREATE INDEX `idx_providers_status` ON `providers` (`status`);--> statement-breakpoint
CREATE INDEX `idx_services_status_created` ON `services` (`status`,`created_at`);