## Description

Demo tests for [The Graph](https://thegraph.com) queries and [Ethereum Name Service](https://app.ens.domains).

## Start a project

### 1. Install dependencies
```
npm install
```

### 2. Set up configs

Create `.env` file and add the following keys:
 - `ENS_API` - an api endpoint to access the graph queries for ENS
 - `RESOLVER_ADDRESS` - a resolver address for your market pair (BTC/USD)
 - `PAIR_ID` - an id for the market pair within ENS system

There's an `.env.example` file in the root directory with default values for BTC/USD pair.

### 3. Run one of the scripts

1. Monitor aggregator address changes for BTC/USD price feed.
```
npm run aggregator
```

...

