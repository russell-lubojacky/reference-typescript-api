-- Create the new database constructed_assets
CREATE DATABASE constructed_assets;

-- Switch to the constructed_assets database
\c constructed_assets;

-- Create the trail schema
CREATE SCHEMA trail;

-- Load the pgcrypto module for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE trail.trail_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    length INTEGER NOT NULL
);

INSERT INTO trail.trail_core (name, difficulty, length) VALUES
('Trail A', 'Easy', 10),
('Trail B', 'Moderate', 20),
('Trail C', 'Difficult', 30);
