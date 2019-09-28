app.get("/", (req, res) => {
  if (!usingDatabase) {
    res.send("Cool!");
    return false;
  }


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
