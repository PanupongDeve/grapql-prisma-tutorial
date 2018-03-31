const { APP_SECRET, getUserId } = require('../utils')

function feed(parent, args, context, info) {
    getUserId(context)
    const { filter, first, skip } = args // destructure input arguments
    const where = filter
      ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
      : {}
    const allLinks = () => context.db.query.links({ first, skip, where }, info)
    console.log('Data', { links: allLinks});
    return { links: allLinks}
  }

  function showuser(parent, args, context, info) {
    const { filter, first, skip } = args // destructure input arguments
    const where = {}
  
    return context.db.query.users({ first, skip, where }, info)
  }
  
  module.exports = {
    feed,
    showuser
  }