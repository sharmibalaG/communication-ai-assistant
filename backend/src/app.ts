import express from "express";
import cors from "cors";

import communicationRoutes from "./routes/communication.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/communications", communicationRoutes);

export default app;