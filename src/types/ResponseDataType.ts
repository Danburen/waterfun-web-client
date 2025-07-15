export interface FileResDataType {
    content: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    lastModified: string; // ISO 8601 格式日期字符串
    contentType: string;
}
