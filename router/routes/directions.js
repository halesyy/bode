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

  bcrypt.hash("oops", 10, (err, hash) => {
    let insert = {
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

app.get("/login", (req, res) => {
  res.render("../public/login");
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
