/**
 * @Created by MinJa 
 * on 05/03/2020.
 */

module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-min-ja-hammer@bit",
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || "1h",
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE || "3650d",
    BCRYPT_SALT_ROUNDS: 10,
};
