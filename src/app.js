const express = require("express");

const path = require("path");
const hbs = require("hbs");
const geocode = require("./weather-app/geocode.js");
const forecast = require("./weather-app/forcaste");

let app = express();
let htmlFile = path.join(__dirname, "../public");
let viewsPath = path.join(__dirname, "../templates/views");
let partialPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

app.use(express.static(htmlFile));

app.get("/", (req, res) => {
  res.render("help");

  // res.send(`<h1>hello${45}</h1>`)
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/contact/*", (req, res) => {
  res.render("error", {
    title: "no contact is ther",
    errormessage: "this is error page",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "there is no search query",
    });
  } else {
    res.send({
      products: [],
    });
  }
});



app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.status.json({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    }
  
  );
});

// app.get("/weather", (req, res) => {
//   console.log(req.query.address);
//   if (!req.query.address) {
//     return res.send({
//       error: "there is no address",
//     });
//   } else {
//     geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {
//         if (error) {
//           return res.send({ error });
//         }
//         forecast(latitude, longitude, (error, forecastData) => {
//           if (error) {
//             return res.send({error});
//           }
//           res.send({
//               data: forecastData,
//               location: location,
//               address: req.query.address
//             });

//         });
//       }
//     );
//   }
// });

app.get("*", (req, res) => {
  res.render("error404", {
    title: "no contact is ther",
    errormessage: "this is error page",
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
