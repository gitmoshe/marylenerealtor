CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  developer text NOT NULL DEFAULT 'To be confirmed',
  location text NOT NULL DEFAULT 'Riviera Maya',
  type text NOT NULL DEFAULT 'Pre-construction',
  tier text NOT NULL DEFAULT 'portfolio',
  status text NOT NULL DEFAULT 'Selling now',
  delivery text NOT NULL DEFAULT 'To be confirmed',
  price_from bigint NOT NULL DEFAULT 0,
  bedrooms text NOT NULL DEFAULT '',
  size_range text NOT NULL DEFAULT 'To be confirmed',
  highlights text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  hero_image text NOT NULL DEFAULT '',
  gallery text[] NOT NULL DEFAULT '{}',
  video_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  collections text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.listings TO anon;
GRANT SELECT ON public.listings TO authenticated;
GRANT ALL ON public.listings TO service_role;

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Listings are publicly readable"
  ON public.listings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER listings_set_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.listings (slug, name, developer, location, type, tier, status, delivery, price_from, bedrooms, size_range, highlights, description, hero_image, gallery, featured, collections, sort_order) VALUES
('latitud-365','LATITUD 365','LATITUD Properties','Riviera Maya','Pre-construction','master-broker','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Master-broker mandate','Selling now','Riviera Maya'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-a',ARRAY['asset:listing-b','asset:listing-c','asset:listing-d','asset:property-1'],true,ARRAY['Signature'],10),
('viceroy-playa-del-carmen-residences','Viceroy Playa del Carmen Residences','Viceroy Hotels & Resorts','Playa del Carmen','Branded Residence','portfolio','Selling now','To be confirmed',0,'1 – 4','To be confirmed',ARRAY['Branded residence','Hotel services','Playa del Carmen'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-b',ARRAY['asset:listing-a','asset:property-1','asset:property-3'],true,ARRAY['Branded Residences'],20),
('la-reserva','La Reserva','To be confirmed','Tulum','Pre-construction','portfolio','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Pre-construction pricing','Tulum','Nature-led masterplan'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-c',ARRAY['asset:cenote','asset:property-2','asset:listing-a'],true,ARRAY['Tulum Collection'],30),
('azulik-residences','Azulik Residences','Azulik','Tulum','Pre-construction','portfolio','Selling now','To be confirmed',595000,'1 – 3','To be confirmed',ARRAY['Signature architecture','Tulum','From $595,000 USD'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:property-2',ARRAY['asset:cenote','asset:listing-c','asset:listing-a'],true,ARRAY['Tulum Collection'],40),
('macondo','Macondo','To be confirmed','Playacar','Pre-construction','portfolio','Selling now','Dec 2027',0,'2 – 3','To be confirmed',ARRAY['Playacar','Delivery Dec 2027','Gated community'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-d',ARRAY['asset:property-1','asset:listing-a','asset:property-3'],false,ARRAY['Playacar Collection'],50),
('bakaba','Bakaba','To be confirmed','Playacar','Pre-construction','portfolio','Selling now','To be confirmed',0,'2 – 3','To be confirmed',ARRAY['Playacar','Pre-construction pricing','Golf community'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:property-1',ARRAY['asset:listing-d','asset:listing-a','asset:property-3'],false,ARRAY['Playacar Collection'],60),
('soleii-fase-i','Soleii Fase I','To be confirmed','Playacar','Pre-construction','portfolio','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Playacar','First phase','Pre-construction pricing'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-a',ARRAY['asset:listing-d','asset:property-1','asset:coastline'],false,ARRAY['Playacar Collection'],70),
('casa-de-piedra','Casa de Piedra','To be confirmed','Playacar','Pre-construction','portfolio','Selling now','To be confirmed',0,'2 – 4','To be confirmed',ARRAY['Playacar','Limited residences','Stone and timber palette'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:property-3',ARRAY['asset:listing-d','asset:listing-a','asset:property-1'],false,ARRAY['Playacar Collection'],80),
('sonni','Sonni','To be confirmed','Playa del Carmen','Pre-construction','portfolio','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Playa del Carmen','Walkable location','Pre-construction pricing'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:hero-villa',ARRAY['asset:listing-b','asset:property-1','asset:listing-a'],false,'{}',90),
('tierra-madre','Tierra Madre','To be confirmed','Riviera Maya','Pre-construction','portfolio','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Riviera Maya','Nature-led masterplan','Pre-construction pricing'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:cenote',ARRAY['asset:listing-c','asset:property-2','asset:listing-a'],false,'{}',100),
('junglar-kaybe','Junglar Kaybe','To be confirmed','Riviera Maya','Pre-construction','portfolio','Selling now','To be confirmed',0,'1 – 3','To be confirmed',ARRAY['Riviera Maya','Jungle setting','Boutique scale'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-c',ARRAY['asset:cenote','asset:property-2','asset:listing-a'],false,'{}',110),
('nautila-beachfront','Nautila Beachfront','To be confirmed','Riviera Maya','Pre-construction','portfolio','Selling now','July 2027',0,'1 – 3','To be confirmed',ARRAY['Beachfront','Delivery July 2027','Riviera Maya'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:coastline',ARRAY['asset:listing-b','asset:property-3','asset:listing-a'],false,ARRAY['Beachfront'],120),
('amanai-villas-golf','Amanai Villas & Golf','To be confirmed','Riviera Maya','Villa','portfolio','Selling now','To be confirmed',0,'3 – 4','To be confirmed',ARRAY['Golf community','Private villas','Riviera Maya'],'Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.','asset:listing-d',ARRAY['asset:property-1','asset:listing-a','asset:coastline'],false,ARRAY['Golf'],130);