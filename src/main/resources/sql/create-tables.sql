CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE foos (
    id   uuid        NOT NULL DEFAULT gen_random_uuid(),
    name varchar(50) NOT NULL,
    CONSTRAINT foos_pk PRIMARY KEY (id)
);
