/**
 * @Created by MinJa 
 * on 05/03/2020.
 */

const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};
// const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit";
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-min-ja-hammer@bit";

const { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../@config/key");
const { INTERNAL_SERVER_ERROR, LOGIN_SUCCESS, EMAIL_NOT_EXITS, EMAIL_OR_PASS_INCORRECT } = require("../helpers/error-msg");

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Email:", email, "- Password:", password);

        User.findEmail(email, (err, response) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        code: 3,
                        message: EMAIL_NOT_EXITS,
                        data: ""
                    });
                } else {
                    res.status(500).send({ message: INTERNAL_SERVER_ERROR });
                }
            } else {
                if (bcrypt.compareSync(password, response.password)) {
                    // Passwords match
                    processLoginSuccess = async () => {
                        const accessToken = await jwtHelper.generateToken(response, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
                        response.token = accessToken
                        res.send({
                            code: 0,
                            message: LOGIN_SUCCESS,
                            data: response
                        });
                    }
                    processLoginSuccess()
                } else {
                    // Passwords don't match
                    res.status(200).send({
                        code: 5,
                        message: EMAIL_OR_PASS_INCORRECT,
                        data: ""
                    });
                }
            }
        })

        // //- Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
        // //- Nếu chưa tồn tại thì reject: User not found.
        // //- Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
        // //- Nếu password sai thì reject: Password is incorrect.
        // //- Nếu password đúng thì chúng ta bắt đầu thực hiện tạo mã JWT và gửi về cho người dùng.

        // // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:
        // debug(`Thực hiện fake thông tin user...`);
        // const userFakeData = {
        //     _id: "1234-5678-910JQK-tqd",
        //     name: "Trung Quân",
        //     email: req.body.email,
        // };
        // debug(`Thực hiện tạo mã Token, [thời gian sống 2 giờ.]`);
        // const accessToken = await jwtHelper.generateToken(userFakeData, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);

        // debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
        // const refreshToken = await jwtHelper.generateToken(userFakeData, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
        // // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
        // // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
        // tokenList[refreshToken] = { accessToken, refreshToken };

        // debug(`Gửi Token và Refresh Token về cho client...`);
        // return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json(error);
    }
}
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, REFRESH_TOKEN_SECRET);
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
            debug("decoded: ", decoded);
            const userFakeData = decoded.data;
            debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userFakeData, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            debug(error);
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided refreshToken.',
        });
    }
};
module.exports = {
    login: login,
    refreshToken: refreshToken,
}