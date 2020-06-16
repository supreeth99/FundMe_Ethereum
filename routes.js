const routes = require("next-routes")();
routes
  //.add("/funds/new", "/funds/new")
  .add("/funds/:address", "/funds/show") //:means wildcard it changes everytime
  .add("/fundpage","/funds/list");
  //.add("/funds/:address/requests", "/funds/requests/index")
  //.add("/funds/:address/requests/new", "/funds/requests/new");
module.exports = routes;
