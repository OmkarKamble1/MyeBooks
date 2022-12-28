const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:<password>@ebookmaker.kpixcqc.mongodb.net/users?retryWrites=true&w=majority";

module.exports.checkUserCnt = async (request, response) => {
  const { username } = request.body;
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({ username: String }),
    "credentials"
  );
  await model.findOne({ username: username }).then((res) => {
    if (res == null) {
      response.json({ message: "UserNotFound" });
      con.close();
    } else {
      response.json({ message: "UserFound" });
      con.close();
    }
  });
};
