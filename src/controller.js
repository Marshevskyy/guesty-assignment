const { successResponse, errorResponse } = require('./response');
const { performRequest } = require('./request');

const _performBatchActions = req => new Promise((resolve, reject) =>
    performRequest(req.body)
        .then(response => {
            resolve({status: `${response.succeed}/${req.body.payloads.length - response.succeed}`});
        }, err => reject(err)))

module.exports = {
    performBatchActions: (req, res) =>
        _performBatchActions(req, res)
            .then(successResponse(res), errorResponse(res))
};
