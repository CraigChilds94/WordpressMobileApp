/**
 * Object that holds all of the router patternss
 */
var Patterns = function(main) {
	// view_name / url_pattern (regex)

	return [
		{ name: "post", pattern: /^#post(\d+)/ },
		{ name: "settings", pattern: /#(sett)/ }
	];
};