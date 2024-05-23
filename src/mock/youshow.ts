const connmetOrReply = {
  id: 1,
  headerImg: "1111",

  userName: "爱吃汉堡🍔",
  publishTime: "2024-1-5 20:24",
  publishAddress: "北京",
  content:
    " 而美西方呢，它们真能在红海打赢有人都心里明白。 所",
  showId: 1,
  likeCount: 25,
  starCount: 13,
  commentCount: 34,
  sharCount: 11,
  likeActive: false,
  starActive: false,


  childernData: [],

  newAddCommentChildern: []

};

const replys = {
  toUserName: "爱吃薯条🍟",
  commentId: 1,
  ...connmetOrReply,
};
const connmet = {
  childernCount: 3,
  toUserName: "",
  ...connmetOrReply,
};
const show = {
  // dto
  id: Math.floor(Math.random() * Date.now()),
  headerImg: "1111",
  userName: "爱吃汉堡🍔",
  publishTime: "2024-1-5 20:24",
  publishAddress: "北京",
  content: `
      13国对胡塞武装发停止对红海船只的袭击，表示若是其继续采取行动的话，将会承担十分严重的后果。
   
     `,
  likeUsers: [
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",

    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小马",
    "小刘",
    "小高",
  ],
  viewCount: 13,
  likeCount: 13,
  starCount: 13,
  shareCount: 13,
  likeActive: false,
  starActive: false,
  commentCount: 20,
  commentData: [],

  // utils
  commentOpened: false, // 初始状态没有打开
  commentOpenNoFirst: false, // 下一次点击查看评论，评论区不是第一次打开
  loading: false, // 是否加载数据中
  noMoreComment: false, // 默认有更多数据
  editingComment: false, // 是否正在编辑评论
};

export const main = [
  { // 获取shows内容
    url: "/Shows/GetShows",
    method: "get",
    response: () => {
      return [show, show, show, show];
    },
  },
  { // 根据showId加载评论
    url: "/Comment/GetCommentByShowId",
    method: "get",
    response: () => {
      const a = { userId: Math.floor(Math.random() * Date.now()), ...connmet };
      a.userName = 'aaaaaaaaa';
      const b = { userId: Math.floor(Math.random() * Date.now()), ...connmet };
      b.userName = 'ddddddddd';
      const c = { userId: Math.floor(Math.random() * Date.now()), ...connmet };
      c.userName = 'dfffffffff';
      return [a, b, c];
    },
  },
  { // 根据CommentId加载评论的回复
    url: "/Reply/GetReplyByCommentId",
    method: "get",
    response: () => {
      return [{ userId: Math.floor(Math.random() * Date.now()), ...replys }, { userId: Math.floor(Math.random() * Date.now()), ...replys }];
    },
  },
  { // UpdateCount
    url: "/Shows/UpdateCount",
    method: "post",
    response: () => {
      return true;
    },
  },
  { // 添加评论
    url: "/Comment/CreateComment",
    method: "post",
    response: () => {
      return true;
    },
  },
  { // 添加评论的回复
    url: "/Comment/CreateReply",
    method: "post",
    response: () => {
      return true;
    },
  },
]

