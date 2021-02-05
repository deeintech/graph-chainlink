const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const ensApi = process.env.ENS_API;
    const aggregatorDomain = process.env.AGGREGATOR_DOMAIN;

    const result = await axios.post(ensApi,
      {
        query: `
        {
          domains(where: {name:"${aggregatorDomain}"}) {
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
        `
      }
    );
    const data = result.data.data.domains[0].resolver;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();