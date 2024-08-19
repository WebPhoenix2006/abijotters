module.exports.isAboveZero = function(input) {
    if (!input) return false;
    const asNumber = Number(input)
    if (Number.isNaN(asNumber)) return false;
    return asNumber > 0
}