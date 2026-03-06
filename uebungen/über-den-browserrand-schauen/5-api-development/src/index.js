import express from "express";
import {studiengaengeRouter} from "./routes/studiengaenge.js";

const app = express()

app.use(express.json());
app.use("/studiengaenge", studiengaengeRouter);

app.listen(3000)
