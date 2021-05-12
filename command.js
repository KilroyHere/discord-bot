
module.exports = (client, commandKey, callback) => {
    client.on('message',message => {
        if(message.author.bot){
            return;
        }
        const content = message.content;
        if(content.toLowerCase() === commandKey){
            console.log("Running the command: "+commandKey);
            callback(message);
        }
    })
}