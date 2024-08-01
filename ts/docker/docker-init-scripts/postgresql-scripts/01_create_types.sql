CREATE TYPE user_role AS ENUM ('Admin', 'Patient', 'Doctor');

CREATE TYPE appointment_status AS ENUM ('Waiting', 'Confirmed', 'Cancelled');
CREATE TYPE appointment_type AS ENUM ('Video', 'In-Person');

CREATE TYPE service_status AS ENUM ('Created', 'In-Progress', 'Completed', 'Cancelled');