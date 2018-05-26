var app = require('express')();

app.get("/", function(req, res) {
    res.send('Hello World!');
})

app.listen(3000, function() {
    console.log("Server Start On 3000 Port!");
})
