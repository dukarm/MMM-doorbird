# MMM-doorbird

A MagicMirror² module for integrating with Doorbird D1101V-S.

## Installation

1. Navigate to the `modules` folder of your MagicMirror² installation.
2. Clone this repository: `git clone https://github.com/dukarm/MMM-doorbird.git`.
3. Install the dependencies: `cd MMM-doorbird && npm install`.
4. Add the `MMM-doorbird` module to your `config.js` file.

## Configuration

Add the following configuration to your `config.js` file:

```javascript
{
  module: "MMM-doorbird",
  position: "bottom_right",
  config: {
    doorbirdUrl: "http://192.168.1.100", // Replace with your Doorbird's IP address
    doorbirdUsername: "doorbirdUsername", // Replace with your Doorbird username
    doorbirdPassword: "doorbirdPassword", // Replace with your Doorbird password
    magicMirrorIP: "192.168.1.200", // Replace with your MagicMirror's IP address
    magicMirrorPort: "8080", // Replace with your MagicMirror's port
    displayDuration: 40 * 1000,
    width: 640,
    height: 480
  }
}

## Usage

When someone rings the bell on your Doorbird D1101V-S, the video feed will be displayed on your MagicMirror² for 40 seconds (or the duration configured in `displayDuration`). There will be two buttons below the video feed:

1. A green phone button 📞: Press this button to start two-way audio communication through your MagicMirror's microphone. The button will turn red, and pressing it again will end the audio communication.
2. A door unlock button 🔓: Press this button to activate the electric door opener connected to your Doorbird device.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues on the repository.

## License

This project is licensed under the MIT License.
