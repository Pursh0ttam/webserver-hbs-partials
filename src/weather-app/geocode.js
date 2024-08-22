const request = require("request");
// const yargs = require("yargs");
// let cityname = yargs.argv._[0];

const geocode = (cityname, callback) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityname}&key=1476e2cd58d04998a13777b41671c3f3`;
  request({ url, json: true }, (error, res) => {
    if (error) {
      callback("unable to connect to internat", undefined);
    } else {
      data = res.body.results.map((e) => {
        let {geometry:{lat,lng},formatted} = e
        callback(undefined,{latitude:e.geometry.lat, longitude:e.geometry.lng,location:e.formatted});
        // console.log(undefined,{latitude:lat,longitude:lng,location:formatted});
    });
}

  });
};
// geocode("bihar", (error, data) => {
//   console.log("error", error);
//   console.log("data", data);
// });

module.exports = geocode;

