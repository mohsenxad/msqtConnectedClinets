const Tail = require('tail-file');

const mosquittoLogFilePath = '/var/log/mosquitto/mosquitto.log';
const mytail = new Tail(mosquittoLogFilePath, line => {
  if (line.includes("PINGRESP")){
      const deviceId = translatePingResponse(line);
      if(deviceId){
        processOnlineClient(deviceId);
      }
  }
});


function translatePingResponse(line){
    const regex = /\w* Sending PINGRESP to (\w*-\w*-\w*-\w*-\w*)/g;
    const found = [...line.matchAll(regex)];
    if(
      found[0] &&
      found[0][1]
    ){
      const manufactureId = found[0][1];
      return manufactureId;
    }else{
      console.log(`unknown line -> ${line}`);
    }
  
}

function processOnlineClient(deviceId){
    console.log(`${deviceId} is Online`);
}
