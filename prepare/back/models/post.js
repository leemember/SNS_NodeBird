module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // mysql에는 users 테이블 생성
    // 아이디가 기본적으로 들어있다.
    email: {},
    nickname: {},
    password: {},
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });

  User.associate = (db) => {};
  return User;
}
// 이걸 시퀄라이즈에서는 모델이라 부르는데 이게 기본꼴이다.