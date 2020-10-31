import { iteratee } from "lodash";

const _ = require("lodash");
const theJson = require("../comments.json");

const comments = theJson.media_comments;

const users = comments.map((comment) => {
  return comment[2];
});

const filteredUsers = users.filter(function (item, pos) {
  return users.indexOf(item) == pos;
});

const f = users.map((user) => {
  const userComments = comments.filter((item) => user === item[2])[0];
  return {
    user: user,
    comments: [userComments],
  };
});

const q = users.map((user) => {
  const v = comments.filter((comment) => comment[2] === user);
  const converted = v.map((con) => {
    return con[1];
  });
  return {
    user,
    comments: [...converted],
  };
});

const doubleComments = q.filter((dC) => dC.comments.length > 1);

const b = doubleComments.map((dC) => {
  return doubleComments.reduce((a, v) => {
    if (v.user === dC.user) {
      return a.concat({ ...v });
    }
    return a;
  }, []);
});

const arranged = comments.map((comment) => ({
  date: comment[0],
  user: comment[2],
  comment: comment[1],
}));

const h = users.map((user) => {
  const obj = arranged.filter((r) => (r.user === user ? r.comment[2] : null));
  const comments = obj.map((c) => c.comment);
  return {
    user,
    comments: [...comments],
  };
});

const hd = h.filter((entry) => {
  return entry.user === "_hd6.vii";
});

const duplicates = filteredUsers.map((fU) => {
  const number = users.reduce(function (n, val) {
    return n + (val === fU);
  }, 0);
  return {
    user: fU,
    commentCount: number,
  };
});

const usersWithMoreThanOneComment = duplicates.filter(
  (dup) => dup.commentCount > 1
);

const commentsByDoubleCommentor = usersWithMoreThanOneComment.map((uWM) => {
  const entry = arranged.filter((c) => c.user === uWM.user);
  const deconstructedComment = entry.map((ent) => ({
    comment: ent.comment,
    date: ent.date,
  }));
  return {
    user: uWM.user,
    comments: deconstructedComment,
  };
});

const findMatchingComments = commentsByDoubleCommentor.map((c) => {
  const d = c.comments.map((cmt) => {
    return {
      comment: cmt.comment,
      findings: 0,
    };
  });
  return {
    user: c.user,
    commentFindings: d,
  };
});

var a = [
  {
    comment: "lalala",
  },
  {
    comment: "lalala",
  },
  {
    comment: "lalala",
  },
  {
    comment: "lalala",
  },
  {
    comment: "lalala",
  },
];
const findDup = _.filter(
  _.uniq(
    _.map(a, function (item) {
      if (_.filter(a, { comment: item.commen }).length > 1) {
        return item.id;
      }

      return false;
    })
  ),
  function (value) {
    return value;
  }
);

console.log(findDup);

export default function parseComments(req, res, next) {
  res.status(200).json(findMatchingComments);
}
