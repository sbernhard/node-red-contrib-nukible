var nukible = require('nukible');
var sodium = require('sodium');

var nuki = new nukible();

var appIdBuffer = new Buffer(4);
sodium.api.randombytes_buf(appIdBuffer);

var appId = appIdBuffer.readUInt32LE();
var appType = 2;
var name = "Nuki Home "+ appId;

function startPairing() {
  var options = {
    appId: appId, appType: appType, name: name, nukiLocks: {}
  };

  nuki.pair(options, function (err, pairingData) {
    if (err) {
      console.log("Pairing failed:", err);
    } else {
      console.log("--------------------------");
      console.log("Nuki pairing successfully.");
      console.log("--------------------------");
      console.log("AppId: "+ appId);
      console.log("PID: "+ pairingData.peripheralId);
      console.log("UUID: "+ pairingData.nukiUuid);
      console.log("AuthID: "+ pairingData.nukiAuthorizationId);
      console.log("SharedSecret: "+ pairingData.sharedSecret);
      console.log("--------------------------");
    }
  });
}

startPairing();
