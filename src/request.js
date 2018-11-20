const request = require('superagent');

// currying function to postpone execution
const sendRequest = (url, verb, data) => () => new Promise((resolve, reject) =>
    request[verb.toLowerCase()](buildURL(url, data))
        [verb.toLowerCase() == 'get' ? 'query' : 'send'](data)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.body);
            }
        }));

// this is recursive functions which runs
// either until success or untill attempts not equal zero
const tryUntil = async (fn, callback, attempts) => {
    try {
        await fn();
        callback(true);
    } catch(err) {
        // all rejected promises will go here
        if (attempts) {
            tryUntil(fn, callback, --attempts)
        } else {
            callback(false);
        }
    }
};

const buildURL = (url, payload) => {
    // if url does not include PATH params, return url without modifications
    if (url.indexOf('{') === -1) return url;
    // otherwise find key between {...} and replace this key with value from payload
    const matches = url.match(/{(.*?)}/);
    const pathParamKey = matches[1]; // for ex.: "userId"
    if (payload.hasOwnProperty(pathParamKey)) { // make sure payload contains pathParamKey
        // matches[0] - for ex. "{userId}"
        return url.replace(matches[0], payload[pathParamKey]); // replace key with payload value
    }
    console.warn(`payload does not have: ${pathParamKey}`);
    return url; // todo error handling since returned url won't work
};

// note: this could be done by using .reduce as well,
// but I go with plain loops instead of array iteration methods,
// since they're more performant and often simpler
const performRequest = async data => {
    var succeed = 0;
    for (const payload of data.payloads) {
        const requestApi = sendRequest(data.request.url, data.request.verb, payload);
        await tryUntil(requestApi, isSuccess => isSuccess && succeed++, 1)
    }
    return { succeed };
};

module.exports = {
    performRequest
};
