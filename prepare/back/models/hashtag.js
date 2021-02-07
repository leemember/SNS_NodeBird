module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { 
    // 아이디가 기본적으로 들어있다.
  name: {},
  }, {
    charset: 'utf8mp4',
    collate: 'utf8mp4_general_ci', // 이모티콘을 넣으려면 mp4도 넣어주어야한다.
  });

  Hashtag.associate = (db) => {};
  return Hashtag;
}