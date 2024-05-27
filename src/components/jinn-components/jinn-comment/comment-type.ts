export enum CommentType {
    Comment = 'Comment',
    Reply = 'Reply'
}

export interface CommentItem {
    id: number;
    userAvatarURL: string;
    userId: number;
    userName: string;
    createTime: string;
    publishAddress: string;
    content: string;
    showId: number;
    commentId?: number;
    likeCount: number;
    likeActive: boolean;
    toUserName?: string;
    replyCount?: number;

    isNewAdd?: boolean;

    // replyList?: ReplyType[];
    // newAddReplyList?: Array<CommentReplyType>;
}


