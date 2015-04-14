var claimsApp = function () {

	var data = {}

	// put the loader on the screen
	var ajaxLoader = function() {
		$('#claims-container tbody').empty();
		$('#claims-container tbody').append('<span class="loader"></span>');
	}

	// success handler for "get-claims" JSON call
	var getClaimsSuccess = function(response){
		$('#claims-container tbody').empty();

		// loop for putting the claims on the screen
		$.each(response.claims, function(i, claimObj){
			var claim = "<tr><td>"+ (i+1) +"</td><td><strong>"+ claimObj.claimNumber +"</strong></td><td>"+ claimObj.claimant +"</td><td>"+ claimObj.description +"</td></tr>"
			$('#claims-container tbody').append(claim);
		});
	}

	// failure handler for "get-claims" JSON call
	var getClaimsFailure = function(jqXHR) {
		var error = "<tr><td></td><td colspan='3'><p>Sorry, we couldn't find any of your claims</p></td></tr>";
		$('#claims-container tbody').empty();
		$('#claims-container tbody').append(error);
	}

	// this will be a public method
	var init = function () {
		ajaxLoader();
		$.getJSON(Routes.getClaims, getClaimsSuccess).fail(getClaimsFailure);

		// event handlers
		$('.filter').on('click', function(){
			data = { show: "primary" }
			filterDependents();
		});
		$('.filter--error').on('click', function(){
			data = { show: "error" }
			filterDependents();
		});
	}

	// show only claims for the primary account holder
	var filterDependents = function() {
		ajaxLoader();
		$.post(Routes.getClaims, data, getClaimsSuccess, 'json').fail(getClaimsFailure);
	}

	return {
		// declare which properties and methods are supposed to be public
		init: init,
		filterDependents: filterDependents
	}
}();

$(document).ready(function(){
	claimsApp.init();
});
