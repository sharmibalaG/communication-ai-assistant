import dotenv from "dotenv";
dotenv.config();

import app from "./app";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(
        `Communication Service running on port ${PORT}`
    );
});