import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors)
app.get("/", async () => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => console.log("App running"))