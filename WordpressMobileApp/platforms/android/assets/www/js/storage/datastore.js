/**
 * The data model for the Application, put any data fetching in here
 * @param Function callback A callback to execute upon construction of this model
 */
var DataStore = function(callback) {

	// Defined url for the posts to come from
	var url = "http://craigchilds.me/blog/?feed=json";
	var self = this;

	this.events = {};

	/**
	 * Get a post by its ID
	 * @param  Int  	id       	The id of the post
	 * @param  Function callback 	This is a callback which will be called after
	 * @return {DataStore}            this
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
	 * Get all posts where a match with the value is met
	 * @param  {String}   val      The value that is being matched
	 * @param  {Function} callback The function to call and pass the data to
	 * @return {DataStore}            this
	 */
	this.getByName = function(val, callback) {
		if(val == undefined) {
			return callback(this.posts);
		}

		var posts = this.posts;
		var returnable = [];
		for(index in posts) {
			post = posts[index];

			if(post.title.toLowerCase().trim().indexOf(val.toLowerCase().trim()) > -1) {
				returnable.push(post);
			}
		}

		return callback(returnable);
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
	 * If the posts aren't present in local storage, download them,
	 * and save them for later.
	 * @return JSON 	The data from the JSON feed
	 */
	this._getPosts = function() {
		var posts = window.localStorage.getItem("posts");

		if(posts == null) {
			posts = this._reload();
		}
		
		return JSON.parse(posts);
	};

	/**
	 * Reload the feed of posts.
	 * @return String  		A string format of the json encoded data
	 */
	this._reload = function(notifications) {
		var posts = JSON.parse(window.localStorage.getItem("posts"));
		
		$.ajaxSetup({'async' : false});
		$.getJSON(url, function(data) {
			changed = false;
			posts = data;
			old = JSON.parse(window.localStorage.getItem("posts"));

			// See if we're displaying notifications
			if(notifications === true) {

				// Check to see if theres a difference
				if(old.length != posts.length) {
					changed = true;
				}
			}

			if(changed) {
				window.localStorage.setItem("posts", JSON.stringify(posts));
				self.callLater(callback, self);

				window.plugin.notification.local.add({message: 'The feed has been updated.'});
			}
		});

		return posts;
	};

	/**
	 * Update the refresh rate for post loading
	 * @param  {Int} value how often (minutes) to update the feed
	 */
	this.updateRefresh = function(value) {
		this.refreshRate = value;
	};

	// Wait until the posts have been retrieved before calling the callback.
	this.posts = this._reload(false);
	this.callLater(callback, this);
	this.refreshRate = 60000; //60000 = 1 minute

	// Check every so often
	setInterval(function() {
		self.posts = self._reload(true);
	}, this.refreshRate);
};