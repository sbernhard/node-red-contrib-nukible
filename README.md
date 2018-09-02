# node-red-contrib-nukible

A <a href="http://nodered.org" target="_new">Node-RED</a> node to control a Nuki smart lock.
For more information regarding Nuki, have a look at https://nuki.io

The node uses the open source javascript library https://github.com/as19git67/nukible

## Requirements
- A nuki smart lock
- a bluetooth device (like a USB bluetooth dongle on a Raspberry Pi)
- A node-red installation

## Installation

Have a look at https://nodered.org/docs/getting-started/adding-nodes how to install a node:

## Installation of nukible

Unfortunately, nukible isn't available on npm yet.
You can use the original source at https://github.com/as19git67/nukible.
Right now two Pull Requests are necessary to run nukible successfully. 
Add the PR number 8 and 9 of the original source manually or use the branch my-master of the the repo https://github.com/sbernhard/nukible

Step by step instruction by using the sbernhard/nukible my-master branch:
- Change to the node-red-contrib-nukible directory (e.g. $HOME/.node-red/node_modules/node-red-contrib-nukible)
- mkdir node_modules
- cd node_modules
- git clone https://github.com/sbernhard/nukible --branch my-master
- cd nukible
- read the installation instruction in README.md of nukible (do at least "npm install" and install all dependencies carefully!)

## Pair with Nuki lock
- Change to the nukible directory (e.g. $HOME/.node-red/node_modules/node-red-contrib-nukible/node_modules/nukible/)
- cp ../../scripts/pair_nuki.js .
- Switch on the Nuki pairing mode (read Nuki instructions)
- node pair_nuki.js
- Use the given pairing information

  AppId: 2318248227  
  PID: 12d272cc64e9  
  UUID: a8de233b5ba344f72933a56693abc2d3  
  AuthID: 135  
  SharedSecret: 28a88283727183727abeeeaf282737346277378446328197aa28ab37c72783a4  

## Usage
- Use the node-red-contrib-nukible nodes
- Add the credentials where were printed while paring to the nuki-credentials
- Deploy it and use it!

![Node-RED Nuki Node](/doc/nuki-node.png)

## Thanks
- Thanks to "as19git67" for the nodejs module "nukible" which this node-red node uses.
- Thanks to https://nuki.io for the really great smart lock!
