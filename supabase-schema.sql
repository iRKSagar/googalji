-- ─────────────────────────────────────────────────────────────────────────────
-- GOOGALJI — Supabase Schema
-- Run this in your new Supabase project SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Topics queue (numerology topics for the council)
CREATE TABLE googalji_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_topic text NOT NULL,
  category char(1) NOT NULL CHECK (category IN ('A','B','C','D','E','F')),
  used boolean DEFAULT false,
  blacklist_cleared boolean DEFAULT true,
  engagement_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Generated scripts
CREATE TABLE googalji_scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES googalji_topics(id),
  category char(1),
  raw_topic text,
  beat1 text,                   -- plain universal observation (equivalent of setup)
  beats jsonb,                  -- array of {text, pause_after} — beats 2, 3, exit
  scene text,
  prop text,
  expression text,
  theme_tags text[],
  published boolean DEFAULT false,
  published_at timestamptz,
  youtube_video_id text,
  instagram_media_id text,
  created_at timestamptz DEFAULT now()
);

-- Video assets (voice, image, assembled video)
CREATE TABLE googalji_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid REFERENCES googalji_scripts(id),
  voice_file_url text,
  image_url text,
  video_url text,
  created_at timestamptz DEFAULT now()
);

-- Settings (outro_sound_url, outro_bg_url, logo_url, leather_panel_url)
CREATE TABLE googalji_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Seed default settings rows
INSERT INTO googalji_settings (key, value) VALUES
  ('outro_sound_url', 'PLACEHOLDER'),
  ('outro_bg_url', NULL),
  ('logo_url', NULL),
  ('leather_panel_url', NULL);

-- Storage bucket
-- Create manually in Supabase dashboard: Storage → New bucket → "googalji-media" → Public
-- Or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('googalji-media', 'googalji-media', true);

-- Indexes
CREATE INDEX idx_googalji_scripts_published ON googalji_scripts(published, created_at DESC);
CREATE INDEX idx_googalji_scripts_category  ON googalji_scripts(category);
CREATE INDEX idx_googalji_videos_script_id  ON googalji_videos(script_id);
CREATE INDEX idx_googalji_topics_used       ON googalji_topics(used, blacklist_cleared, engagement_score DESC);
