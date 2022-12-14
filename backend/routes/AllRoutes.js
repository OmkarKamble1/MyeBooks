const router = require("express").Router();
const multer = require("multer");
const { loginCnt, signupCnt } = require("../controller/loginCnt");
const {
  bookCnt,
  allbooksCnt,
  saveBookCnt,
  getOneBook,
} = require("../controller/bookCnt");
const { checkUserCnt } = require("../controller/checkUserCnt");

const upload = multer({
  storage: multer.diskStorage({
    destination: (r, f, c) => {
      c(null, "./public/img");
    },
    filename: (r, f, c) => {
      c(null, Date.now() + ".jpeg");
    },
  }),
});
router.route("/save").post(upload.single("cover"), saveBookCnt);

router.route("/login").post(loginCnt);

router.route("/signup").post(signupCnt);

router.route("/book").post(bookCnt);

router.route("/book").get(allbooksCnt);

router.route("/getbook").post(getOneBook);

router.route("/checkuser").post(checkUserCnt);

module.exports = router;
