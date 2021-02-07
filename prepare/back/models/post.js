module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { 
    // 아이디가 기본적으로 들어있다.
  content: {
    type: DataTypes.TEXT,
    allowNull : false,
    },
    // RetweetId
  }, {
    charset: 'utf8mp4',
    collate: 'utf8mp4_general_ci', // 이모티콘을 넣으려면 mp4도 넣어주어야한다.
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //어떤 게시글이 작성자한테 속해있다.
    db.Post.belongsToMany(db.Hashtag ,{ through: 'PostHashtag'}); //다대다 관계
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post);
    db.Post.belongsToMany(db.User, { through: 'Like', as : 'Likers'});
    db.Post.belongsTo(db.Post, {as : 'Retweet'});
  };

  return Post;
}