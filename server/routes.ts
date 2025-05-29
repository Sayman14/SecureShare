import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertPasswordSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/passwords", async (req, res) => {
    try {
      const data = insertPasswordSchema.parse(req.body);
      const password = await storage.createPassword(data);
      res.json({ shareId: password.shareId });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.get("/api/passwords/:shareId", async (req, res) => {
    const { shareId } = req.params;
    const { key } = req.query;

    const password = await storage.getPassword(shareId);

    if (!password) {
      return res.status(404).json({ message: "Password not found or expired" });
    }

    if (password.accessKey && password.accessKey !== key) {
      return res.status(401).json({ message: "Invalid access key" });
    }

    await storage.decrementViews(shareId);

    res.json({
      title: password.title,
      password: password.password,
      notes: password.notes,
      remainingViews: password.remainingViews - 1,
      expiresAt: password.expiresAt
    });
  });

  app.delete("/api/passwords/:shareId", async (req, res) => {
    const { shareId } = req.params;
    const success = await storage.deletePassword(shareId);
    if (success) {
      res.json({ message: "Password deleted successfully" });
    } else {
      res.status(404).json({ message: "Password not found" });
    }
  });

  return createServer(app);
}