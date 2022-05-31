const yes = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = 'you have to connect';
    res.redirect('/login');
  }
};

const no = (req, res, next) => {
  if (!req.session.isAuth) {
    next();
  } else {
    req.session.error = 'you are connected';
    res.redirect('/connected');
  }
};
module.exports = {yes , no}