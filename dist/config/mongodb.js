import mongoose from "mongoose";
export const AuthAppDb = mongoose.createConnection(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, { dbName: "AuthApp" });
AuthAppDb.set("strictQuery", false);
export const makeConnections = async () => {
    return new Promise((resolve, reject) => {
        AuthAppDb.on("error", error => reject(error));
        AuthAppDb.once("open", () => resolve(AuthAppDb));
    });
};
