const Post_Schema = require("../models/Post_Model");


const create_post_controller = async (req, res) => {
  try {
    // Retrieving the authenticated user from the req object, set by the middleware
    const user = req.user;
    console.log(user,"user")
    // Extracting the post data from the request body
    const body = req.body;
    // Creating a new post with the user's ID attached
    console.log('user created')
    const create_post = await Post_Schema.create({
      ...body,
      user_id: user._id,
    });

    // Returning success response with the newly created post data
    return res.status(200).json({data:create_post, message:"Successfully"});
  } catch (error) {
    // Handling any errors that occur during the controller execution
    return res.status(500).json({ success: true, message: "Internal server error!", errors:error.message });
  }
};


const get_all_posts_controller = async (req, res, next) => {

  try {
    const find_posts = await Post_Schema.find().populate('user_id', {password:0})



    return res.json({ success: true, data: find_posts });



  } catch (error) {
    // Handling any errors that occur during the controller execution
    return res.status(500).json({ success: false, message: "Internal server error!", error });
  }

}

// get posts by id for those user they were login
const get_posts_by_id = async(req,res)=>{
  try {
    const id = req.user._id
    // console.log(id)
    const response = await Post_Schema.find({user_id:id})
    res.status(200).json({
      data:response,
      success:true
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error!", error }); 
  }
}

// edit post by id
const edit_post_by_id = async(req,res)=>{
  const body = req.body
  const id = req.params.id
  try {
    const response = await Post_Schema.findByIdAndUpdate(id,body)
    console.log("updated Post");
    res.status(200).json({success:true,data:response})
  } catch (err) {
    res.status(500).json({
      success: false, message:"Internal Sever Error",
      error:err.message
    })
  }
}

// delete post by id
const delete_post_by_id = async(req,res)=>{
  try {
    const id = req.params.id
    const response = await Post_Schema.findByIdAndDelete(id)
    res.status(200).json(response)
    console.log("delete post")

  } catch (error) {
    res.status(500).json({success:false,message:'Internal Server Error'})
  }
}

module.exports = { create_post_controller, get_all_posts_controller,get_posts_by_id, edit_post_by_id, delete_post_by_id };
