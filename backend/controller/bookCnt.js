const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@ebookmaker.kpixcqc.mongodb.net/books?retryWrites=true&w=majority";

const uri2 =
  "mongodb+srv://admin:admin@ebookmaker.kpixcqc.mongodb.net/users?retryWrites=true&w=majority";

module.exports.bookCnt = async (request, response) => {
  const { username, isUser } = request.body;
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({ authorUsername: String, visibility: String }),
    "bookdetails"
  );
  if (isUser) {
    await model.find({ authorUsername: username }).then((res) => {
      response.json(res);
      con.close();
    });
  } else {
    await model
      .find({ authorUsername: username, visibility: "public" })
      .then((res) => {
        response.json(res);
        con.close();
      });
  }
};

module.exports.allbooksCnt = async (request, response) => {
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({ visibility: String }),
    "bookdetails"
  );
  await model
    .find({ visibility: "public" })
    .then((res) => {
      response.status(200).json(res);
      con.close();
    })
    .catch((err) => response.json(err));
};

module.exports.saveBookCnt = async (request, response) => {
  const cover = request.file;
  const { title, content, visibility, author } = request.body;

  const con2 = mongoose.createConnection(uri2);
  const model2 = con2.model(
    "modelname",
    mongoose.Schema({ username: String }, { strict: false }),
    "credentials"
  );
  model2.findOne({ username: author }).then((res) => {
    if (res == null) {
      response.json({ message: "UserNotFound" });
      con2.close();
    } else {
      const con = mongoose.createConnection(uri);

      const model = con.model(
        "modelname",
        mongoose.Schema({
          title: String,
          content: String,
          authorUsername: String,
          author: String,
          visibility: String,
          cover: mongoose.SchemaTypes.Mixed,
        }),
        "bookdetails"
      );
      const obj = new model({
        title: title,
        content: content,
        authorUsername: author,
        author: res.name,
        visibility: visibility,
        cover: cover,
      });
      obj.save((fail, succ) => {
        if (succ) {
          response.json({ message: "BookSaved" });
        } else {
          response.json({ message: "BookNotSaved" });
        }
      });
    }
  });
};

module.exports.getOneBook = async (request, response) => {
  const { id } = request.body;
  const con = mongoose.createConnection(uri);
  const model = con.model(
    "modelname",
    mongoose.Schema({}, { strict: false }),
    "bookdetails"
  );

  await model.findOne({ _id: id }).then((res) => {
    response.json(res);
    con.close();
  });
};
