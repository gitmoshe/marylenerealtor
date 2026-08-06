ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS price_list jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS floor_plans jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS masterplan_image text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS progress jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS virtual_tour_url text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS developer_name text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS developer_logo text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS developer_blurb text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS amenities text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS payment_plan_summary text NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS ficha jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS sub_listings text[] NOT NULL DEFAULT '{}'::text[];