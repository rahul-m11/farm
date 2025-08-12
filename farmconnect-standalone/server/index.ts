import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', router);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/client')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });
} else {
  // Development mode - Vite will handle the frontend
  app.get('/', (req, res) => {
    res.json({ 
      message: 'FarmConnect API Server',
      status: 'running',
      environment: 'development'
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 FarmConnect server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🎨 Frontend dev server should be running on http://localhost:3000`);
  }
});