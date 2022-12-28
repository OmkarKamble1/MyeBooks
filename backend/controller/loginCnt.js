const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:<password>@ebookmaker.kpixcqc.mongodb.net/users?retryWrites=true&w=majority";

module.exports.loginCnt = async (request, response) => {
  const { username, password } = request.body;
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({ username: String, password: String }, { strict: false }),
    "credentials"
  );
  await model
    .findOne({ username: username, password: password })
    .then((res) => {
      if (res == null) {
        response.json({ message: "UserNotFound" });
        con.close();
      } else {
        response.json({ message: "UserFound" });
        con.close();
      }
    });
};

module.exports.signupCnt = async (request, response) => {
  const { name, username, password } = request.body;
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({ username: String }),
    "credentials"
  );
  await model.findOne({ username: username }).then((res) => {
    if (res == null) {
      const model2 = con.model(
        "modelname",
        mongoose.Schema({ name: String, username: String, password: String }),
        "credentials"
      );
      const obj = new model2({
        name: name,
        username: username,
        password: password,
      });
      obj.save(function (err, succ) {
        if (err) {
          response.json({ message: "UserNotRegistered" });
          con.close();
        } else {
          response.json({ message: "UserRegistered" });
          con.close();
        }
      });
    } else {
      response.json({ message: "UserExists" });
      con.close();
    }
  });
};
