const asyncHandler = require("express-async-handler");
const blog_data = require("../models/blogModels");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await blog_data.find({activeFrom : {$lte:new Date().toISOString()}});
  res.status(200).json(blogs);
});

const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await blog_data.find({ slug: req.params.slug });
  if (!blog) {
    res.status(404).json({message:"blog not found"});
    throw new Error("blog not found");
  }
  res.status(200).json(blog);
});

const createNewBlog = asyncHandler(async (req, res) => {
  const {title, slug, html, feature_image, authors, tags, activeFrom, blogStatus, short_Desp } = req.body;
  if (!title || !slug || !html || !feature_image || !authors || !tags || !blogStatus || !short_Desp) {
    res.status(400).json({message:"All fields are mandatory !"});
    throw new Error("All fields are mandatory !");
  }
  console.log(blogStatus)
  const newBlog = blog_data.create({
    title,
    authors,
    feature_image,
    html,
    slug,
    tags,
    activeFrom,
    blogStatus,
    short_Desp,
  });
  res.status(201).json({ data:newBlog,message:"blog added"});
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blog_data.find({ slug: req.params.slug });
  if (!blog) {
    res.status(404).json({message:"blog not found"});
    throw new Error("blog not found");
  }
  const updateBlogContent = await blog_data.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  res.status(200).json({data:updateBlogContent,message:"blog updated"});
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await blog_data.find({ slug: req.params.slug });
  if (!blog) {
    res.status(404).json({message:"blog not found"});
    throw new Error("blog not found");
  }
  await blog_data.findOneAndRemove({ slug: req.params.slug });
  res
    .status(200)
    .json({ message: `blog is deleted with id ->,${req.params.id}` });
});

module.exports = {
  getBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
