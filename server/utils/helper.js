module.exports = {
  getCurrentuserId: (req) => {
    let userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.user;
      console.log(`user: ${userId}`);
    } else {
      userId = false
    }
    return userId
  },

  isAuthenticated: (req) => {
    if(req.isAuthenticated()){
      return true
    }
    else {
      return false
    }
  }
}