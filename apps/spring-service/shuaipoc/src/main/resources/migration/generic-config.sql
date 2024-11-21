create table
  public.generic_config (
    key character varying not null,
    config character varying not null default '""'::character varying,
    validation character varying not null default '""'::character varying,
    version bigint not null default '0'::bigint,
    updated_at timestamp with time zone null default now(),
    created_at timestamp with time zone not null default now(),
    constraint generic_config_pkey primary key (key),
    constraint generic_config_key_key unique (key)
  ) tablespace pg_default;