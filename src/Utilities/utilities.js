const capitalize = (str) => {

    return str.split(' ').map(word =>
        word[0].toUpperCase() + word.slice(1)
    ).join(' ');
};

const toTimeStr = (date, locales=[]) => {

    const options = {

        hour: '2-digit',
        minute: '2-digit' ,
    };
    return new Date(date * 1000).toLocaleTimeString(locales, options);
};

export {

    capitalize, toTimeStr
};