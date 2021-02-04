const express = require('express');
//노드에서는 export, import 안쓰고 require 쓴다.

const router = express.Router();
router.post('/', (req, res) => { // POST /post
  res.json({ id : 1, content: 'hello'});
});

router.delete('/', (req,res) => { // DELETE /post
  res.json({ id : 1 });
})

module.exports = router;