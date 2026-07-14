import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.GEMINI_SUPABASE_URL;
const supabaseKey = process.env.GEMINI_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/items
 * Fetches entries, ordered newest first to match frontend layout requirements
 */

app.get('/', async (req, res) => {
  res.send('Welcome to the Gemini Server!');
});
app.get('/api/items', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map keys so your current frontend properties (. _id & .createdAt) don't break
    const formattedData = data.map(item => ({
      _id: item.id,
      title: item.title,
      description: item.description,
      createdAt: item.created_at
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch items from Supabase.' });
  }
});

/**
 * POST /api/items
 * Adds a new entry into the database
 */
app.post('/api/items', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    // Note: In supabase-js v2, you must explicitly chain .select() to get the inserted object back
    const { data, error } = await supabase
      .from('items')
      .insert([{ title, description }])
      .select()
      .single();

    if (error) throw error;

    // Normalize output structure for front-end consumption
    const formattedItem = {
      _id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.created_at
    };

    res.status(201).json(formattedItem);
  } catch (err) {
    console.error('Insert Error:', err.message);
    res.status(500).json({ error: 'Failed to create item in Supabase.' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});