const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const parseUrlEncoded = bodyParser.urlencoded({extended: false});

app.use(parseUrlEncoded);
app.use(bodyParser.json());


//create a get route that displays your personal name.
app.get('/self', (request, response) => response.send("<h1>Milo MacPhail</h1>"));

//create a dynamic get route that then says something using the parameter sent to it.
app.get('/greeting/:name', (req, res) => {
    const name = (req.params.name);
    res.send(`<h1>Thanks for coming today ${name}!<h1>`);    
});

app.get('/math', (req, res) => {
    if (req.query.name !== undefined){
        res.send(req.query.name.split('').join('-'));    
    } else {
       const const1 = parseInt(req.query.const1, 10)
       const const2 = parseInt(req.query.const2, 10)
    res.send(`<h1>The answer to ${const1} plus ${const2} is ${const1 + const2}.</h1>`);
    }
});


app.post('/login', (req, res) => {
    const pw = req.body.pw;
    const username = req.body.username;
    if (username === "Password" && pw === "Username") {
        res.status(200);
        res.json("Logged in");
    } else {
        res.json("Invalid credentials");
    }
});

const stresses = ["Milo","is","struggling"];

app.post('/stresses/:item', (req, res, next) => {
   var item = req.params.item;
   var stress = stresses.indexOf(item);

   // item is not already in the array, add it to array
   if(stress === -1) {
        stresses.push(item);
        res.status(202).json(`WOOF, ${item}!`);
   } else {
       // status 409 --> conflict
       res.status(409).json(`${item} already exists in the array`);
       next();
   }
});

// create a DELETE request with item attribute
app.delete('/stresses/:item', (req, res, next) => {
   const item = req.params.item;
   const stress = stresses.indexOf(item);
   console.log(stress);
   // if item exists, delete
   if (stress != -1) {
       stresses.splice(stress, 1);
       res.json(`Whew! No more ${item}`);
   } else {
       // status 404 --> not found
       res.status(404).json('The item you want to delete is not present');
       next();
   }
});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`))
