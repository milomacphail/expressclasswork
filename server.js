const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//create a get route that displays your personal name.
app.get('/self', (request, response) => response.send("<h1>Milo MacPhail</h1>"));

//create a dynamic get route that then says something using the parameter sent to it.
app.get('/greeting/:name', (req, res) => {
    const name = (req.params.name);
    res.send(`<h1>Thanks for coming today ${name}!<h1>`);    
});

app.get('/math', (req, res) => {
    const num1 = parseInt(req.query.num1, 10);
    const num2 = parseInt(req.query.num2, 10);
    const ending = (req.query.ending)
    res.send(`<h1>The answer to ${num1} plus ${num2} is ${num1 + num2}, ${ending}.</h1>`)
});


app.post('/login', (req, res) => {
    const pw = req.body.pw;
    const username = req.body.username;
    if (username === "Password" & pw === "Username") {
        res.status(200);
        res.json("Logged in");
    } else {
        res.json("Invalid credentials");
    }
});

app.post('/data', (req, res) =>{
  const myArray = ["Milo", "is", "struggling"]
  
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`))
