import cors from "@fastify/cors";
import Fastify from "fastify";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
	host: "0.0.0.0",
	port: 3333
}).then(() => console.log("App running")).catch(console.error)