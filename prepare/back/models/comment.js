module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { 
    // 아이디가 기본적으로 들어있다.
  content: {
    type: DataTypes.TEXT,
    allowNull : false,
    },
  }, {
    charset: 'utf8mp4',
    collate: 'utf8mp4_general_ci', // 이모티콘을 넣으려면 mp4도 넣어주어야한다.
  });

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Comment);
    //belongsTo 얘 역할은 userId: {} 컬럼과 postId: {} 라는 컬럼을 만들어준다.
  };
  return Comment;
}