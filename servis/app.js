const db = require("./db");
const bodyParser = require("body-parser");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
app.use(bodyParser());

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
 *     responses:
 *       200:
 *         description: Created log
 */
app.post("/liveStatus", (req, response) => {

    const {timeStamp, name, location, message} = req.body;

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
        
        db.query('INSERT INTO "DEVICE_STATUS_LOG" ("TimeStamp", "DeviceId", "Message") VALUES ($1, $2, $3)', [timeStamp, id, message], (err, res3) => {
            
            if(err) {
                response.status(404).json({"message" : "Couldn't update device status"});
                return;
            }
            
            response.status(200).json({"message" : "Device status has been updated successfully"});
            return;
        });
    });
})

app.listen(3000);