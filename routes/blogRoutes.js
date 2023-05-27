const express = require("express");
const router = express.Router();
const {
  createNewBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} = require("../controllers/blogRoutesController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/", getBlogs);
router.get("/:slug", getSingleBlog);
router.post("/create", validateToken, createNewBlog);
router.put("/:slug", validateToken, updateBlog);
router.delete("/:slug", validateToken, deleteBlog);

module.exports = router;
