module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // mysql에는 users 테이블 생성
    // 아이디가 기본적으로 들어있다. 1,2,3,4 순서대로 들어감
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, FLOAT, DATETIME, 등등 데이터타입이 있다.
      allowNull : false, // 필수
      unique : true, // 고유한 값 (다른사람들이랑 중복되면 안되기 때문이다.)
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull : false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull : false, // 필수
    },
  }, {
    charset: 'utf8', // 이렇게 해줘야 한글 쓸 수 있음
    collate: 'utf8_general_ci', // 한글 저장
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post); // 한사람이 포스트를 여러개 가지고있다.
    db.User.hasMany(db.Comment); // 한사람이 댓글을 여러개 작성하다.
    db.User.belongsToMany(db.Post, { through: 'Like', as : 'Liked'});
    db.User.belongsToMany(db.User, { through: 'Follow', as : 'Followers', foreignKey : 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as : 'Followings', foreignKey : 'FollowerId'});
  }; // 사용자가 게시글을 작성할 때 (유저와 포스트간에 1:1)
  return User;
}
// 이걸 시퀄라이즈에서는 모델이라 부르는데 이게 기본꼴이다.