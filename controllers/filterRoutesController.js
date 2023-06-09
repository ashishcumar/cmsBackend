const asyncHandler = require("express-async-handler");
const blog_data = require("../models/blogModels");

const filteredBlogs = asyncHandler(async (req, res) => {
  const { filterBy, filterFor } = req.body;
  console.log(req.body);
  if (!filterBy || !filterFor) {
    res.status(400).json({message:"All fields are mandatory! "});
    throw new Error("All fields are mandatory! ");
  }
  if (filterBy == "All posts") {
    const filteredRes = blog_data.find({ blogStatus: filterFor });
    res.status(200).json(filteredRes);
  }
  if (filterBy == "All authors") {
    const filteredRes = blog_data.find({ authors: filterFor });
    res.status(200).json(filteredRes);
  }
  if (filterBy == "All tags") {
    const filteredRes = await blog_data.find({ tags: filterFor });
    if (!filteredRes) {
      res.status(404).json({message:"filtered Response not found"});
      throw new Error("filtered Response not found");
    }
    res.status(200).json(filteredRes);
  }
  if (filterBy == "Sort by" && filterFor == "Oldest") {
    const filteredRes = await blog_data.find().sort({ createdAt: -1 });
    res.status(200).json(filteredRes);
  }
  if (filterBy == "Sort by" && filterFor == "Newest") {
    const filteredRes = await blog_data.find().sort({ createdAt: 1 });
    res.status(200).json(filteredRes);
  }
});

module.exports = filteredBlogs;
