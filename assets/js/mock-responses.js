(function ($, undefined) {

	// order matters: for the same url, put more specific request matchers first
	var mockResponses = [
	// Claims: filter out the dependents, only show primary subscriber
	{
		url: Routes.getClaims,
		type: "POST",
		data: {
			show: "primary"
		},
		proxy: 'assets/json/claims-data--primary.json'
	},
	// Claims: show 404 error exception
	{
		url: Routes.getClaims,
		type: "POST",
		data: {
			show: "error"
		},
		status: 404
	},
	// Claims: happy path / success route
	{
		url: Routes.getClaims,
		proxy: 'assets/json/claims-data.json'
	}];

	var defaults = {
		responseTime: 1000,
		status: 200
	};

	function initMockResponse(i, mockConfig) {
		var config = $.extend({}, defaults, mockConfig);

		$.mockjax(config);
	}

	$.each(mockResponses, initMockResponse);

}(jQuery));
