const successResponse = res => data => res.status(200).json(data);

const errorResponse = res => error => {
    if (typeof error === 'object') {
        res.status((error.status || 500)).json(error);
    } else {
        res.status(500).json({ error });
    }
}

module.exports = {
    successResponse,
    errorResponse
};
