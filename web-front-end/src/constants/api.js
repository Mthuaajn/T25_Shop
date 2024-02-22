const IPaddress = "https://localhost:3000";

export const api = {
  config: {
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: true,
  },

  // user authentication
  signup: IPaddress + "/signup",
  login: IPaddress + "/signin/",
  loginWithGoogle: IPaddress + "/auth/google/",
  profile: IPaddress + "/user/",
  getCart: IPaddress + "/api/v1/carts/",
  //getUser: IPaddress + "/api/v1/user/",

  //product api
  getAndCreateProduct: IPaddress + "/api/v1/product/",
  deleteProduct: IPaddress + "/admin/product/delete/",
  createProduct: IPaddress + "/admin/product/create/",
  editProduct: IPaddress + "/admin/product/update/",
  updateImage: IPaddress + "/admin/product/update-image/",
  getProductByDate: IPaddress +"/api/v1/product?sort=-createdAt",
  getProductByPrice: IPaddress +"/api/v1/product?sort=price",
  getProductByView: IPaddress +"/api/v1/product?sort=-ratingsQuantity",

  //category api
  getCategory: IPaddress + "/api/v1/category/",
  editCategory: IPaddress + "/admin/category/",
  createCategory: IPaddress + "/admin/category/",
  resetPassword: IPaddress + "/resetpassword/",
  verifyCode: IPaddress + "/verifycode/",
  changePassword: IPaddress + "/user/passwordm/",

  // product api
  getAllProduct: IPaddress + "/api/v1/product/",
  getAllCategory: IPaddress + "/api/v1/category/",
  getRelatedProduct: IPaddress + "/api/v1/product/related-products/",
  getTodayProducts: IPaddress + "/api/v1/product?stock[gt]=50&limit=4",

  //user api
  getAllUser: IPaddress + "/admin/",
  getUser: IPaddress + "/admin/user/",
  deleteUser: IPaddress + "/admin/user/",
  updateAvatar: IPaddress +"/user/update-avatar/",
  getAdminUser: IPaddress + "/admin/getAll?role=admin",
  getCustomerUser: IPaddress + "/admin/getAll?role=user",
  //order
  getOrder: IPaddress + "/admin/order/",
  createOrder: IPaddress + "/user/orders/create/",
  getAllOrderUser: IPaddress + "/user/orders/getOrder/",
  deleteOrder: IPaddress + "/user/orders/delete/",
  updateOrder: IPaddress + "/user/orders/update/",
  updateOrderAdmin: IPaddress + "/admin/orders/update/",
  getOneOrder: IPaddress + "/admin/orders/getOne/",
  getAllOrderAdmin: IPaddress + "/admin/orders/getAll/",
  getOneOrderUser: IPaddress + "/user/orders/getOne/",
  getAllOrderAdminNotPaid: IPaddress + "/admin/orders/getAll?StatusPaid=false",
  getAllOrderAdminPaid: IPaddress + "/admin/orders/getAll?StatusPaid=true",
  getAllOrderAdminNotDelivered: IPaddress + "/admin/orders/getAll?StatusDelivered=false",
  getAllOrderAdminDelivered: IPaddress + "/admin/orders/getAll?StatusDelivered=true",

  getOrderUser: IPaddress + "/user/order/",
  getChartData: IPaddress + "/api/v1/order/getStatsRevenueByDayOfWeek",
  getStatsProduct: IPaddress + "/api/v1/order/statsNumberProduct",
  getStatsOrder: IPaddress + "/api/v1/order/getStatsOrderLaster",
  getStatsToday: IPaddress + "/api/v1/adminPage/statsData",
 
  updateOrder: IPaddress + "/user/orders/update/",
  
  //review
  createReviewOfAProduct: IPaddress + "/api/v1/reviews/",
  getReviewOfAProduct: IPaddress + "/api/v1/product/",
  link: IPaddress,
  // image api
  getImage: IPaddress + "/image/",

  //payment api
  checkout: "https://localhost:3003/pay/tranfer",
};
