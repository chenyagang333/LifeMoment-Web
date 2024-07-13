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
    replyOpen?: boolean;
    replyLoadIndex?: number;
}

export type CallBack = (data: CommentItem[]) => void

