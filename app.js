const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req, res){
    const firstname = req.body.fn;
    const lastname = req.body.ln;
    const email = req.body.e;

    const data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname

            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/f631f6f7ac"

const options = {
    method: "post",
    auth: "pritam:c01e9e0fe6e75d2855b901b76fbc1685-us6"
}

const request = https.request(url, options, function(response){
    if (response.statusCode == 200){
            res.sendFile(__dirname +"/success.html");
            
    }
    else{
        
    res.sendFile(__dirname +"/failure.html");
            
    }
    response.on("data", function(data){
    console.log(JSON.parse(data));
});
});
    request.write(jsonData);
    request.end();


});

// api key
// c01e9e0fe6e75d2855b901b76fbc1685-us6

// list id
// f631f6f7ac

app.post("/failure",function(req, res){
    res.redirect("/")
});

app.listen(3000, function(){
    console.log("Server is running at port 3000.");
    });