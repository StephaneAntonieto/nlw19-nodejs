import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInviteCountRoute } from "./routes/get-subscriber-invite-count-route";
import { getSubscriberRankPositionRoute } from "./routes/get-subscriber-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "NLW Connect",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInviteCountRoute);
app.register(getSubscriberRankPositionRoute);
app.register(getRankingRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running on port 3333");
});
