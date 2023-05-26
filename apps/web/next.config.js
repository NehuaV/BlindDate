const path = require("path");
require("dotenv").config({ path: "../../.env" });

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: ["fastly.picsum.photos", "myprofilepage.com.au"],
  },
};
