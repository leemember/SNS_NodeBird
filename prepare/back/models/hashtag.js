module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { 
    // 아이디가 기본적으로 들어있다.
  name: {
    type: DataTypes.STRING(20),
    allowNull : false,
    },
  }, {
    charset: 'utf8mp4',
    collate: 'utf8mp4_general_ci', // 이모티콘을 넣으려면 mp4도 넣어주어야한다.
  });

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Hashtag); //다대다 관계
  };
  return Hashtag;
}