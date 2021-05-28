import { gql, IResolvers, makeExecutableSchema } from 'apollo-server'

const typeDefs = gql`

  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type PersonResponse {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type PaginatedResultResponese {
    numberOfPages: Int
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    people: [Person!]
  }

  type Query {
    people(page: Int): PaginatedResultResponese
    personByName(name: String!): PersonResponse
  }
`

const resolvers: IResolvers = {
  Query: {
    people(_,{ page }, { dataSources }) {
      return dataSources.peopleAPI.people(page)
    },
    personByName(_, { name }, { dataSources }) {
      return dataSources.peopleAPI.personByName(name)
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
