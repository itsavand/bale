import express, { type Express, type RequestHandler } from "express";
import cors from "cors";
import pinoHttp, { type Options } from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const pinoHttpOptions: Options = {
  logger,
  serializers: {
    req(req: { id: string; method: string; url: string }) {
      return {
        id: req.id,
        method: req.method,
        url: req.url?.split("?")[0],
      };
    },
    res(res: { statusCode: number }) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
};

// pino-http uses CJS `export =` which needs an explicit cast under moduleResolution: bundler
const pinoHttpMiddleware = pinoHttp as unknown as (opts: Options) => RequestHandler;
app.use(pinoHttpMiddleware(pinoHttpOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
