const axios = require('axios');
require('dotenv').config();

const main = async () => {
  try {
    const ensApi = process.env.ENS_API;
    const resolverAddress = process.env.RESOLVER_ADDRESS;
    const pairId = process.env.PAIR_ID;
    const domainId = resolverAddress.concat('-', pairId);

    const result = await axios.post(ensApi,
      {
        query: `
      {
        resolver (id: "${domainId}") {
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
}

main();