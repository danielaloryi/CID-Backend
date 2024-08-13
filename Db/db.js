import Sequelize from "sequelize";

// const sequelize = new Sequelize("ciddb", "root", "1966", {
//   dialect: "mysql",
//   host: "localhost",
// }
// );




// const sequelize = new Sequelize("ciddb", "smartlearnersonline", "Zylorent5060$$", {
//   dialect: "mysql",
//   host: "31.220.73.6",
// });

const sequelize = new Sequelize("ciddb", "admin", "hFsHy4QP", {
  dialect: "mysql",
  host: "108.181.197.179",
  port: 10106
});


export default sequelize;