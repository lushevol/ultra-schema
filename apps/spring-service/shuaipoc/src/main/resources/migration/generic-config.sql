CREATE TABLE generic_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE,
    config VARCHAR(255),
    validation VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);