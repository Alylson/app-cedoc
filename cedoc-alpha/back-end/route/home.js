module.exports = function(app) {
	var homeController = app.controller.HomeController;
	app.get('/', homeController.index);
};