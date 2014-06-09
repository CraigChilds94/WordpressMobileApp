/**
 * The data model for the Application, put any data fetching in here
 * @param Function callback A callback to execute upon construction of this model
 */
var DataStore = function(callback) {

	// Defined url for the posts to come from
	var url = "http://craigchilds.me/blog/?feed=json";
	var self = this;

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
		console.log("reloading posts");
		var posts;
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

			window.localStorage.setItem("posts", JSON.stringify(posts));

			if(changed) {
				window.plugin.notification.local.add({message: 'The feed has been updated.'});
				//self.callLater(callback, this);
			}
		});

		return posts;
	};

	/**
	 * Get currently stored settings and save defaults
	 * @return {Object} The settings
	 */
	this._getSettings = function() {
		if(!set['update_freq']) {
			set['update_freq'] = 50000;
			window.localStorage.setItem("settings", JSON.stringify(set));
		}

		set = JSON.parse(window.localStorage.getItem("settings"));	

		return set;
	};

	/**
	 * Save settings data to the localstorage
	 * @param  {Object} formInputs The form which the data is being stored from
	 * @return {Object} The settings which have been saved
	 */
	this.saveSettings = function(formInputs, callback) {

		$(formInputs).each(function() {
			name = $(this).attr('name');
			value = $(this).val();
			self.settings[name] = value;
		});

		window.localStorage.setItem("settings", JSON.stringify(self.settings));
		callback(self.settings);
	};

	// Wait until the posts have been retrieved before calling the callback.
	this._reload(false);

	// Grab the application settings
	//this.settings = this._getSettings();
	this.posts = this._getPosts();
	this.callLater(callback, this);

	// Check every so often
	/*setInterval(function() {
		self._reload(true);
	}, Number(self.settings['update_freq']));*/
};