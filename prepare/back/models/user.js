module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // mysql에는 users 테이블 생성
    // 아이디가 기본적으로 들어있다. 1,2,3,4 순서대로 들어감
    email: {},
    nickname: {},
    password: {},
  }, {
    charset: 'utf8', // 이렇게 해줘야 한글 쓸 수 있음
    collate: 'utf8_general_ci', // 한글 저장
  });

  User.associate = (db) => {}; // 나중에할거
  return User;
}
// 이걸 시퀄라이즈에서는 모델이라 부르는데 이게 기본꼴이다.