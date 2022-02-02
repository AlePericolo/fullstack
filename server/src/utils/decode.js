const jwt_decode = require ("jwt-decode");

exports.tokenDecode = (token) => {
    return jwt_decode(token.split('Bearer ')[1])
}
