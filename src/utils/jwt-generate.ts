import config from "../config/config";
import jwt from "jsonwebtoken";
import { UserDto } from "../types/users/user-dto";
import { PayloadDto } from "../types/users/payload-user-dto";
import ms from "ms";

function jwtGenerator(user: PayloadDto) {
    const accessToken = jwtAccessGenerator(user);
    const refreshToken = jwtRefreshGenerator(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}



function jwtRefreshVerifier(token: string) {
    try {
        const decoded = jwt.verify(token, config.REFRESH_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }

}
function jwtAccessVerifier(token: string) {
    try {
        const decoded = jwt.verify(token, config.ACCESS_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}


function jwtRefreshGenerator(user: PayloadDto) {
    // var tokenExpiresIn = Date.now() + ms(config.REFRESH_EXPIRED_IN)
    const refreshToken = jwt.sign(user, config.REFRESH_SECRET,
        {
            expiresIn: config.REFRESH_EXPIRED_IN, algorithm: "HS256"
        }
    );
    return refreshToken;
}

function jwtAccessGenerator(user: PayloadDto) {
    // var tokenExpiresIn = Date.now() + ms(config.ACCESS_EXPIRED_IN)
    const accessToken = jwt.sign(user, config.ACCESS_SECRET,
        { expiresIn: config.ACCESS_EXPIRED_IN, algorithm: "HS256" }
    );
    return accessToken;
}

export default {
    jwtGenerator,
    jwtRefreshVerifier,
    jwtAccessVerifier,
    jwtRefreshGenerator,
    jwtAccessGenerator
}