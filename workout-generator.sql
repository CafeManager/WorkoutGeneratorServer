\echo 'Delete and recreate workout_generator db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE workout_generator;
CREATE DATABASE workout_generator;
\connect workout_generator

\i workout-generator-schema.sql
\i workout-generator-seed.sql

