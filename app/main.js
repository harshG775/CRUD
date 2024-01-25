import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./src/app.js";
import mongoose from "mongoose";

let dataBase = process.env.CLOUD_DB.replace("<password>",process.env.API_DB_PASS)
;(async ()=>{
    try {
        await mongoose.connect(dataBase+"/project_backend");
        console.log("dataBase connection successful!")
    } catch (error) {
        console.log(error)
    }

})()

const PORT = 5000 || process.env.PORT;
app.listen(PORT, async () => {
	console.log(`server started at http://localhost:${PORT}`);
});
