const _ = require("lodash");
import User from "../models/user";

import fs from "fs";

const fg = fs.readFileSync("1604144162416-comments.json");
console.log(gf);
// export default async function createFields(req, res, next) {
//   const users = comments.map((comment) => {
//     return comment[2];
//   });

//   const filteredUsers = users.filter(function (item, pos) {
//     return users.indexOf(item) == pos;
//   });

//   const createuser = filteredUsers.map((user) => {
//     return {
//       user,
//     };
//   });

//   const user = await User.insertMany(createuser);

//   const createComments = comments.map((comment) => {
//     return {
//       date: comment[0],
//       comment: comment[1],
//       user: comment[2],
//     };
//   });

//   const comment = await Comments.insertMany(createComments);

//   return comment;
// }
