const capitalize = (str) => {

    return str.split(' ').map(word =>
        word[0].toUpperCase() + word.slice(1)
    ).join(' ');
};

const toDateStr = (date, format = "hour", locales = []) => {

    if(format === "hour") {

        const options = {

            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(date * 1000).toLocaleTimeString(locales, options);
    }

    else {

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[new Date(date * 1000).getDay()];
    }
};

export {

    capitalize, toDateStr
};