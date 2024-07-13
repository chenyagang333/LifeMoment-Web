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
    byId?: number;
    likeCount: number;
    likeActive: boolean;
    toUserName?: string;
    replyCount?: number;
    replyList?: CommentItem[];
    // newAddReplyList?: Array<CommentReplyType>;
}
// 属性Key的映射，如果用户的数据属性值和我们的不一致，则传入一个属性映射即可
export interface CommentPropMap {
    id: string;
    userAvatarURL: string;
    userId: string;
    userName: string;
    createTime: string;
    publishAddress: string;
    content: string;
    showId: string;
    byId?: string;
    likeCount: string;
    likeActive: string;
    toUserName?: string;
    replyCount?: string;
    replyList?: string;
}
// 使用 Partial<CommentPropMap> 来允许部分属性为 undefined
export const commentPropMap: Partial<CommentPropMap> = {
    id: 'id',
    userAvatarURL: 'userAvatarURL',
    userId: 'userId',
    userName: 'userName',
    createTime: 'createTime',
    publishAddress: 'publishAddress',
    content: 'content',
    showId: 'showId',
    byId: 'byId',
    likeCount: 'likeCount',
    likeActive: 'likeActive',
    toUserName: 'toUserName',
    replyCount: 'replyCount',
    replyList: 'replyList',
};

// mapCommentData 函数使用正确的类型注解
export const commentMap = (data: any[], map?: Partial<CommentPropMap>): CommentItem[] => {
    // 覆盖 commentPropMap 对象中的对应属性值
    if (map) {
        Object.keys(map).forEach((key) => {
            const propKey = key as keyof Partial<CommentPropMap>;
            if (key in commentPropMap) {
                commentPropMap[propKey] = map[propKey];
            }
        });
    }
    return data.map(item => ({
        id: item[commentPropMap.id as keyof Partial<CommentPropMap>], // Accessing id property
        userAvatarURL: item[commentPropMap.userAvatarURL as keyof Partial<CommentPropMap>], // Accessing userAvatarURL property
        userId: item[commentPropMap.userId as keyof Partial<CommentPropMap>], // Accessing userId property
        userName: item[commentPropMap.userName as keyof Partial<CommentPropMap>], // Accessing userName property
        createTime: item[commentPropMap.createTime as keyof Partial<CommentPropMap>], // Accessing createTime property
        publishAddress: item[commentPropMap.publishAddress as keyof Partial<CommentPropMap>], // Accessing publishAddress property
        content: item[commentPropMap.content as keyof Partial<CommentPropMap>], // Accessing content property
        showId: item[commentPropMap.showId as keyof Partial<CommentPropMap>], // Accessing showId property
        byId: item[commentPropMap.byId as keyof Partial<CommentPropMap>], // Accessing byId property
        likeCount: item[commentPropMap.likeCount as keyof Partial<CommentPropMap>], // Accessing likeCount property
        likeActive: item[commentPropMap.likeActive as keyof Partial<CommentPropMap>], // Accessing likeActive property
        toUserName: item[commentPropMap.toUserName as keyof Partial<CommentPropMap>], // Accessing toUserName property
        replyCount: item[commentPropMap.replyCount as keyof Partial<CommentPropMap>], // Accessing replyCount property
        replyList: item[commentPropMap.replyList as keyof Partial<CommentPropMap>] // Accessing replyList property
    } as CommentItem));
}


export type CallBack = (data: CommentItem[]) => void

