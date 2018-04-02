const { APP_SECRET, getUserId } = require('../utils')

async function feed(parent, args, context, info) {
    // getUserId(context)
    const { filter, first, skip } = args // destructure input arguments
    const where = filter
      ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
      : {}
    // return context.db.query.links({ first, skip, where }, info)
    const allLinks = await context.db.query.links({})
    console.log("See All Liks", allLinks);
    const count = allLinks.length
    

    const queriedLinkes = await context.db.query.links({ first, skip, where })

    return {
      linkIds: queriedLinkes.map(link => link.id),
      count
    }
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