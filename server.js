const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use("/api", schoolRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
