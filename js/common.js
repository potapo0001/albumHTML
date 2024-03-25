const h = (str) => {
    if(str !== null) {
        str = str.toString();
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    } else {
        str = "";
    }
    return str;
};