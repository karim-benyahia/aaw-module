const express = require("express");
const fs = require("fs");

const app = express(); // instantiate Express app


app.use(express.json());

app.use('/', express.static('dist'));
app.use('/', express.static('public'));

const apiRouter = require("./src/server/router/api-router");
app.use("/api", apiRouter);

const PORT = 3000;

app.get('/*', (req, res) => {

    fs.readFile('./src/app/index.html', 'utf8', function (err, html) {
        if (err) {
            console.error(err);
        } else {
            let result = (process.env.MODE !== "prod")
                ? html
                    .replace('$js', 'http://localhost:3000/index.js')
                    .replace('$css', 'http://localhost:3000/index.css')

                : html
                    .replace('$js', '/index.min.js')
                    .replace('$css', '/index.min.css')

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(result);
        }
    });
})


app.listen(PORT, () => {
    console.log("Example app listening on port", PORT);
});
