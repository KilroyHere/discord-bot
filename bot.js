console.log('Hello World!   ^_^');


const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('dotenv').config();
const fetch = require('node-fetch');
const BOT_ID = process.env.BOT_CLIENT_ID;
//const https = require('https');

// var fs = require('fs');
// fs.readFile("quotes.txt", "utf8", function(error, data) {
//     if(error)
//         console.log(error);
//     else
//         console.log(data);
//   });

client.login(process.env.CLIENT_TOKEN);

client.on('ready', readyDiscord);
function readyDiscord(){
    console.log('Client logged in and ready with BOT ID: '+BOT_ID);
}


var passwordManager1;
var passwordManager2;
var passwordCounter = 2;
client.on('message',gotMessage); 
function gotMessage(msg){

    if(msg.author.bot){
        return;
    }

    /*Random Quote Command `!quote`*/
    if(msg.content.toLowerCase() === '!quote'){
        let url = "https://api.quotable.io/random"; //Courtesy:https://github.com/lukePeavey/quotable
        let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
        let quote = json.content;
        let author = json.author;
        msg.reply(quote+' - '+author);
        });
    }

    /*Password Maker Command `!password`*/
    if(msg.content.toLowerCase() === '!password' ){
        if(passwordCounter === 0)
        {
            passwordCounter = 2;
        }
        if (passwordCounter === 2 )
        {
            passwordManager1 = msg.author;
            passwordCounter -= 1;

        }
        else if (passwordCounter === 1)
        {
            passwordManager2 = msg.author;
            passwordCounter -= 1;
            let url = "https://random-word-form.herokuapp.com/random/noun"; 
            let settings = { method: "Get" };
            fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
            let word = json[0];
            passwordManager1.send("Your Password: "+word)
            passwordManager2.send("Your Password: "+word);
            });
        }
    }



}
