/**
 * Only use in web browser env
 * convert arrayBuff to base64 code
 * @param buffer array buffer
 */
export function convertArrayBufferToBase64(buffer: ArrayBuffer) {
    return btoa(new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte), ''
    ));
}