function getImageUrl(apiUrl){
    if(
        (typeof process !== 'undefined' && process.env && process.env.IS_SERVER) ||
        (typeof window !== 'undefined' && window.location.host.indexOf("csu-kiosk-stage.onrender.com") > -1) || 
        (typeof window !== 'undefined' && window.location.host.indexOf("localhost:3000") > -1)
    ){
        return apiUrl;
    } else {
        return '';
    }
}

export const apiUrl = 'https://csu-tg-cms.onrender.com';
export const imgUrl = getImageUrl(apiUrl);