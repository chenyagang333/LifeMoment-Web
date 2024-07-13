export enum CommentType {
    Comment = 'Comment',
    Reply = 'Reply'
}

export interface CommentItem {
    // data column
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
    replyList?: CommentItem[];
    // config column
    replyOpen?: boolean; // 打开回复
    replyLoadIndex?: number; // 回复加载索引
    sendIng?: boolean; // 发送评论中
    sendError?: boolean; // 发送失败，默认为空（发送成功）
}

export type CallBack = (data: CommentItem[]) => void

