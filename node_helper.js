const NodeHelper = require("node_helper");
const request = require("request-promise");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


module.exports = NodeHelper.create({
  start: function () {
    this.config = null;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.setupDoorbirdEvents();
      this.createExpressServer();
    } else if (notification === "ACTIVATE_DOOR_OPENER") {
      this.activateDoorOpener();
    } else if (notification === "START_MIC") {
      this.startMicrophone();
    } else if (notification === "STOP_MIC") {
      this.stopMicrophone(); }
  },

  createExpressServer: function () {
    const app = express();
    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get('/doorbell', (req, res) => {
      const doorbirdModule = 'MMM-doorbird'; // Le nom de votre module Doorbird
      const payload = { lockString: doorbirdModule };
      const notification = 'DOORBELL_ACTIVATED';
      this.sendSocketNotification("SHOW_VIDEO");
      console.log("SHOW_VIDEO socket notification sent");
      console.log("SCREEN_WAKEUP notification sent");

      res.send('Doorbell activated!');
    });

    app.post("/doorbird/notification", (req, res) => {
      console.log("Doorbird ring notification received");
      this.sendSocketNotification("SHOW_VIDEO");
      console.log("SHOW_VIDEO socket notification sent");
      res.sendStatus(200);
    });

    const port = this.config.modulePort;
    app.listen(port, () => {
      console.log(`MMM-doorbird listening on port ${port}`);
    });
  },

  startMicrophone: function () {},

  stopMicrophone: function () {},


  setupDoorbirdEvents: function () {
    // Configure Doorbird to notify when someone rings the bell
    const url = `${this.config.doorbirdUrl}/bha-api/notification.cgi?url=http://${this.config.magicMirrorIP}:${this.config.modulePort}/doorbell&event=doorbell&subscribe=1`;
    const options = {
      uri: url,
      auth: {
        user: this.config.doorbirdUsername,
        pass: this.config.doorbirdPassword,
        sendImmediately: false
       },
      method: "GET"
    };
    request(options).then(() => {
      console.log("Doorbird notifications configured");
    }).catch((error) => {
      console.error("Failed to configure Doorbird notifications", error);
    });
  },


  activateDoorOpener: function () {
    const url = `${this.config.doorbirdUrl}/bha-api/open-door.cgi?r=${this.config.doorbirdRelay}`;
    const options = {
      uri: url,
      auth: {
        user: this.config.doorbirdUsername,
        pass: this.config.doorbirdPassword,
        sendImmediately: false
      },
       method: "GET"
    };
      request(options).then(() => {
      console.log("Door opener activated");
      }).catch((error) => {
      console.error("Failed to activate door opener", error);
    });
  }
});
