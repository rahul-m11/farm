import { Router } from 'express';
import { storage } from './storage.js';
import { insertProductSchema, insertToolSchema, insertRentalSchema, insertChatMessageSchema } from '../shared/schema.js';
import { getFarmingAdvice } from './services/gemini.js';

const router = Router();

// Products routes
router.get('/products', async (req, res) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/products/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const products = await storage.searchProducts(query);
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const validatedData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(validatedData);
    res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Invalid product data', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
});

// Tools routes
router.get('/tools', async (req, res) => {
  try {
    const tools = await storage.getTools();
    res.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

router.get('/tools/available', async (req, res) => {
  try {
    const tools = await storage.getAvailableTools();
    res.json(tools);
  } catch (error) {
    console.error('Error fetching available tools:', error);
    res.status(500).json({ error: 'Failed to fetch available tools' });
  }
});

router.post('/tools', async (req, res) => {
  try {
    const validatedData = insertToolSchema.parse(req.body);
    const tool = await storage.createTool(validatedData);
    res.status(201).json(tool);
  } catch (error: any) {
    console.error('Error creating tool:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Invalid tool data', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create tool' });
    }
  }
});

// Users routes
router.get('/users/:id', async (req, res) => {
  try {
    const user = await storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Don't send password in response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Chat routes
router.get('/chat/:sessionId', async (req, res) => {
  try {
    const messages = await storage.getChatMessages(req.params.sessionId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    // Save user message
    const userMessage = await storage.createChatMessage({
      message,
      sessionId,
      isFromAI: false,
      userId: null, // In a real app, this would come from authentication
    });

    // Get AI response
    const aiResponse = await getFarmingAdvice(message);

    // Save AI message
    const aiMessage = await storage.createChatMessage({
      message: aiResponse,
      sessionId,
      isFromAI: true,
      userId: null,
    });

    res.json({
      userMessage,
      aiMessage,
    });
  } catch (error: any) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Failed to process chat message', details: error.message });
  }
});

// Rentals routes
router.get('/rentals', async (req, res) => {
  try {
    const rentals = await storage.getRentals();
    res.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

router.post('/rentals', async (req, res) => {
  try {
    const validatedData = insertRentalSchema.parse(req.body);
    const rental = await storage.createRental(validatedData);
    res.status(201).json(rental);
  } catch (error: any) {
    console.error('Error creating rental:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ error: 'Invalid rental data', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create rental' });
    }
  }
});

export default router;