export const checkImageURL = (url) => {
    if (!url) return false;

    const pattern = /^https?:\/\/.*\.(png|jpe?g|bmp|gif|webp)$/i;

    return pattern.test(url);
}