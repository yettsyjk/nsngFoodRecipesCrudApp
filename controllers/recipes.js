const express = require('expresss');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('recipes/index.ejs');
});

module.exports = router;