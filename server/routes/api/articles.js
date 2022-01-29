const express = require("express");
let router = express.Router();
const { checkLoggedIn, checkToken } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

//model
const { Article } = require("../../models/article_model");

//add single article
router
  .route("/admin/add_article")
  .post(
    checkLoggedIn,
    grantAccess("createAny", "article"),
    async (req, res) => {
      try {
        const article = new Article({
          ...req.body,
          score: parseInt(req.body.score),
        });
        const result = await article.save();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: "Error adding article", error: error });
      }
    }
  );

//admin get,patch,delete, single article(draft or public)
//get articles no auth
//fetch articles load more
//fetch articles with pagination

module.exports = router;
