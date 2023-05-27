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
    required: [true, "Please active from date" ]
  },
},
{
    timestamps:true
}
);


module.exports = mongoose.model('blog_data',blogSchema)