/**
 * This object handles the routing side of the application
 * @param {Post} datastore The data that the application has access to
 */
var Router = function(datastore, patterns) {
	
	// Global information to store
	this.store = datastore;
	this.hash = window.location.hash;
	this.match;

	/**
	 * Run the router
	 * @param  {Object}   routes   Has view objects linked to route
	 * @param  {Function} callback Called upon termination of this function call
	 * @return {Router}            Return itself
	 */
	this.run = function(routes, callback) {
		data = {
			store : this.store
		};

		if(!this.hash) {
			routes['index'](data);
		} else {
			for(key in patterns) {
				route = patterns[key];
				this.match = this.hash.match(route.pattern);

				if(this.match) {
					data.match = this.match;
					r = routes[route.name];
					if(r != undefined) {
						view = r(data);
					} else {
						view = routes['index'](data);
					}

					break;
				}
			}
		}


		callback(this);
		return this;
	};
}