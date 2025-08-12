import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertToolSchema, insertRentalSchema, insertChatMessageSchema } from "@shared/schema";
import { getFarmingAdvice } from "./services/gemini";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.json([]);
      }
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Tools API
  app.get("/api/tools", async (_req, res) => {
    try {
      const tools = await storage.getTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tools" });
    }
  });

  app.get("/api/tools/available", async (_req, res) => {
    try {
      const tools = await storage.getAvailableTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available tools" });
    }
  });

  app.get("/api/tools/:id", async (req, res) => {
    try {
      const tool = await storage.getTool(req.params.id);
      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tool" });
    }
  });

  app.post("/api/tools", async (req, res) => {
    try {
      const toolData = insertToolSchema.parse(req.body);
      const tool = await storage.createTool(toolData);
      res.status(201).json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tool data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tool" });
    }
  });

  // Rentals API
  app.post("/api/rentals", async (req, res) => {
    try {
      const rentalData = insertRentalSchema.parse(req.body);
      const rental = await storage.createRental(rentalData);
      
      // Update tool availability
      await storage.updateTool(rentalData.toolId, { 
        isAvailable: false,
        nextAvailableDate: new Date(rentalData.endDate)
      });
      
      res.status(201).json(rental);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid rental data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rental" });
    }
  });

  app.get("/api/rentals/user/:userId", async (req, res) => {
    try {
      const rentals = await storage.getRentalsByRenter(req.params.userId);
      res.json(rentals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user rentals" });
    }
  });

  // Chat API
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createChatMessage(messageData);
      
      // Get AI response
      const aiResponse = await getFarmingAdvice(messageData.message);
      
      // Save AI response
      const aiMessage = await storage.createChatMessage({
        ...messageData,
        message: aiResponse.message,
        isFromAI: true,
      });
      
      res.json({ userMessage, aiMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Users API
  app.post("/api/users", async (req, res) => {
    try {
      const userData = req.body;
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
