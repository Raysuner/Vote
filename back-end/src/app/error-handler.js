const errorType = require('./error-types')

function errorHandler(error, ctx) {
    let status, message
    switch (error.message) {
        case errorType.USERNAME_AND_PASSWORD_IS_REQUIRED:
            status = 400
            message = "账号或密码未填写"
            break
        case errorType.USER_NOT_EXIST:
            status = 400
            message = "用户不存在"
            break
        case errorType.PASSWORD_IS_NOT_CORRECT:
            status = 400
            message = "密码不正确"
            break
        case errorType.CAN_NOT_GET_CORRECT_PARAMS:
            status = 400
            message = "参数不正确"
            break
        case errorType.UNAUTHORIZATION:
            status = 401
            message = "未授权"
            break
        case errorType.UNPERMISSION:
            status = 401
            message = "你没有这个权限"
            break
        case errorType.USER_ALREADY_EXIST:
            status = 409
            message = "用户已经存在"
            break
        case errorType.DATABASE_ERROR:
            status = 500
            message = "数据库出错"
            break
        case errorType.UPDATA_COMMENT_FAILED:
            status = 500
            message = "更新评论错误"
            break
        default:
            status = 404
            message = "默认错误"
    }
    ctx.status = status
    ctx.body = message
}

module.exports = {
    errorHandler,
}