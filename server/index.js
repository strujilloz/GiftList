const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');
const list = require("./list.json")

const port = 1225;

const app = express();
app.use(express.json());

  /*
    1. new  instance of the merkle tree pasing the array list.json
    2. get the root  from the merkle tree
  */

const MERKLE_TREE = new MerkleTree(list)
const MERKLE_ROOT = MERKLE_TREE.getRoot() ;
console.log("MERKLE ROOT:",MERKLE_ROOT)


app.post('/gift', (req, res) => {
  /*
    1. get the name from the req.body
    2. find the name in the list.json
    3. findIndex returns the index if the name is in the list or -1 if not
    4. get the proof needed from the merkle tree 
    5. verifyProof and send respond
  */
  const {name} = req.body;
  const indexOfName = list.findIndex((names)=> names === name)
  const proof = MERKLE_TREE.getProof(indexOfName)
  
  if(verifyProof(proof,name,MERKLE_ROOT)){
    res.send("Welcome to the list!");
  }
  else{
    res.send("You are not on the list :(");
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
