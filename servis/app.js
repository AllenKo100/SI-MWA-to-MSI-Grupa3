const db = require("./db");
const https = require("https"),
fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
app.use(bodyParser());

const options = {
    key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
    cert: fs.readFileSync("/srv/www/keys/chain.pem")
  };

const swaggerOptions = {
    swaggerDefinition: {
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
 *     description: Create new log in database
 *     parameters:
 *       - time: time
 *         name: string
 *         location: string
 *         message: string
 *         cpuUsage: double
 *         ramUsage: double
 *         hddUsage: double
 *         gpuUsage: double
 *     responses:
 *       200:
 *         description: Created log
 */
app.post("/liveStatus", (req, response) => {

    const {timeStamp, name, location, message, cpuUsage, ramUsage, hddUsage, gpuUsage} = req.body;

    db.query('UPDATE "DEVICE" SET "Status" = $1, "LastTimeOnline" = $2  WHERE "Name"= $3 AND "Location" = $4 returning "DeviceId"', [true, timeStamp, name, location], (err, res2) => {
        
        if(err) {
            response.status(404).json({"message" : "Query execution error"});
            return;
        } 
        
        if(res2.rows.length == 0) {
            response.status(404).json({"message" : "Couldn't find device"});
            return;
        }

        let id = res2.rows[0].DeviceId;
        
        db.query('INSERT INTO "DEVICE_STATUS_LOG" ("TimeStamp", "DeviceId", "Message", "CpuUsage", "RamUsage", "HDDUsage", "GPUUsage") VALUES ($1, $2, $3, $4, $5, $6, $7)', [timeStamp, id, message, cpuUsage, ramUsage, hddUsage, gpuUsage], (err, res3) => {
            
            if(err) {
                response.status(404).json({"message" : "Couldn't update device status"});
                return;
            }
            
            response.status(200).json({"message" : "Device status has been updated successfully"});
            return;
        });
    });
})



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
 *     description: Creates record about occured error 
 *     parameters:
 *       - code: integer
 *         message: string
 *         name: string
 *         errorTime: time
 *         location: string
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
    
    const {code, message, name, errorTime, location} = req.body;

    db.query('SELECT "Id" FROM "ERROR_DICTIONARY" WHERE "Code"=$1', [code], (err, res2) => {
        
        if(err) {

            res1.status(401).json({"message" : "Couldn't find error type"});
            return;
        }
        db.query('SELECT "DeviceId" FROM "DEVICE" WHERE "Name"=$1 AND "Location"=$2', [name, location], (err, res3) => {

            if(err) {

                res1.status(402).json({"message" : "Couldn't find device"});
                return;
            }
            
            db.query('INSERT INTO "ERROR_LOG" ("Message", "DeviceId", "ErrorTypeId", "ErrorTime") VALUES ($1, $2, $3, $4)', 
            [message, res3.rows[0].DeviceId, res2.rows[0].Id, errorTime], (err, res4) => {

                    if(err) {
                        res1.status(403).json({"message" : "Couldn't insert error information"});
                        return;
                    }

                    res1.status(200).json({"message" : "Sucessfully inserted error information"});
                }
            );
        });
    });
});

https.createServer(options, app).listen(3000);