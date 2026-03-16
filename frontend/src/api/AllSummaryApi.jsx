const backendDomain = "https://blog-project-cd89.onrender.com";

export const AllSummary_API = {
  signup: {
    url: `${backendDomain}/api/v1/users/register`,
    method: "POST",
  },

  login: {
    url: `${backendDomain}/api/v1/users/login`,
    method: "POST",
  },

  logout: {
    url: `${backendDomain}/api/v1/users/logout`,
    method: "POST",
  },

  getUserProfile: {
    url: `${backendDomain}/api/v1/users/get_user_profile`,
    method: "GET",
  },

  getAllPost: {
    url: `${backendDomain}/api/v1/users/get_all_posts`,
    method: "GET",
  },

  getUserPost: {
    url: `${backendDomain}/api/v1/users/get_user_posts`,
    method: "GET",
  },

  getSinglePost: {
    url: `${backendDomain}/api/v1/users/get_single_post`,
    method: "GET",
  },

  postData: {
    url: `${backendDomain}/api/v1/users/create_post`,
    method: "POST",
  },

  updatePost: {
    url: `${backendDomain}/api/v1/users/update_post`,
    method: "PUT",
  },

  // Author domain
  getAllAuthor: {
    url: `${backendDomain}/api/v1/users/get_all_author`,
    method: "GET",
  },

  createAuthor: {
    url: `${backendDomain}/api/v1/users/create_author`,
    method: "POST",
  },

  getSingleAuthor: {
    url: `${backendDomain}/api/v1/users/get_single_author`,
    method: "GET",
  },

  // get author post by id
  getAuthorPost: {
    url: `${backendDomain}/api/v1/users/get_author_post`,
    method: "GET",
  },

  getAuthorProfile: {
    url: `${backendDomain}/api/v1/users/get_author_profile`,
    method: "GET",
  },

  getDashboard: {
    url: `${backendDomain}/api/v1/users/get_dashboard`,
    method: "GET",
  },

  //  get author post if author login
  getAuthorPostLogin: {
    url: `${backendDomain}/api/v1/users/get_author_posts`,
    method: "GET",
  },

  deletePost: {
    url: `${backendDomain}/api/v1/users/delete_post`,
    method: "PUT",
  },

  authorDashboard: {
    url: `${backendDomain}/api/v1/users/get_author_dashboard_details`,
    method: "GET",
  },

  generateBlog: {
    url: `${backendDomain}/api/v1/users/generate_blog`,
    method: "POST",
  },

  //  comment
  commentPost: {
    url: `${backendDomain}/api/v1/users/post_comment`,
    method: "POST",
  },

  getComment: {
    url: `${backendDomain}/api/v1/users/get_comments`,
    method: "GET",
  },

  deleteComment: {
    url: `${backendDomain}/api/v1/users/delete_comment`,
    method: "DELETE",
  },
};
