module.exports = function (req, res) {
    const {firstNum, secondNum} = req.params;

    const num_A = parseInt(firstNum, 10);
    const num_B = parseInt(secondNum, 10);

    const result = String(num_A / num_B);

    res.end(result);
};