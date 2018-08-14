/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {

	"use strict";
  var nukible = require('nukible');

  function nukibleCredentialsNode(config) {

		RED.nodes.createNode(this, config);
		var node = this;

    node.log("Initialize node Nukible");
  }

  RED.nodes.registerType("nukible-credentials",nukibleCredentialsNode,{
    credentials: {
      nuki_name: { type: "text" },
      app_id: { type: "text" },
      nuki_locks_pid: { type: "text" },
      nuki_locks_uuid: { type: "password" },
      nuki_locks_authid: { type: "password" },
      nuki_locks_sharedsecret: { type: "password" }
    }
  });

  function setOptions(credentials) {
    var c = credentials;
    var options;

    var app_name = c.nuki_name +" "+ c.app_id;
    var app_type = 2;

    var nukiLock = {
      nukiUuid: c.nuki_locks_uuid,
      nukiAuthorizationId: c.nuki_locks_authid,
      sharedSecret: c.nuki_locks_sharedsecret
    };

    options = {
      appId: c.app_id,
      appType: app_type,
      name: app_name,
      nukiLock: nukiLock,
      peripheralId: c.nuki_locks_pid
    };

    return options;
  }

  function nukibleLock(config) {
		RED.nodes.createNode(this, config);
		var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        node.log("Locking...");
        var nuki = new nukible();
        nuki.lock(options, function (err) {
          if (err) {
            node.error("Locking the door failed", err);
          } else {
            node.log("Door is now locked.");
            msg.payload = "LOCKED";
            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-lock", nukibleLock);

  function nukibleUnlock(config) {
		RED.nodes.createNode(this, config);
		var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        console.log("Unlocking...");
        var nuki = new nukible();
        nuki.unlock(options, function (err) {
          if (err) {
            node.error("Unlocking the door failed", err);
          } else {
            node.log("Door is now unlocked.");
            msg.payload = "UNLOCKED";
            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-unlock", nukibleUnlock);

  function nukibleUnlatch(config) {
		RED.nodes.createNode(this, config);
		var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        console.log("Unlatching...");
        var nuki = new nukible();
        nuki.unlatch(options, function (err) {
          if (err) {
            node.error("Unlatching the door failed", err);
          } else {
            node.log("Door is now unlatched.");
            msg.payload = "UNLATCHED";
            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-unlatch", nukibleUnlatch);

  function nukibleLockNGo(config) {
		RED.nodes.createNode(this, config);
		var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        console.log("Lock'n'Go...");
        var nuki = new nukible();
        nuki.lock_n_go(options, function (err) {
          if (err) {
            node.error("Lock'n'go the door failed", err);
          } else {
            node.log("Door is now in Lock'n'go mode.");
            msg.payload = "LockNGo";
            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-lock-n-go", nukibleLockNGo);

  function nukibleLockNGoWithUnlatch(config) {
		RED.nodes.createNode(this, config);
		var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        console.log("Lock'n'go with Unlatch...");
        var nuki = new nukible();
        nuki.lock_n_go_with_unlatch(options, function (err) {
          if (err) {
            node.error("Lock'n'go with unlatch the door failed", err);
          } else {
            node.log("Door is now in Lock'n'go with unlatch mode.");
            msg.payload = "LockNGoWithUnlatch";
            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-lock-n-go-with-unlatch", nukibleLockNGoWithUnlatch);

  function nukibleState(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var nuki_config = RED.nodes.getNode(config.nukible);
    var credentials = nuki_config.credentials;
    var options = setOptions(credentials);

    if (options.appId)
    {
      node.on("input", function(msg) {
        node.log("Getting nuki states... for "+ JSON.stringify(options));
        var nuki = new nukible();
        nuki.getNukiStates(options, function (err, data) {
          if (err) {
            node.error("Getting the Nuki door state failed", err);
          } else {
            //31 Aug 20:59:25 - [info] [nukible-state:nukible-state] {"status":"complete","states":{"nukiState":2,"nukiStateStr":"door mode","lockState":1,"lockStateStr":"locked","trigger":0,"triggerStr":"bluetooth","time":"2018-08-31T18:59:34.000Z","timeOffset":120,"batteryCritical":false,"batteryCriticalStr":"ok","configUpdateCount":7,"lockNGoTimer":0,"lastLockAction":0,"lastLockActionStr":"unknown","lastLockActionTrigger":0,"lastLockActionTriggerStr":"bluetooth","lastLockActionTriggerCompletionStatus":0}}

            msg.payload = {};
            msg.payload.stateInfo = data.status;
            msg.payload.nukiState = data.states.nukiState;
            msg.payload.lockState = data.states.lockState;
            msg.payload.batteryCritical = data.states.batteryCritical;

            // nukiState:
            // case 0:
            // nukiStates.nukiStateStr = "uninitialized";
            // nukiStates.nukiStateStr = "pairing mode";
            // nukiStates.nukiStateStr = "door mode";

            // lockState:
            //  case 0: // uncalibrated
            //  case 1: // locked
            //  case 2: // unlocking
            //  case 3: // unlocked
            //  case 4: // locking
            //  case 5: //unlatched
            //  case 6: // unlocked (lock'n'go)
            //  case 7: // unlatching
            //  case 0xFE: // motor blocked
            //  case 0xFF: // undefined

            // batteryCrtitical: boolean (true= critical)

            node.log("Nuki stateInfo: "+ data.status +
              ", nukiState: "+ data.states.nukiStateStr +
              ", lockState: "+ data.states.lockStateStr +
              ", batteryCritical: "+ data.states.batteryCriticalStr);

            node.send(msg);
          }
        });
      });
    }
  }
  RED.nodes.registerType("nukible-state", nukibleState);
}

// vim: ts=2 sw=2 sts=2 et
