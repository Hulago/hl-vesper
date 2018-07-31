"use strict";
exports.__esModule = true;
var vesper_1 = require("vesper");
var post_controller_1 = require("./controller/post.controller");
var post_entity_1 = require("./entity/post.entity");
var category_entity_1 = require("./entity/category.entity");
vesper_1.bootstrap({
    port: 3000,
    controllers: [post_controller_1.PostController],
    entities: [post_entity_1.Post, category_entity_1.Category],
    schemas: [__dirname + '/schema/**/*.graphql']
})
    .then(function () {
    console.log('Your app is up and running on http://localhost:3000. ' +
        'You can use playground in development mode on http://localhost:3000/playground');
})["catch"](function (error) {
    console.error(error.stack ? error.stack : error);
});
//# sourceMappingURL=index.js.map