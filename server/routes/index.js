const express = require("express");
const {
  login_controller,
  signup_controller,
  check_auth_controller,
  user_find,
  logout_user,
} = require("../controllers/auth_controllers");
const {
  check_auth_middleware,
} = require("../middleware/check_auth_middleware");
const { create_post_controller, get_all_posts_controller, get_posts_by_id, delete_post_by_id, edit_post_by_id } = require("../controllers/posts_controllers");
const { test_middleware } = require("../middleware/test_middleware");

const { response_controller } = require('../controllers/response_controllers')

const router = express.Router();

// router.get("/check-route", (req, res) => {
//   res.send("<h1>Route is working...!</h1>");
// });

router.post("/signup", signup_controller);
router.post("/login", login_controller);

router.delete('/logout', logout_user)
// Route to check authentication status
router.get("/check-auth", check_auth_middleware, check_auth_controller);
// In this route, the check_auth_middleware is passed before invoking the check_auth_controller.
// This middleware ensures that the user is authenticated before accessing the route.

// Route to create a new post, requires authentication

router.get('/user', check_auth_middleware, user_find)

router.post("/post", check_auth_middleware, create_post_controller)
// In this route, check_auth_middleware is passed before invoking create_post_controller.
// This ensures that the user is authenticated and any necessary validations for creating a post are performed before accessing the route.
router.get("/post", get_all_posts_controller)

// edit post route by id
router.put("/post/:id", edit_post_by_id);

// delete post route by id
router.delete("/post/:id", delete_post_by_id);

router.get("/post/user", check_auth_middleware, get_posts_by_id)
 
router.get('/check-middleware/:id',
  test_middleware,

  response_controller)





module.exports = router;
