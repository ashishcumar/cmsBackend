const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String, 
    required: [true,"Please add title." ]
  },
  slug :{
    type: String, 
    required: [true, "Please add slug." ]
  },
  html :{
    type: String, 
    required: [true, "Please add blog content" ]
  },
  short_Desp :{
    type: String, 
    required: [true, "Please add short Desp content" ]
  },
  feature_image :{
    type: String, 
    required:[true, "Please add Feautre image" ]
  },
  authors :{
    type: String, 
    required: [true , "Please add author name"]
  },
  tags :{
    type: String, 
    required: [true, "Please add tags" ]
  },
  activeFrom :{
    type: Date, 
    required: [true, "Please add activeFrom date" ]
  },
  blogStatus :{
    type: String, 
    required: [true, "Please blog status" ]
  },
},
{
    timestamps:true
}
);


module.exports = mongoose.model('blog_data',blogSchema)