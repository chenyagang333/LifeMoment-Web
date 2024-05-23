import { FileType } from "@/utils/FileUtils/FileType";

export interface ShowType{
    id: number;
    userAvatarURL: string;
    userId: number;
    userName: string;
    createTime: string;
    publishAddress: string;
    content: string;
    likeUsers: string[];
    viewCount: number;
    likeCount: number;
    starCount: number;
    shareCount: number;
    likeActive: boolean,
    starActive: boolean,
    commentCount: number,
    files?:MyFileInfo[]
}
export interface MyFileInfo{
    type:FileType,
    firstURL:string,
    secondURL:string
}
