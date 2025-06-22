// src/mocks/mockSuggestions.ts

export interface Suggestion {
  junctionName: string
  fromEdge: string
  toEdge: string
  tlsId: string
  index: number
  light: 'red' | 'green'
  duration: number
}

export const suggestionList: Suggestion[] = [
  {
    junctionName: 'Junction A',
    fromEdge: 'First Ave',
    toEdge: 'Main Blvd',
    tlsId: 'tls_001',
    index: 0,
    light: 'green',
    duration: 20
  },
  {
    junctionName: 'Junction B',
    fromEdge: 'Broadway',
    toEdge: 'Center St',
    tlsId: 'tls_002',
    index: 1,
    light: 'red',
    duration: 15
  },
  {
    junctionName: 'Junction C',
    fromEdge: 'Elm St',
    toEdge: 'Maple Ave',
    tlsId: 'tls_003',
    index: 3,
    light: 'green',
    duration: 30
  },
  {
    junctionName: 'Junction D',
    fromEdge: 'Park Rd',
    toEdge: 'King St',
    tlsId: 'tls_004',
    index: 2,
    light: 'red',
    duration: 18
  },
  {
    junctionName: 'Junction E',
    fromEdge: 'West End',
    toEdge: 'Hill Road',
    tlsId: 'tls_005',
    index: 1,
    light: 'green',
    duration: 22
  }
]
