const NodeHelper = require("node_helper");
const request = require("request-promise");

module.exports = NodeHelper.create({
  start: function () {
    this.config = null;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.setupDoorbirdEvents();
    } else if (notification === "START_MIC") {
      this.startMicrophone();
    } else if (notification === "STOP_MIC") {
      this.stopMicrophone();
    } else if (notification === "ACTIVATE_DOOR_OPENER") {
      this.activateDoorOpener();
    }
  },

  setupDoorbirdEvents: function () {
    // Configure Doorbird to notify when someone rings the bell
    const url = `${this.config.doorbirdUrl}/bha-api/notification.cgi?url=http://${this.config.magicMirrorIP}:${this.config.magicMirrorPort}/doorbird/notification&event=doorbell&subscribe=1`;
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

startMicrophone: function () {
  // Implement microphone streaming to Doorbird
},

stopMicrophone: function () {
  // Stop microphone streaming to Doorbird
},

activateDoorOpener: function () {
  const url = `${this.config.doorbirdUrl}/bha-api/open-door.cgi?r=1`;
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
