\echo 'Delete and recreate housescraper db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS housescraper;
CREATE DATABASE housescraper;
\c housescraper

\i house-scraper-schema.sql
\i seed.sql


\echo 'Delete and recreate houseScraper_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE house_scraper_test;
CREATE DATABASE house_scraper_test;
\connect house_scraper_test

\i house-scraper-schema.sql

-- psql housescraper -f housescraper.sql

