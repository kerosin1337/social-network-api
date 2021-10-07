import express from 'express';
import dotenv from 'dotenv';
import {logger, expressLogger} from "./src/utils/logger.js";
import api from "./src/api.js";

dotenv.config({ path: '.env' });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => res.send("Application is working"));
app.use("/api", api);

app.listen(PORT, () => {
    logger.info("Application started on port " + PORT)
})
