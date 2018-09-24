export default {
	checkAuth: function(){
		return fetch("/api/user/auth", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
	},
	handleLogin: function(userData){
		return fetch("/signin", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(userData),
        credentials: 'include',
        mode: 'cors'
      });
	},
	handleSignup: function(userData){
		return fetch("/signup", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(userData),
      credentials: 'include',
      mode: 'cors'
    });
	},
	handlelogout: function(){
		return fetch("/logout", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
	}
	
	// getCookies: function(){
	// 	const value = document.cookie;
	// 	let parts = value.split("user_email" + "; ");
	// 	parts = parts[0].split("=");
	// 	return decodeURIComponent(parts[1]);
	// },
	
}
