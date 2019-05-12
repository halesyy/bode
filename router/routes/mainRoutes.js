app.get("/", (req, res) => {
  if (req.session.uid) res.send(req.session.uid)
  else {
    req.session.uid = uuid();
    res.send("Just set your UUID to "+req.session.uuid);
  }
})

app.get("/login", (req, res) => {
  res.send(`Your id is ${req.session.uid}`);
})
