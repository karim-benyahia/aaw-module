const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express(); // instantiate Express app


app.use(express.json());

app.use('/', express.static('dist'));
app.use('/', express.static('public'));

const apiRouter = require("./src/server/router/api-router");
app.post("/login",()=>{
   const {username, pwd} =  req.body

    const user = searchParticipant(username);


   user.pwd == pwd ?
       //creation du token et du cookie
       //token aleatoire id utilisateur une date



       res ajouter le cookie
       res.redirect /:




})
app.use("/*", (req, res, next )=>{
    const tokenId = req.cookies.get("MON_COOKIE")
        //lire enbase de données
    //faire la verif date et existance
    else{
        res.()
    }
    next();
})
app.use("/api", apiRouter);

const PORT = process.env.PORT || 8082;

app.get('/*', (req, res) => {


    fs.readFile('./dist/index.html', 'utf8', function (err, html) {
        if (err) {
            console.error(err);
        } else {
            let result = (process.env.MODE !== "prod")
                ? html
                    .replace('$js', 'http://localhost:1234/index.js')
                    .replace('$css', 'http://localhost:1234/index.css')

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
