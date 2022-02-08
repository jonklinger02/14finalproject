const express = require("express");
let router = express.Router();
const { checkLoggedIn, checkToken } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const { sortArgsHelper } = require("../../config/helpers");

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
router
  .route("/admin/:id")
  .get(checkLoggedIn, grantAccess("readAny", "article"), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findById(_id);

      if (!article || article.length === 0) {
        return res.status(400).json({ message: "Article not found." });
      }

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ message: "Error fetching article.", error });
    }
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findOneAndUpdate(
          { _id },
          { $set: req.body },
          { new: true }
        );
        if (!article) {
          return res.status(400).json({ message: "Article not found." });
        }

        res.status(200).json(article);
      } catch (error) {
        res.status(400).json({ message: "error updating article", error });
      }
    }
  )
  .delete(
    checkLoggedIn,
    grantAccess("deleteAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findByIdAndDelete({ _id });

        if (!article) {
          return res.status(400).json({ message: "article not found" });
        }
        res.status(200).json(article);
      } catch (error) {
        res.status(400).json({ message: "error deleting article", error });
      }
    }
  );

//fetch articles with pagination
router
  .route("/admin/paginate")
  .post(checkLoggedIn, grantAccess("readAny", "articles"), async (req, res) => {
    try {
      const limit = req.body.limit ? req.body.limt : 5;
      const aggQuery = Article.aggregate();
      const options = {
        page: req.body.page,
        limit,
        sort: { _id: "desc" },
      };
      const articles = await Article.aggregatePaginate(aggQuery, options);
      res.status(200).json(articles);
    } catch (error) {
      res.status(400).json({ message: "Error fetching articles." });
    }
  });

///// NO AUTH REQUIRED /////

router.route("/getby_id/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const article = await Article.find({ _id, status: "public" });
    if (!article || article.length === 0) {
      return res.status(400).json({ message: "Article not found." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Error fetching article.", error });
  }
});

//fetch articles load more
router.route("/loadmore").post(async (req, res) => {
  try {
    // {
    //   sortBy: "_id",
    //   order:"asc",
    //   limit: 10,
    //   skip: 0
    // },

    let sortArgs = sortArgsHelper(req.body);
    const articles = await Article.find({ status: "public" })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    if (!articles || articles.length === 0) {
      res.status(400).json({ message: "Post an article first!" });
    }

    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ message: "Error fetching articles", error });
  }
});

module.exports = router;
