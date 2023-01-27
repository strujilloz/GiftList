const axios = require('axios');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main(_name) {
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: _name,

  });

  //Object returned by the server
  console.log({ gift });
}

main("Santiago Trujillo");