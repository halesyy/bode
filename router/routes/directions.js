/*
 * Use req.session to get session information
 * Make sure session setup using MySQL database
 * global.uuid() is the random generator for
 * id's, best to use in generating users.
 */
const bcrypt = require("bcrypt");

app.get("/", async (req, res) => {
  // if (!req.session.uuid) {
  //   req.session.uuid = global.uuid();
  //   var set = true;
  // } else var set = false;
  // var uuid = req.session.uuid;
  const uuid = global.uuid();
  req.session.uuid = uuid;
  bcrypt.hash("oops", 10, (err, hash) => {
    let insert = {
        uuid: uuid,
        username: "jack",
        password: hash,
        firstName: "Jack",
        lastName: "Hales"
      }.into("users");
  });
  res.render("../public/index", {
    uuid: "asd",
    justSet: true
  });
})

app.get("/login", async (req, res) => {
  if (req.session.uuid) {
    var rows = await "SELECT username FROM users WHERE uuid = :uuid".bound({
      uuid: req.session.uuid
    });
    var user = rows[0];
    res.render("../public/login", {
      welcomeTo: user
    });
  }
  else {
    res.send("oops you arent logged in wait what");
  }
});

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // :: getting hash to compare to
  var rows = await "SELECT password FROM users WHERE username = :un".bound({
    "un": username
  });
  if (rows.length === 0) {
    res.send("nothing");
    return false;
  }
  var user = rows[0];
  await bcrypt.compare(password, user.password, (error, correct) => {
    if (correct) {
      res.send(`${req.body.username}`);
    }
    else {
      res.send("you gay");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.uuid = null;
  res.send("Done");
})
