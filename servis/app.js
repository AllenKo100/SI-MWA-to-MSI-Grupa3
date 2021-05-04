const db = require("./db");
// const https = require("https");
const cors = require("cors");
fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
app.use(bodyParser());

global.__basedir = __dirname;

const swaggerOptions = {
    swaggerDefinition: {
        components: {},
        info: {
            title: "Server API",
            version: '1.0.0',
        },
    },
    apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /liveStatus:
 *   post:
 *     summary: Create new log in database
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *             time: 
 *               type: string
 *               format: date-time
 *             deviceUid: 
 *               type: string
 *             message: 
 *               type: string
 *             cpuUsage: 
 *               type: number
 *               format: double
 *             ramUsage: 
 *               type: number
 *               format: double
 *             hddUsage: 
 *               type: number
 *               format: double
 *             gpuUsage: 
 *               type: number
 *               format: double
 *     responses:
 *       200:
 *         description: Created log
 *       404:
 *         description: Query exectution error
 */


app.post("/liveStatus", (req, response) => {

    const { timeStamp, deviceUid, message, cpuUsage, ramUsage, hddUsage, gpuUsage } = req.body;

    db.query('UPDATE "DEVICE" SET "Status" = $1, "LastTimeOnline" = $2  WHERE "deviceUID" = $3 returning "DeviceId"', [true, timeStamp, deviceUid], (err, res2) => {

        if (err) {
            response.status(404).json({ "message": "Query execution error" });
            return;
        }

        if (res2.rows.length == 0) {
            response.status(404).json({ "message": "Couldn't find device" });
            return;
        }

        let id = res2.rows[0].DeviceId;

        db.query('INSERT INTO "DEVICE_STATUS_LOG" ("TimeStamp", "DeviceId", "Message", "CpuUsage", "RamUsage", "HDDUsage", "GPUUsage") VALUES ($1, $2, $3, $4, $5, $6, $7)', [timeStamp, id, message, cpuUsage, ramUsage, hddUsage, gpuUsage], (err, res3) => {

            if (err) {
                response.status(404).json({ "message": "Couldn't update device status" });
                return;
            }

            response.status(200).json({ "message": "Device status has been updated successfully" });
            return;
        });
    });
})

app.get("/HelloWorld", ((req, res) => {
    res.json({ message: "Hello world" });
}))



/*{
    "code": 404,
    "message": "Došlo je do greške!",
    "name": "DESKTOP-SCC",
    "errorTime" : "2021-03-15 23:32:06.672809",
    "location": "Sarajevo - SCC"
}*/


/**
 * @swagger
 * /errorLog:
 *   post:
 *     summary: Creates record about occured error 
 *     parameters:
 *       - in: body
 *         schema: 
 *           type: object
 *           properties:    
 *             code: 
 *               type: integer
 *             message: 
 *               type: string
 *             errorTime: 
 *               type: string
 *               format: date-time
 *             deviceUid: 
 *               type: string   
 *     responses:
 *       200:
 *         description: Created error information
 *       401:
 *         description: Couldn't find error type
 *       402: 
 *         description: Couldn't find device
 *       403: 
 *         description: Couldn't insert error information
 */

app.post("/errorLog", (req, res1) => {

    const { code, message, deviceUid, errorTime } = req.body;



    db.query('SELECT "Id" FROM "ERROR_DICTIONARY" WHERE "Code"=$1', [code], (err, res2) => {

        if (err) {

            res1.status(401).json({ "message": "Database error" });
            return;
        }



        db.query('SELECT "DeviceId" FROM "DEVICE" WHERE "deviceUID"=$1', [deviceUid], (err, res3) => {

            if (err) {

                res1.status(402).json({ "message": "Couldn't find device" });
                return;
            }

            if (res3.rows.length == 0) {
                res1.status(402).json({ "message": "Couldn't find device" });
                return;

            }
            ErrorTypeId = null;
            if (res2.rows.length != 0) {

                ErrorTypeId = res2.rows[0].Id;

            }

            db.query('INSERT INTO "ERROR_LOG" ("Message", "DeviceId", "ErrorTypeId", "ErrorTime") VALUES ($1, $2, $3, $4)', [message, res3.rows[0].DeviceId, ErrorTypeId, errorTime], (err, res4) => {

                if (err) {
                    res1.status(403).json({ "message": "Couldn't insert error information" });
                    return;
                }

                res1.status(200).json({ "message": "Sucessfully inserted error information" });
            });
        });
    });
});



/**
 * @swagger
 * /errorAdd:
 *   post:
 *     summary: Inserts new error in
 *     parameters:
 *       - in: body
 *         schema: 
 *           type: object
 *           properties:    
 *             code: 
 *               type: integer
 *             description: 
 *               type: string
 *             type: 
 *               type: string
 *               description: Type describes seriousness of error - RED(Extreme), YELLOW(Medium), BLUE(Neutral), RUNTIME
 *     responses:
 *       200:
 *         description: Sucessfuly inserted new error
 *       401:
 *         description: Query execution error
 */


app.post("/errorAdd", (req, res1) => {
    const { code, description, type } = req.body;

    db.query('INSERT INTO "ERROR_DICTIONARY" ("Code", "Description", "Type") VALUES ($1, $2, $3)', [code, description, type], (err, res2) => {
        if (err) {
            res1.status(401).json({ "message": "Query execution error" });
            return;
        }

        res1.status(200).json({ "message": "Sucessfuly inserted new error" });
    });
});

module.exports = app;
app.listen(3000);

// const options = {
//     key: fs.readFileSync("/etc/letsencrypt/live/si-2021.167.99.244.168.nip.io/privkey.pem"),
//     cert: fs.readFileSync("/etc/letsencrypt/live/si-2021.167.99.244.168.nip.io/fullchain.pem")
// };

// https.createServer(options, app).listen(3000);