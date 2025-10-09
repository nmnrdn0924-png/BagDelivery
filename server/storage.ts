import { db } from "./db";
import { users, deliveryRequests, advertiserRequests } from "@shared/schema";
import type { User, InsertUser, DeliveryRequest, InsertDeliveryRequest, AdvertiserRequest, InsertAdvertiserRequest } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDeliveryRequest(request: InsertDeliveryRequest): Promise<DeliveryRequest>;
  getAllDeliveryRequests(): Promise<DeliveryRequest[]>;
  
  createAdvertiserRequest(request: InsertAdvertiserRequest): Promise<AdvertiserRequest>;
  getAllAdvertiserRequests(): Promise<AdvertiserRequest[]>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createDeliveryRequest(request: InsertDeliveryRequest): Promise<DeliveryRequest> {
    const result = await db.insert(deliveryRequests).values(request).returning();
    return result[0];
  }

  async getAllDeliveryRequests(): Promise<DeliveryRequest[]> {
    return await db.select().from(deliveryRequests).orderBy(deliveryRequests.createdAt);
  }

  async createAdvertiserRequest(request: InsertAdvertiserRequest): Promise<AdvertiserRequest> {
    const result = await db.insert(advertiserRequests).values(request).returning();
    return result[0];
  }

  async getAllAdvertiserRequests(): Promise<AdvertiserRequest[]> {
    return await db.select().from(advertiserRequests).orderBy(advertiserRequests.createdAt);
  }
}

export const storage = new DbStorage();
