
export interface FileResDataType {
    fileName: string;
    fileSize: number;
    lastModified: string; // ISO 8601 格式日期字符串
    content: string;
    fileType: string;
    contentType: string;
}
