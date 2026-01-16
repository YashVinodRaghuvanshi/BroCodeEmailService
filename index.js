const express = require("express");
const {sendOtp, verifyuserotp, certificationdone, projectdone, siteislive} = require("./controllers/sendOtp");
const cors = require("cors");
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hi Guys");
});

app.get('/forgotpasswordotp', sendOtp);
app.get('/userverificationotp', verifyuserotp);
app.get('/certificationdone', certificationdone);
app.get('/projectcompleted', projectdone);
app.get('/siteislive', siteislive);

const start = async () => {
    try 
    {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log("Server running on port", PORT);
        })
    }   
    catch(ex)
    {
        console.log(ex.message);
    }
}

start();