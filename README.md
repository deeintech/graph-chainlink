## Description

This project demonstrates a demo for [The Graph](https://thegraph.com) queries that retrieve various information about [Chainlink](http://chain.link).

## Start a project

### 1. Install dependencies
```
npm install
```

### 2. Set up configs

Create `.env` file and add the following keys:
 - `ENS_API` - an API endpoint for [ENS subgraph queries](https://thegraph.com/explorer/subgraph/ensdomains/ens)
 - `RESOLVER_ADDRESS` - a Chainlink resolver address for your price feed (e.g. `BTC/USD`)
 - `FEED_DOMAIN_ID` - an ENS domain id for a corresponding Chainlink price feed (e.g. `0xfb3362a97947a1804738d871b660275dff443b48fb7da009b2c605969b2045e9`)
 - `AGGREGATOR_DOMAIN` - an ENS domain for a corresponding Chainlink price feed (e.g. `aggregator.btc-usd.data.eth`)

The `.env.example` file has default values for BTC/USD pair.

### 3. Run one of the scripts

#### 3.1 Aggregator Address Monitoring. Method A

This script monitors aggregator address changes for BTC/USD price feed via Resolver entity.

```
npm run ens-aggregator-a
```

#### 3.2 Aggregator Address Monitoring. Method B

This script monitors aggregator address changes for BTC/USD price feed via Domain entity.

```
npm run ens-aggregator-b
```