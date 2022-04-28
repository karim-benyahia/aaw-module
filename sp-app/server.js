const express = require("express");
const fs = require("fs");

const app = express(); // instantiate Express app


app.use(express.json());

app.use('/', express.static('sp-app/dist'));
app.use('/', express.static('sp-app/public'));

const apiRouter = require("./src/server/router/api-router");
app.use("/api", apiRouter);

const PORT = 8082;

app.get('/*', (req, res) => {

    fs.readFile('./sp-app/src/app/index.html', 'utf8', function (err, html) {
        if (err) {
            console.error(err);
        } else {
            let result = (process.env.MODE !== "prod")
                ? html
                    .replace('$js', 'http://localhost:8084/index.js')
                    .replace('$css', 'http://localhost:8084/index.css')

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
