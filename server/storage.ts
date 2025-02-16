import { passwords, type Password, type InsertPassword } from "@shared/schema";
import { nanoid } from "nanoid";
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-12345';

export interface IStorage {
  createPassword(data: InsertPassword): Promise<Password>;
  getPassword(shareId: string): Promise<Password | undefined>;
  decrementViews(shareId: string): Promise<void>;
  cleanExpired(): Promise<void>;
}

export class MemStorage implements IStorage {
  private passwords: Map<string, Password>;

  constructor() {
    this.passwords = new Map();
    setInterval(() => this.cleanExpired(), 1000 * 60 * 5); // Clean every 5 minutes
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  }

  async createPassword(data: InsertPassword): Promise<Password> {
    const shareId = nanoid(12);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + data.expiryHours);

    const password: Password = {
      id: Date.now(),
      shareId,
      title: data.title,
      password: data.password,
      encryptedPassword: this.encrypt(data.password),
      maxViews: data.maxViews,
      remainingViews: data.maxViews,
      expiresAt,
      accessKey: data.accessKey || null,
      createdAt: new Date()
    };

    this.passwords.set(shareId, password);
    return password;
  }

  async getPassword(shareId: string): Promise<Password | undefined> {
    const password = this.passwords.get(shareId);
    if (!password) return undefined;
    
    if (password.expiresAt < new Date() || password.remainingViews <= 0) {
      this.passwords.delete(shareId);
      return undefined;
    }
    
    return password;
  }

  async decrementViews(shareId: string): Promise<void> {
    const password = this.passwords.get(shareId);
    if (password) {
      password.remainingViews--;
      if (password.remainingViews <= 0) {
        this.passwords.delete(shareId);
      } else {
        this.passwords.set(shareId, password);
      }
    }
  }

  async cleanExpired(): Promise<void> {
    const now = new Date();
    for (const [shareId, password] of this.passwords.entries()) {
      if (password.expiresAt < now || password.remainingViews <= 0) {
        this.passwords.delete(shareId);
      }
    }
  }
}

export const storage = new MemStorage();
