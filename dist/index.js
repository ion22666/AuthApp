import mongoose from "mongoose";
(async () => {
    // const hash = await argon2.hash("password", { hashLength: 200 });
    // let is_lvalid = await argon2.verify(hash, "password");
    // console.log(hash);
    // console.log(is_lvalid);
    mongoose.set("strictQuery", false);
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`, { dbName: "AuthApp" });
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });
    const User = mongoose.model("User", UserSchema);
    // User.create<UserType>({ username: "Giovanni", password: "password" });
    // new User<UserType>({ username: "Giovanni", password: "password" }).save();
    let r = await User.findOne({ username: "Giovanni" });
    console.dir(r);
    User.create(r);
})();
// (async () => {
//     // https://www.albion-online-data.com/api/v2/stats/charts/T4_BAG?date=2-5-2020&end_date=2-12-2020&locations=Caerleon&qualities=2&time-scale=24
//     let response = await new Promise<{ statusCode: number | undefined; data: string }>((resolve, reject) => {
//         let req = http.get(
//             {
//                 protocol: "https:",
//                 hostname: "www.albion-online-data.com",
//                 path: "/api/v2/stats/charts/T4_BAG?date=2-5-2020&end_date=2-12-2020&locations=Caerleon&qualities=2&time-scale=24",
//             },
//             res => {
//                 let data = "";
//                 res.on("data", chunk => {
//                     data += chunk;
//                 });
//                 res.on("end", () => {
//                     resolve({
//                         statusCode: res.statusCode,
//                         data: data,
//                     });
//                 });
//             }
//         );
//     });
//     console.log(response);
// })();
