/*
 * Use req.session to get session information
 * Make sure session setup using MySQL database
 * global.uuid() is the random generator for
 * id's, best to use in generating users.
 */

app.get("/", (req, res) => {
  if (!req.session.uuid) {
    req.session.uuid = global.uuid();
    var set = true;
  } else var set = false;
  var uuid = req.session.uuid;
  res.render("../public/index", {
    uuid: uuid,
    justSet: set
  });
})

app.get("/login", (req, res) => {
  res.render("../public/login");
});

app.post("/login", (req, res) => {
  res.send(`${req.body.username}`);


});

app.get("/logout", (req, res) => {
  req.session.uuid = null;
  res.send("Done");
})
