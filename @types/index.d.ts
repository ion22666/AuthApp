declare namespace global {
    type UserType = {
        email: string;
        username: string;
        password: string;
        oauth: {
            google: {
                email: string;
                profile: string;
            };
            microsoft: {
                email: string;
                profile: string;
            };
        };
    };
}

// request-with-user.d.ts
declare namespace Express {
    interface Request {
        user: global.UserType;
    }
}
