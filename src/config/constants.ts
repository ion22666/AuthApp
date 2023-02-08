import https from "node:https";

export const STATIC_DIR = "./dist/assets/";

export async function post(url: string, data: object) {
    const dataString = JSON.stringify(data);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": dataString.length,
        },
        timeout: 1000, // in ms
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, res => {
            if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
                return reject(new Error(`HTTP status code ${res.statusCode}`));
            }

            const body: any[] = [];
            res.on("data", chunk => body.push(chunk));
            res.on("end", () => {
                const resString = Buffer.concat(body).toString();
                resolve(resString);
            });
        });

        req.on("error", err => {
            reject(err);
        });

        req.on("timeout", () => {
            req.destroy();
            reject(new Error("Request time out"));
        });

        req.write(dataString);
        req.end();
    });
}

export const GoogleCLient = {
    client_id: "1052495542644-p5fnmn3l7oef1kaqtotihbd0cald3jtg.apps.googleusercontent.com",
    project_id: "oceanic-trail-307422",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    redirect_uri: "http://localhost:3000/login/google",
    client_secret: "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",
};
