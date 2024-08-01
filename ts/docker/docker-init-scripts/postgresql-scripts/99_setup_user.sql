CREATE USER estetixs WITH PASSWORD 'estetixs';
GRANT CONNECT ON DATABASE api_db TO estetixs;
GRANT USAGE ON SCHEMA public TO estetixs;

-- Grant SELECT, INSERT, and UPDATE privileges on all current tables in the public schema
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO estetixs;

-- Set default privileges for future tables so that estetixs can SELECT, INSERT, and UPDATE
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE ON TABLES TO estetixs;

-- No need to REVOKE DELETE, since it's not granted by default

-- Optionally, explicitly revoke DELETE if needed
REVOKE DELETE ON ALL TABLES IN SCHEMA public FROM estetixs;
