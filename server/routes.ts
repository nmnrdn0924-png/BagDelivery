import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeliveryRequestSchema, insertAdvertiserRequestSchema } from "@shared/schema";
import session from "express-session";
import bcrypt from "bcryptjs";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "gabanbaedal-secret-key-2025",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
      },
    })
  );

  app.post("/api/delivery-request", async (req, res) => {
    try {
      const validatedData = insertDeliveryRequestSchema.parse(req.body);
      const request = await storage.createDeliveryRequest(validatedData);
      res.json({ success: true, data: request });
    } catch (error) {
      res.status(400).json({ success: false, error: "유효하지 않은 데이터입니다." });
    }
  });

  app.post("/api/advertiser-request", async (req, res) => {
    try {
      const validatedData = insertAdvertiserRequestSchema.parse(req.body);
      const request = await storage.createAdvertiserRequest(validatedData);
      res.json({ success: true, data: request });
    } catch (error) {
      res.status(400).json({ success: false, error: "유효하지 않은 데이터입니다." });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ success: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ success: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." });
      }

      req.session.userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ success: false, error: "로그인 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, error: "로그아웃 실패" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", async (req, res) => {
    if (req.session.userId) {
      const user = await storage.getUser(req.session.userId);
      if (user) {
        return res.json({ authenticated: true, user: { id: user.id, username: user.username } });
      }
    }
    res.json({ authenticated: false });
  });

  app.get("/api/admin/delivery-requests", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, error: "인증이 필요합니다." });
    }

    try {
      const requests = await storage.getAllDeliveryRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).json({ success: false, error: "데이터를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/admin/advertiser-requests", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, error: "인증이 필요합니다." });
    }

    try {
      const requests = await storage.getAllAdvertiserRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).json({ success: false, error: "데이터를 불러오는 중 오류가 발생했습니다." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
