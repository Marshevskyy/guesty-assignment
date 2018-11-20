const express = require('express');
const router = new express.Router();
const { performBatchActions } = require('./controller');

module.exports = (function () {
    router.post('/', performBatchActions);

    return router;
})();


