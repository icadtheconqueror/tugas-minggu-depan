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
            res.writeHead(200, { "Content-Type": "text/plain" });
            const dayNumberValue = Number(q.dayNumber);
            const day = dayNumberValue;
            const week = Math.ceil(day / 7);
            const result = "The given day number is located in week " + week;
            res.end(result);
            // res.end(console.log(typeof result));
        } else if (q.isLeapYear) {
            const isLeapYear = Number(q.isLeapYear);
            const year = isLeapYear;
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                res.writeHead(200, { "Content-Type": "text/plain" });
                const result = year + " is a leap year";
                res.end(result);
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                const result = year + " is not a leap year";
                res.end(result);
            }
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
            const valValue = Array.from(q.val).map(Number);
            const orderByValue = q.orderBy;
            const sortedArray = bubbleSort(valValue);
            if (q.orderBy) {
                if (orderByValue === "desc" || orderByValue === "DESC") {
                    sortedArray.reverse();
                } else if (orderByValue === "asc" || orderByValue === "ASC") {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("Sorted val: " + sortedArray.join(""));
                }
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Sorted val: " + sortedArray.join(""));
        } else {
            res.end(
                "Enter ?val (required) and ?orderBy (optional). Example: ?val=54234 and ?orderBy=asc or ?orderBy=desc"
            );
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sorry, we cant find anything here");
    }
}).listen(2032);
