module.exports = async function (context, req) {
    const payload = req.body

    return Object.keys(payload).map(key => ({ "target": key, "arguments": [payload[key]] }))
};