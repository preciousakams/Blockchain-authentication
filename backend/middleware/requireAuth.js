module.exports = function (req, res, next) {
  if (!req.session.siwe) {
    res.status(401).json({ message: 'You have to sign_in first' });
    return;
}

next();
};

