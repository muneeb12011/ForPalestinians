import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket setup for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients = new Set<WebSocket>();
  
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected to WebSocket');
    
    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected from WebSocket');
    });
  });
  
  // Broadcast function for real-time updates
  const broadcast = (data: any) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const type = req.query.type as string;
      const search = req.query.search as string;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      let posts;
      
      if (search) {
        posts = await storage.searchPosts(search);
      } else if (startDate && endDate) {
        posts = await storage.getPostsByDateRange(new Date(startDate), new Date(endDate));
      } else if (type && type !== 'all') {
        posts = await storage.getPostsByType(type, limit, offset);
      } else {
        posts = await storage.getPosts(limit, offset);
      }

      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get single post
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPostById(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Increment view count
      await storage.incrementViewCount(id);
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Create new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      
      // Broadcast new post to all connected clients
      broadcast({
        type: 'NEW_POST',
        post: post
      });
      
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid post data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  });

  // Get statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const allPosts = await storage.getPosts(1000);
      const breakingNews = allPosts.filter(post => post.isBreaking);
      const totalViews = allPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
      
      const stats = {
        totalPosts: allPosts.length,
        breakingNews: breakingNews.length,
        totalViews: totalViews,
        sourcesMonitored: new Set(allPosts.map(post => post.source).filter(Boolean)).size,
        lastUpdate: allPosts.length > 0 ? allPosts[0].createdAt : null
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  return httpServer;
}
