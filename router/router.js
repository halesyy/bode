/*
 * Safe-to-use areas of the application for
 * retrieving data from the frontend.
 */
app.use(express.static('../public'));

/*
 * The main routes for the application, macro, simple.
 */
require("./routes/directions");
