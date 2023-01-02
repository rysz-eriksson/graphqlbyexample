import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
    schema {
        query: Query
    }

    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => "Hello World!",
    }
}

const server = new ApolloServer({typeDefs, resolvers})
const serverInfo = await server.listen({port: 9000})

console.log(serverInfo)