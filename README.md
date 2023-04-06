# MMM-doorbird

`MMM-doorbird` is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror) project by [DukArm](http://michaelteeuw.nl/dukarm/magicmirror). This module allows you to integrate your [DoorBird](https://www.doorbird.com/) video doorbell into your MagicMirror² setup, displaying live video feed and notifications from your DoorBird device.

![MMM-doorbird screenshot](screenshot.png)

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Customization](#customization)
4. [Troubleshooting](#troubleshooting)
5. [License](#license)

## Installation

To install the `MMM-doorbird` module, follow these steps:

1. Navigate to the `modules` folder of your MagicMirror² installation:

  `cd ~/MagicMirror/modules`
  
2. Clone the `MMM-doorbird` repository:

  `git clone https://github.com/dukarm/MMM-doorbird.git`

3. Install the required dependencies:

   `cd MMM-doorbird
   npm install`

4. Add the `MMM-doorbird` module to your `config.js` file (see [Configuration](#configuration) below for details).

## Configuration

To configure the `MMM-doorbird` module, add the following configuration block to the `modules` array in your `config.js` file:

```
{
module: "MMM-doorbird",
position: "middle_center", // Change this to any valid MagicMirror² position
config: {
 doorbirdHost: "DOORBIRD_IP_ADDRESS",
 doorbirdUser: "DOORBIRD_USERNAME",
 doorbirdPassword: "DOORBIRD_PASSWORD",
 // Additional configuration options go here
}
},
```

Replace DOORBIRD_IP_ADDRESS, DOORBIRD_USERNAME, and DOORBIRD_PASSWORD with the corresponding values for your DoorBird device.

### Configuration Options

| Option                | Description                                                                                                    | Default       |
|-----------------------|----------------------------------------------------------------------------------------------------------------|---------------|
| doorbirdUrl           | The http URL of your DoorBird device.                                                                          | *Required*    |
| doorbirdHost          | The IP address or hostname of your DoorBird device.                                                            | *Required*    |
| doorbirdUser          | The username for accessing your DoorBird device.                                                               | *Required*    |
| doorbirdPassword      | The password for accessing your DoorBird device.                                                               | *Required*    |
| notificationTimeout   | The duration (in milliseconds) for which the notification will be displayed after an event is detected.        | 40000         |
| moduleIP              | The IP address or hostname of the module for receive notification from Dorrbird                                | *Required*    |
| modulePort            | Listen port of the module for receive notification from Dorrbird                                               | 8090          |
| width                 | The width (in pixels) of the live video feed.                                                                  | 640           |
| height                | The height (in pixels) of the live video feed.                                                                 | 480           |
| doorbirdRelay         | The height (in pixels) of the live video feed.                                                                 | 1             |

## Customization

To customize the appearance of the MMM-doorbird module, you can modify the MMM-doorbird.css file located in the MMM-doorbird folder.

## Troubleshooting

If you encounter any issues while using the MMM-doorbird module, please check the following:

1. Ensure that your DoorBird device is properly set up and connected to your network.
2. Verify that the configuration in your config.js file is correct, including the DoorBird device's IP address, username, and password.
3. Check the MagicMirror² logs for any error messages related to the MMM-doorbird module.
4. If you still have issues, please create an issue on the MMM-doorbird GitHub repository (https://github.com/dukarm/MMM-doorbird/issues) with a detailed description of the problem, and we'll do our best to help you resolve it.

## License

MMM-doorbird is licensed under the MIT License. You are free to use, modify, and distribute this software, as long as the copyright notice and permission notice are included in all copies or substantial portions of the software.
