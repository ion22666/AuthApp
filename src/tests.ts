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
