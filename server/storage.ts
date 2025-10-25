import { type User, type InsertUser, type LessonPlan, type InsertLessonPlan, type StudentResponse, type InsertStudentResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLessonPlan(plan: InsertLessonPlan): Promise<LessonPlan>;
  getLessonPlans(userId: string): Promise<LessonPlan[]>;
  getLessonPlan(id: string): Promise<LessonPlan | undefined>;
  
  createStudentResponse(response: InsertStudentResponse): Promise<StudentResponse>;
  getStudentResponses(userId: string): Promise<StudentResponse[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private lessonPlans: Map<string, LessonPlan>;
  private studentResponses: Map<string, StudentResponse>;

  constructor() {
    this.users = new Map();
    this.lessonPlans = new Map();
    this.studentResponses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLessonPlan(insertPlan: InsertLessonPlan): Promise<LessonPlan> {
    const id = randomUUID();
    const plan: LessonPlan = {
      id,
      ...insertPlan,
      createdAt: new Date(),
    };
    this.lessonPlans.set(id, plan);
    return plan;
  }

  async getLessonPlans(userId: string): Promise<LessonPlan[]> {
    return Array.from(this.lessonPlans.values())
      .filter((plan) => plan.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getLessonPlan(id: string): Promise<LessonPlan | undefined> {
    return this.lessonPlans.get(id);
  }

  async createStudentResponse(insertResponse: InsertStudentResponse): Promise<StudentResponse> {
    const id = randomUUID();
    const response: StudentResponse = {
      id,
      ...insertResponse,
      createdAt: new Date(),
    };
    this.studentResponses.set(id, response);
    return response;
  }

  async getStudentResponses(userId: string): Promise<StudentResponse[]> {
    return Array.from(this.studentResponses.values())
      .filter((response) => response.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
