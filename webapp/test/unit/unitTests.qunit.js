/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"extra_services/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
