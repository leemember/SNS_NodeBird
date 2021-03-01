exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next(); // 그냥 next를 하면 다음 미들웨어로 넘어간다.
    } else {
      res.status(401).send('로그인이 필요합니다.');
      //로그인이 관련된 것은 401로 한다.
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
  };