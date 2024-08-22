const request = require("request");

let forecast = (lat, lng, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2a4ff28101b1c7e9ce57282512b97c64`;

  request({url, json: true }, (error, {body}) => {
    if (error) {
     return callback(error,undefined);
      // console.log(error,undefined);
    } else {
     return callback(undefined,body);
      // console.log(undefined,body);
    }
  });
};

// forecast(12.9716,77.5946)

module.exports = forecast;
