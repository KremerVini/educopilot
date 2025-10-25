import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const lessonPlans = pgTable("lesson_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  subject: text("subject").notNull(),
  topic: text("topic").notNull(),
  gradeLevel: text("grade_level").notNull(),
  duration: integer("duration").notNull(),
  objectives: text("objectives").array().notNull(),
  activities: text("activities").array().notNull(),
  resources: text("resources").array().notNull(),
  assessment: text("assessment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studentResponses = pgTable("student_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  studentName: text("student_name").notNull(),
  responseText: text("response_text").notNull(),
  sentiment: text("sentiment").notNull(),
  confidence: integer("confidence").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLessonPlanSchema = createInsertSchema(lessonPlans).omit({
  id: true,
  createdAt: true,
});

export const insertStudentResponseSchema = createInsertSchema(studentResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LessonPlan = typeof lessonPlans.$inferSelect;
export type InsertLessonPlan = z.infer<typeof insertLessonPlanSchema>;
export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = z.infer<typeof insertStudentResponseSchema>;
