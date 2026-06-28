import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(
        `Communication Service running on port ${PORT}`
    );
});