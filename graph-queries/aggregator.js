const axios = require('axios');
const main = async () => {
  try {
    const ensApi = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
    const resolverAddress = '0x122eb74f9d0f1a5ed587f43d120c1c2bbdb9360b';
    const pairId = '0xfb3362a97947a1804738d871b660275dff443b48fb7da009b2c605969b2045e9';
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