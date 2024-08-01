CREATE USER estetixs_api WITH PASSWORD 'estetixs_api';
GRANT CONNECT ON DATABASE api_db TO estetixs_api;
GRANT USAGE ON SCHEMA public TO estetixs_api;

-- Grant SELECT, INSERT, and UPDATE privileges on all current tables in the public schema
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO estetixs_api;

-- Set default privileges for future tables so that estetixs_api can SELECT, INSERT, and UPDATE
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE ON TABLES TO estetixs_api;

-- No need to REVOKE DELETE, since it's not granted by default

-- Optionally, explicitly revoke DELETE if needed
REVOKE DELETE ON ALL TABLES IN SCHEMA public FROM estetixs_api;
