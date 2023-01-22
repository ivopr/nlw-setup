import cors from "@fastify/cors";
import Fastify from "fastify";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
	host: "0.0.0.0",
	port: 3333
},
	(error, address) => {
		if (error) {
			console.error(error);
		}
		console.log(`App running on ${address}`)
	}
)