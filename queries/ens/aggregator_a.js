const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const ensApi = process.env.ENS_API;
    const resolverAddress = process.env.RESOLVER_ADDRESS;
    const feedDomainId = process.env.FEED_DOMAIN_ID;
    const resolverId = resolverAddress.concat('-', feedDomainId);

    const result = await axios.post(ensApi,
      {
        query: `
        {
          resolver (id: "${resolverId}") {
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
        `
      }
    );
    const data = result.data.data.resolver;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();