const http = require("http");
const url = require("url");
const fs = require("fs");

function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

http.createServer(function (req, res) {
    // fs.readFile("howto.html", function (err, data) {
    //     if (err) {
    //         res.writeHead(404, { "Content-Type": "text/html" });
    //         return res.end("404 Not Found");
    //     }
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.write(data);
    //     return res.end();
    // });

    res.writeHead(200, { "Content-Type": "text/plain" });

    let u = url.parse(req.url);
    // console.log(u);
    let q = url.parse(req.url, true).query;

    if (u.pathname === "/") {
        if (q.dayNumber) {
            res.writeHead(200, { "Content-Type": "text/html" });
            const dayNumberValue = Number(q.dayNumber);
            const day = dayNumberValue;
            const week = Math.ceil(day / 7);
            const result =
                "<h1>" +
                `The given day number (${day}) is located in week ` +
                week +
                "</h1>";
            res.write(result);
            res.end();
            // res.end(console.log(typeof result));
        } else if (q.isLeapYear) {
            const isLeapYear = Number(q.isLeapYear);
            const year = isLeapYear;
            let result = "";
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                result = "<h1>" + `${year} is a leap year` + "</h1>";
            } else {
                result = "<h1>" + `${year} is not a leap year` + "</h1>";
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(result);
            res.end();
        } else {
            fs.readFile("howto.html", function (err, data) {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            });
        }
    } else if (u.pathname === "/bubbleSort") {
        if (q.val) {
            const valValue2 = q.val.toString();
            const valValue3 = valValue2.split("").join(",");
            // var valStr = val.toString();  // Convert the value to a string
            // var result = valStr.split('').join(',');
            const valValue = Array.from(q.val).map(Number);
            const orderByValue = q.orderBy;
            let orderByType = "asc";
            const sortedArray = bubbleSort(valValue);
            let resultArray = [];
            if (q.orderBy) {
                if (orderByValue === "desc" || orderByValue === "DESC") {
                    orderByType = orderByValue;
                    resultArray = sortedArray.reverse();
                } else if (orderByValue === "asc" || orderByValue === "ASC") {
                    resultArray = sortedArray;
                }
            } else {
                resultArray = sortedArray;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                "<h1>" +
                    "Given val: " +
                    valValue3 +
                    "</h1>" +
                    "<h1>" +
                    "Sorted val: " +
                    resultArray.join(",") +
                    "</h1>" +
                    "<h1>" +
                    "Order: " +
                    orderByType.toUpperCase() +
                    "</h1>"
            );
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                "<h1>" +
                    "Please enter ?val (required) and ?orderBy (optional)." +
                    "</h1><h1>" +
                    "Example: ?val=54234 and &orderBy=asc or &orderBy=desc" +
                    "</h1>"
            );
            res.end();
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>" + "Sorry, we cant find anything here" + "</h1>");
        res.end();
    }
}).listen(2032);
