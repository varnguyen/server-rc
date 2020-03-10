/**
 * Created by MinJa on 05/03/2020.
 */
const jwtHelper = require("../helpers/jwt.helper");
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit";
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            var current_time = Date.now().valueOf() / 1000;
            console.log(decoded.exp - current_time)
            if (decoded.exp < current_time) {
                /* expired */
                return res.status(401).send({
                    message: 'Token expired.',
                });
            }
            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;
            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}
module.exports = {
    isAuth: isAuth,
};