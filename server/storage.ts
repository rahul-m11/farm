import { type User, type InsertUser, type Product, type InsertProduct, type Tool, type InsertTool, type Rental, type InsertRental, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByFarmer(farmerId: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Tools
  getTools(): Promise<Tool[]>;
  getTool(id: string): Promise<Tool | undefined>;
  getToolsByOwner(ownerId: string): Promise<Tool[]>;
  getAvailableTools(): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(id: string, updates: Partial<InsertTool>): Promise<Tool | undefined>;
  deleteTool(id: string): Promise<boolean>;
  
  // Rentals
  getRental(id: string): Promise<Rental | undefined>;
  getRentalsByRenter(renterId: string): Promise<Rental[]>;
  getRentalsByTool(toolId: string): Promise<Rental[]>;
  createRental(rental: InsertRental): Promise<Rental>;
  updateRental(id: string, updates: Partial<InsertRental>): Promise<Rental | undefined>;
  
  // Chat Messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private tools: Map<string, Tool>;
  private rentals: Map<string, Rental>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.tools = new Map();
    this.rentals = new Map();
    this.chatMessages = new Map();
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create sample users
    const farmer1 = await this.createUser({
      username: "greenvalley",
      email: "john@greenvalleyfarm.com",
      password: "hashedpassword",
      fullName: "John Smith",
      phoneNumber: "+1 (555) 123-4567",
      location: "California, USA",
      farmName: "Green Valley Farm",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    });

    const farmer2 = await this.createUser({
      username: "sunshineacres",
      email: "maria@sunshineacres.com", 
      password: "hashedpassword",
      fullName: "Maria Rodriguez",
      phoneNumber: "+1 (555) 987-6543",
      location: "Texas, USA",
      farmName: "Sunshine Acres",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
    });

    // Create sample products
    const sampleProducts = [
      {
        name: "Organic Tomatoes",
        description: "Fresh, vine-ripened organic tomatoes grown using sustainable farming practices. Perfect for salads, cooking, or preserving.",
        price: "4.99",
        unit: "per lb",
        category: "vegetables",
        imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: true,
        farmerId: farmer1.id,
        stock: 50,
        location: "California, USA"
      },
      {
        name: "Farm Fresh Apples",
        description: "Crisp and sweet apples picked at peak ripeness. Various varieties available including Honeycrisp and Gala.",
        price: "3.49",
        unit: "per lb", 
        category: "fruits",
        imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: false,
        farmerId: farmer2.id,
        stock: 75,
        location: "Texas, USA"
      },
      {
        name: "Free-Range Eggs",
        description: "Fresh eggs from happy, pasture-raised chickens. Rich golden yolks and superior flavor from chickens that roam freely.",
        price: "5.99",
        unit: "per dozen",
        category: "dairy",
        imageUrl: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: true,
        farmerId: farmer1.id,
        stock: 30,
        location: "California, USA"
      },
      {
        name: "Organic Carrots",
        description: "Sweet, crunchy organic carrots grown in rich soil. Perfect for snacking, juicing, or cooking.",
        price: "2.99",
        unit: "per bunch",
        category: "vegetables",
        imageUrl: "https://images.unsplash.com/photo-1445282768818-728615cc89ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: true,
        farmerId: farmer2.id,
        stock: 40,
        location: "Texas, USA"
      },
      {
        name: "Fresh Basil",
        description: "Aromatic fresh basil grown in greenhouse conditions. Perfect for cooking, making pesto, or garnishing dishes.",
        price: "2.49",
        unit: "per bunch",
        category: "herbs",
        imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: true,
        farmerId: farmer1.id,
        stock: 25,
        location: "California, USA"
      },
      {
        name: "Seasonal Strawberries",
        description: "Juicy, sweet strawberries picked at peak ripeness. Local seasonal variety with incredible flavor and aroma.",
        price: "6.99",
        unit: "per pint",
        category: "fruits",
        imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isOrganic: false,
        farmerId: farmer2.id,
        stock: 20,
        location: "Texas, USA"
      }
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }

    // Create sample tools
    const sampleTools = [
      {
        name: "John Deere Compact Tractor",
        description: "Reliable 25HP compact tractor perfect for small to medium farming operations. Includes front loader attachment.",
        dailyRate: "150.00",
        category: "tractors",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: farmer1.id,
        location: "California, USA",
        isAvailable: true
      },
      {
        name: "Professional Rototiller",
        description: "Heavy-duty rototiller for breaking ground and soil preparation. 8HP engine with adjustable tilling depth.",
        dailyRate: "75.00",
        category: "soil preparation",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: farmer2.id,
        location: "Texas, USA",
        isAvailable: true
      },
      {
        name: "Irrigation System Kit",
        description: "Complete drip irrigation system for up to 2 acres. Includes timers, filters, and distribution tubing.",
        dailyRate: "45.00",
        category: "irrigation",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: farmer1.id,
        location: "California, USA", 
        isAvailable: false,
        nextAvailableDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Available in 3 days
      },
      {
        name: "Seed Planter",
        description: "Precision seed planter for accurate spacing and depth control. Suitable for various seed types and row spacing.",
        dailyRate: "85.00",
        category: "planting",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        ownerId: farmer2.id,
        location: "Texas, USA",
        isAvailable: true
      }
    ];

    for (const tool of sampleTools) {
      await this.createTool(tool);
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      phoneNumber: insertUser.phoneNumber || null,
      location: insertUser.location || null,
      farmName: insertUser.farmName || null,
      profileImage: insertUser.profileImage || null,
    };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByFarmer(farmerId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.farmerId === farmerId);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      rating: '0',
      reviewCount: 0,
      createdAt: new Date(),
      description: insertProduct.description || null,
      imageUrl: insertProduct.imageUrl || null,
      location: insertProduct.location || null,
      isOrganic: insertProduct.isOrganic || false,
      stock: insertProduct.stock || 0,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Tools
  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getTool(id: string): Promise<Tool | undefined> {
    return this.tools.get(id);
  }

  async getToolsByOwner(ownerId: string): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(t => t.ownerId === ownerId);
  }

  async getAvailableTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(t => t.isAvailable);
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = randomUUID();
    const tool: Tool = {
      ...insertTool,
      id,
      rating: '0',
      reviewCount: 0,
      createdAt: new Date(),
      description: insertTool.description || null,
      imageUrl: insertTool.imageUrl || null,
      location: insertTool.location || null,
      isAvailable: insertTool.isAvailable !== false,
      nextAvailableDate: insertTool.nextAvailableDate || null,
    };
    this.tools.set(id, tool);
    return tool;
  }

  async updateTool(id: string, updates: Partial<InsertTool>): Promise<Tool | undefined> {
    const tool = this.tools.get(id);
    if (!tool) return undefined;
    
    const updated = { ...tool, ...updates };
    this.tools.set(id, updated);
    return updated;
  }

  async deleteTool(id: string): Promise<boolean> {
    return this.tools.delete(id);
  }

  // Rentals
  async getRental(id: string): Promise<Rental | undefined> {
    return this.rentals.get(id);
  }

  async getRentalsByRenter(renterId: string): Promise<Rental[]> {
    return Array.from(this.rentals.values()).filter(r => r.renterId === renterId);
  }

  async getRentalsByTool(toolId: string): Promise<Rental[]> {
    return Array.from(this.rentals.values()).filter(r => r.toolId === toolId);
  }

  async createRental(insertRental: InsertRental): Promise<Rental> {
    const id = randomUUID();
    const rental: Rental = {
      ...insertRental,
      id,
      createdAt: new Date(),
    };
    this.rentals.set(id, rental);
    return rental;
  }

  async updateRental(id: string, updates: Partial<InsertRental>): Promise<Rental | undefined> {
    const rental = this.rentals.get(id);
    if (!rental) return undefined;
    
    const updated = { ...rental, ...updates };
    this.rentals.set(id, updated);
    return updated;
  }

  // Chat Messages
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(m => m.sessionId === sessionId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      userId: insertMessage.userId || null,
      sessionId: insertMessage.sessionId || null,
      isFromAI: insertMessage.isFromAI || false,
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
