var Posts = function(callback) {

	// Defined url for the posts to come from
	var url = "http://craigchilds.me/blog/?feed=json";

	/**
	 * Get a post by its ID
	 * @param  Int  	id       	The id of the post
	 * @param  Function callback 	This is a callback which will be called after
	 * @return JSON 	post 		The post that's being looked for
	 */
	this.getById = function(id, callback) {
		var posts = this.posts;
		for(i = 0; i < posts.length; i++) {
			if(posts[i].id === id) {
				post = posts[i];
				break;
			}
		}

		return callback(post);
	};
	
	/**
	 * Wait to call a function, simulates async
	 * @param  Function 	callback 	The function to call
	 * @param  Generic   	data     	Data to pass to the callback
	 * @return Generic            		Returns any data returned by a callback
	 */
	this.callLater = function(callback, data) {
		if (callback) {
			setTimeout(function() {
				return callback(data);
			});
		}
	};

	/**
	 * This is a PRIVATE function, it gets the list of posts from the WP page
	 * @return JSON 	The data from the JSON feed
	 */
	this._getPosts = function() {
		var posts;

		$.ajaxSetup({'async' : false});
		$.getJSON(url, function(data) {
			posts = data;
		});

		return posts;
	};

	// Wait until the posts have been retrieved before calling the callback.
	this.posts = this._getPosts();
	this.callLater(callback);
};