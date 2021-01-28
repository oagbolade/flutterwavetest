const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use("/", require("./routes/api/home"));
app.use("/validate-rule", require("./routes/api/validation"));

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
