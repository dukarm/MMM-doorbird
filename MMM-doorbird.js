
Module.register("MMM-doorbird", {
  defaults: {
    doorbirdUrl: "",
    doorbirdHost: "",
    doorbirdUsername: "",
    doorbirdPassword: "",
    doorbirdRelay: "1",
    magicMirrorIP: "",
    magicMirrorPort: "",
    modulePort: "",
    displayDuration: 40 * 1000,
    width: 640,
    height: 480
  },


  start: function () {
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles: function () {
     return ["MMM-doorbird.css"];
  },


  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "video-container";

      if (this.config.doorbirdUrl && this.config.doorbirdHost && this.config.doorbirdUsername && this.config.doorbirdPassword && this.config.magicMirrorIP && this.config.magicMirrorPort && this.config.modulePort) {
       this.container = wrapper;

       var buttonContainer = document.createElement("div");
       buttonContainer.className = "button-container";
       buttonContainer.style.display = "none"; // Hide the buttons by default

       var closeButton = document.createElement("button");
       closeButton.className = "mmm-doorbird-close";
       closeButton.innerHTML = "<i class='fa-solid fa-xmark'></i>";
       closeButton.addEventListener("click", () => {
         this.closebuttonevent();
       });
       buttonContainer.appendChild(closeButton); // Append closeButton to  buttonContainer

       var micButton = document.createElement("button");
       micButton.className = "button green";
       micButton.innerHTML = "<i class='fas fa-phone'></i>";
       micButton.addEventListener("click", () => {
         this.handleMicButtonClick(micButton);
       });
       buttonContainer.appendChild(micButton);

       var doorButton = document.createElement("button");
       doorButton.className = "button";
       doorButton.setAttribute("data-locked", "true");
       doorButton.innerHTML = "<i class='fas fa-lock'></i>";
       doorButton.addEventListener("click", () => {
	 this.handleDoorButtonClick(doorButton);
         this.sendSocketNotification("ACTIVATE_DOOR_OPENER");
         });
       buttonContainer.appendChild(doorButton);

       wrapper.appendChild(buttonContainer);
       } else {
         wrapper.innerHTML = "Doorbird configuration is incomplete";
       }

    return wrapper;
  },


  closebuttonevent: function () {
    const videoContainer = document.querySelector(".video-container");
    const video = document.querySelector(".doorbird-video");
    const buttonContainer = document.querySelector(".button-container");

    video.src = ""; // Set the video src to an empty string to stop the request
    videoContainer.removeChild(video); // Remove the video element
    buttonContainer.style.display = "none"; // Hide the buttons
  },

  handleDoorButtonClick: function (button) {
    const locked = button.getAttribute("data-locked") === "true";
    if (locked) {
      button.innerHTML = "<i class='fas fa-unlock'></i>";
      button.setAttribute("data-locked", "false");
      this.sendSocketNotification("ACTIVATE_DOOR_OPENER");

      // Rétablir l'icône du cadenas verrouillé après 10 secondes
      setTimeout(() => {
        button.innerHTML = "<i class='fas fa-lock'></i>";
        button.setAttribute("data-locked", "true");
      }, 10 * 1000);
    }
  },

  handleMicButtonClick: function (button) {
    if (button.classList.contains("green")) {
      button.innerHTML = "<i class='fas fa-phone-slash'></i>";
      button.classList.remove("green");
      button.classList.add("red");
      this.sendSocketNotification("START_AUDIO");
    } else {
      button.innerHTML = "<i class='fas fa-phone-alt'></i>";
      button.classList.remove("red");
      button.classList.add("green");
      this.sendSocketNotification("STOP_AUDIO");
    }
  },

  showButtons: function () {
    const buttonContainer = document.querySelector(".button-container");
    if (buttonContainer) {
      buttonContainer.style.display = "block";
    }
  },

  hideButtons: function () {
    const buttonContainer = document.querySelector(".button-container");
    if (buttonContainer) {
      buttonContainer.style.display = "none";
    }
  },

  showVideo: function () {
    const doorbirdWrapper = document.getElementById("doorbird-wrapper");

    const video = document.createElement("img");
    this.sendNotification("SCREEN_WAKEUP");
    console.log('MMM-doorbird: Screen wakeup notification send.');
    video.id = "doorbird-video";
    video.src = this.videoUrl;
    video.style.width = this.config.width;
    video.style.height = this.config.height;
    doorbirdWrapper.insertBefore(video, doorbirdWrapper.firstChild);
  },

  hideVideo: function () {
    const doorbirdWrapper = document.getElementById("doorbird-wrapper");
    const videoElement = document.getElementById("doorbird-video");
    if (videoElement) {
      doorbirdWrapper.removeChild(videoElement);
    }
  },


  socketNotificationReceived: function (notification, payload) {
    console.log("Socket notification received:", notification, payload);
    if (notification === "SHOW_VIDEO") {
      this.videoUrl = `${this.config.doorbirdUrl}/bha-api/video.cgi?http-user=${encodeURIComponent(this.config.doorbirdUsername)}&http-password=${encodeURIComponent(this.config.doorbirdPassword)}`

      const videoContainer = document.querySelector(".video-container");
      const video = document.createElement("img");
      video.src = this.videoUrl;
      video.style.width = this.config.width;
      video.style.height = this.config.height;
      video.className = "doorbird-video";
      videoContainer.appendChild(video);

      const buttonContainer = document.querySelector(".button-container");
      buttonContainer.style.display = "block"; // Show the buttons

      setTimeout(() => {
        video.src = ""; // Set the video src to an empty string to stop the request
        videoContainer.removeChild(video); // Remove the video element
        buttonContainer.style.display = "none"; // Hide the buttons
       }, this.config.displayDuration);
    }
  }



});
