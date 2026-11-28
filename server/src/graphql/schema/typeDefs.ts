export const typeDefs = `#graphql
  type BreakerFamily {
    id: ID!
    name: String!
    description: String
    status: String!
    createdAt: String!
    updatedAt: String!
    breakers: [Breaker!]!
  }

  type Breaker {
    id: ID!
    breakerFamilyId: ID!
    catalogNumber: String!
    ampereRating: Int!
    poles: Int!
    voltageRating: Int!
    interruptingRatingKa: Int!
    status: String!
    createdAt: String!
    updatedAt: String!
    family: BreakerFamily
  }

  type SelectivityRecord {
    id: ID!
    upstreamBreakerId: ID!
    downstreamBreakerId: ID!
    voltage: Int!
    selectivityKa: Float!
    createdAt: String!
    updatedAt: String!
    upstreamBreaker: Breaker
    downstreamBreaker: Breaker
  }

  type SelectivityLookupResult {
    voltage: Int!
    selectivityKa: Float!
    upstreamBreaker: Breaker!
    downstreamBreaker: Breaker!
  }

  type Query {
    breakerFamilies: [BreakerFamily!]!

    breakerFamily(id: ID!): BreakerFamily

    breakers: [Breaker!]!

    breaker(id: ID!): Breaker

    selectivityRecords: [SelectivityRecord!]!

    selectivityLookup(
      voltage: Int!
      upstreamBreakerId: ID!
      downstreamBreakerId: ID!
    ): SelectivityLookupResult
  }
`;