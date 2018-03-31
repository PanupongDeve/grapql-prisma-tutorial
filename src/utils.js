const APP_SECRET = 'GraphQL-is-aw3some'
const jwt = require('jsonwebtoken')

function getUserId(context) { // middleware สำหรับ check auth
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}



module.exports = {
  APP_SECRET,
  getUserId
}