## Description

Both of the scripts monitor aggregator address changes for BTC/USD price feed.

## Subgraph Query. Method A

The query works with the `Resolver` entity that contains various events, including AddrChanged event that is responsible for catching any changes of a given address.

To fulfill a query, you need to know a resolver id for the requested price feed. It consists of two components:
Chainlink Resolver address for Ethereum network. This value is the same for all price feeds: `0x122eb74f9d0f1a5ed587f43d120c1c2bbdb9360b`

An ENS domain id for `aggregator.btc-usd.data.eth` feed. You can retrieve it in the Network tab of your Chrome dev tools or via the following subgraph query:

```
{
  domains(where: {name:"aggregator.btc-usd.data.eth"}) {
    id
    name
    labelName
    labelhash
  }
}
```

As a result, you have a full resolver id for your price feed: `0x122eb74f9d0f1a5ed587f43d120c1c2bbdb9360b-0xfb3362a97947a1804738d871b660275dff443b48fb7da009b2c605969b2045e9`

The structure of the above subgraph query consists of a JSON object with the required argument (resolver id) and the properties needed to display the `AddrChanged` result:
- `address` - resolver address
- `domain.name` - domain’s name that monitors the event
- `events` - a list of AddrChanged events with the corresponding blockNumber and transactionID properties

```
{
  resolver (id: "0x122eb74f9d0f1a5ed587f43d120c1c2bbdb9360b-0xfb3362a97947a1804738d871b660275dff443b48fb7da009b2c605969b2045e9") {
    texts
    address
    domain {
      name
    }
     events {
      id
      ... on AddrChanged {
        blockNumber
        transactionID
      }
    }
  }
}
```

### Example Output

```
{
  address: '0x122eb74f9d0f1a5ed587f43d120c1c2bbdb9360b',
  domain: { name: 'aggregator.btc-usd.data.eth' },
  events: [
    { id: '11420105-243' },
    {
      blockNumber: 11420105,
      id: '11420105-244',
      transactionID: '0x59a66541799ffa3270d285a7439336b8cea76d33ffdac5c84585af25e6c44d5f'
    },
    { id: '11420105-319' },
    {
      blockNumber: 11420105,
      id: '11420105-320',
      transactionID: '0x59a66541799ffa3270d285a7439336b8cea76d33ffdac5c84585af25e6c44d5f'
    }
  ],
  texts: null
}
```

## Subgraph Query. Method B

This query retrieves a list of `Domain` entities. A list can contain only a single result because it’s not possible to have multiple domains with the same name.

The structure of the above subgraph query consists of a JSON object with the name of the requested domain (`aggregator.btc-usd.data.eth`) as a where clause argument and the properties needed to display the `AddrChanged` result:
- `id` - domain’s id
- `name` - domain’s name that monitors the event
- `resolver` - domain’s resolver
- `events` - a list of AddrChanged events with the corresponding blockNumber and transactionID properties

```
{
  domains(where: {name:"aggregator.btc-usd.data.eth"}) {
    id
    name
    resolver {
      events {
        id
        ...on AddrChanged {
     blockNumber
          transactionID
        }
      }
    }
  }
}
```

### Example Output

```
{
  events: [
    { id: '11420105-243' },
    {
      blockNumber: 11420105,
      id: '11420105-244',
      transactionID: '0x59a66541799ffa3270d285a7439336b8cea76d33ffdac5c84585af25e6c44d5f'
    },
    { id: '11420105-319' },
    {
      blockNumber: 11420105,
      id: '11420105-320',
      transactionID: '0x59a66541799ffa3270d285a7439336b8cea76d33ffdac5c84585af25e6c44d5f'
    }
  ]
}
```