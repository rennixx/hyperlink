import express from 'express';
import cors from 'cors';
import conceptRoutes from './routes/concepts.js';
import relationshipRoutes from './routes/relationships.js';
import graphRoutes from './routes/graph.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/concepts', conceptRoutes);
app.use('/api/relationships', relationshipRoutes);
app.use('/api/graph', graphRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🌐 Hyperlink API running on http://localhost:${PORT}`);
});
