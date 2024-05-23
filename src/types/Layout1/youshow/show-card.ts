export interface CommentReplyType {
    id: number;
    userAvatarURL: string;
    userId: number;
    userName: string;
    createTime: string;
    publishAddress: string;
    content: string;
    showId: number;
    likeCount: number;
    likeActive: boolean;
    toUserName?: string;
    replyCount?: number;

    isNewAdd?: boolean;

    // replyList?: ReplyType[];
    // newAddReplyList?: Array<CommentReplyType>;
}


