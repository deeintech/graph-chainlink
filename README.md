## Description

This project demonstrates a demo for [The Graph](https://thegraph.com) queries that retrieve information about Chainlink Price Feeds via [Ethereum Name Service](https://app.ens.domains).

## Start a project

### 1. Install dependencies
```
npm install
```

### 2. Set up configs

Create `.env` file and add the following keys:
 - `ENS_API` - an API endpoint for [ENS subgraph queries](https://thegraph.com/explorer/subgraph/ensdomains/ens)
 - `RESOLVER_ADDRESS` - a Chainlink resolver address for your price feed (e.g. `BTC/USD`)
 - `FEED_DOMAIN_ID` - an ENS domain id for a corresponding Chainlink price feed (e.g. `aggregator.btc-usd.data.eth`)
 - `AGGREGATOR_DOMAIN` - an ENS domain for a corresponding Chainlink price feed (e.g. `aggregator.btc-usd.data.eth`)

The `.env.example` file has default values for BTC/USD pair.

### 3. Run one of the scripts

#### 3.1 Aggregator Address Monitoring. Method A

This script monitors aggregator address changes for BTC/USD price feed via Resolver entity.

```
npm run aggregator_a
```

Example output:
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

The above script corresponds to the following subgraph query:

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

#### 3.2 Aggregator Address Monitoring. Method B

This script monitors aggregator address changes for BTC/USD price feed via Domain entity.

```
npm run aggregator_b
```

Example output:
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

The above script corresponds to the following subgraph query:

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
