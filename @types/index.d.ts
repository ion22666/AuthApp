declare namespace global {
    type UserType = {
        email?: string;
        username?: string;
        password?: string;
        oauth?: {
            google?: {
                id: string;
                email: string;
                verified_email: string;
                name: string;
                given_name: string;
                family_name: string;
                picture: string;
                locale: string;
            };
            microsoft?: {
                email: string;
                profile: string;
            };
        };
    };

    type Session = {
        userId: string;
        createdAt: number;
    };
}

// request-with-user.d.ts
declare namespace Express {
    interface Request {
        user: global.UserType;
    }
}
