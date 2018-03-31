const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')


const resolvers = {
  Query,
  Mutation,
  Subscription
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/panupongdev-dfc4d6/hackernews-node/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
})

const PORT = process.env.PORT || 5000

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`))





// https://eu1.prisma.sh/public-fancysaver-633/hackernews-node/dev
