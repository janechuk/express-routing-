const express = require('express');
const ExpressError = require("./expressError")
const app = express();
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');


app.get('/', (req, res) => {
    res.send('Welcome to Mean, Median, Mode API')
})

app.get('/:mean', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }


    let result = {
        operation: req.params.mean,
        result: findMean(nums)
    }

    return res.send(result);
});

app.get('/:median', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: req.params.median,
        result: findMedian(nums)
    }

    return res.send(result);

});

app.get('/:mode', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: req.params.mode,
        result: findMode(nums)
    }

    return res.send(result);


});





// app.get('/:mean', (req, res, next) => {
//     try {
//         const { nums } = req.query;
//         if (!req.query.num) {
//             throw new ExpressError("numbers are required", 400)
//         }
//         else
//             return res.status(200).json({ response: { operation: req.params.mean, value: findMean(nums) } })
//     } catch (e) {
//         next(e)
//     }
// })




// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});


// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

// listening on port 3000
app.listen(3000, function () {
    console.log('Server started on port 3000');

}) 