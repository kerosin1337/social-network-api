import express from 'express';
import dotenv from 'dotenv';
import {logger, expressLogger} from "./src/utils/logger.js";
import api from "./src/api.js";
import passport from 'passport';
import {jwtStrategy} from "./src/utils/auth.js";
dotenv.config({ path: '.env' })
import initMongoose from "./src/utils/db.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passport.use(jwtStrategy);

initMongoose().catch(err => logger.error(err));

app.get('/', (_, res) => res.send("Application is working"));
app.use("/api", api);


app.listen(PORT, () => {
    logger.info("Application started on port " + PORT)
})
