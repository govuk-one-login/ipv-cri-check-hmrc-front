import "dotenv/config";

export default {
  paths: ["./features/**/**.feature"],
  import: ["./support/**/*.js", "./step_definitions/**/*.js", "./pages/*.js"],
  tags: "not @skip",
};
