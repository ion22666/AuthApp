import axios, { AxiosResponse } from "axios";

import { GoogleCLient } from "../config/constants.js";

export default async function (code: string) {
    let token_response: AxiosResponse<any, any> = await axios.post("https://oauth2.googleapis.com/token", {
        code: code,
        client_id: GoogleCLient.client_id,
        client_secret: GoogleCLient.client_secret,
        redirect_uri: GoogleCLient.redirect_uri,
        grant_type: "authorization_code",
    });

    let user_info_response: AxiosResponse<global.GoogleUserInfo, any> = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token_response.data.access_token}`);
    return user_info_response.data;
}
