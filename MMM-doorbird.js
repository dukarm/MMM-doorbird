Module.register("MMM-doorbird", {
  defaults: {
    doorbirdUrl: "",
    doorbirdUsername: "",
    doorbirdPassword: "",
    magicMirrorIP: "",
    magicMirrorPort: "",
    displayDuration: 40 * 1000,
    width: 640,
    height: 480
  },

  start: function () {
    this.visible = false;
    this.videoUrl = "";
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles: function () {
    return ["MMM-doorbird.css"];
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "MMM-doorbird";

    if (this.visible) {
      var video = document.createElement("video");
      video.setAttribute("src", this.videoUrl);
      video.setAttribute("autoplay", "autoplay");
      video.setAttribute("width", this.config.width);
      video.setAttribute("height", this.config.height);
      wrapper.appendChild(video);

      // Add buttons for microphone and door control
      var buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      var micButton = document.createElement("button");
      micButton.className = "button green";
      micButton.innerHTML = "📞";
      micButton.addEventListener("click", () => {
        this.handleMicButtonClick(micButton);
      });
      buttonContainer.appendChild(micButton);

      var doorButton = document.createElement("button");
      doorButton.className = "button";
      doorButton.innerHTML = "🔓";
      doorButton.addEventListener("click", () => {
        this.sendSocketNotification("ACTIVATE_DOOR_OPENER");
      });
      buttonContainer.appendChild(doorButton);

      wrapper.appendChild(buttonContainer);
    }

    return wrapper;
  },

  handleMicButtonClick: function (button) {
    if (button.classList.contains("green")) {
      button.innerHTML = "📞";
      button.classList.remove("green");
      button.classList.add("red");
      this.sendSocketNotification("START_MIC");
    } else {
      button.innerHTML = "📞";
      button.classList.remove("red");
      button.classList.add("green");
      this.sendSocketNotification("STOP_MIC");
    }
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "SHOW_VIDEO") {
      this.videoUrl = payload;
      this.visible = true;
      this.updateDom();
      setTimeout(() => {
        this.visible = false;
        this.updateDom();
      }, this.config.displayDuration);
    }
  }
});
