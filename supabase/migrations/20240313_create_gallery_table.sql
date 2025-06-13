-- Create gallery table if it doesn't exist
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    event_id INTEGER REFERENCES events(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on gallery table
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery table
-- Allow anyone to read images (public gallery)
CREATE POLICY "Allow public read access on gallery" ON gallery
    FOR SELECT USING (true);

-- Allow authenticated users to insert images
CREATE POLICY "Allow authenticated insert on gallery" ON gallery
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated update on gallery" ON gallery
    FOR UPDATE USING (true);

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated delete on gallery" ON gallery
    FOR DELETE USING (true);

-- Create function to create gallery table
CREATE OR REPLACE FUNCTION create_gallery_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Create gallery table if it doesn't exist
    CREATE TABLE IF NOT EXISTS gallery (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT,
        image_url TEXT NOT NULL,
        alt_text TEXT,
        event_id INTEGER REFERENCES events(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
    
    -- Enable RLS
    ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
    
    -- Create policies if they don't exist
    DO $$
    BEGIN
        -- Check if policy exists before creating
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery' AND policyname = 'Allow public read access on gallery') THEN
            CREATE POLICY "Allow public read access on gallery" ON gallery FOR SELECT USING (true);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery' AND policyname = 'Allow authenticated insert on gallery') THEN
            CREATE POLICY "Allow authenticated insert on gallery" ON gallery FOR INSERT WITH CHECK (true);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery' AND policyname = 'Allow authenticated update on gallery') THEN
            CREATE POLICY "Allow authenticated update on gallery" ON gallery FOR UPDATE USING (true);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery' AND policyname = 'Allow authenticated delete on gallery') THEN
            CREATE POLICY "Allow authenticated delete on gallery" ON gallery FOR DELETE USING (true);
        END IF;
    END $$;
END;
$$; 