const capitalize = (str) => {

    return str.split(' ').map(word =>
        word[0].toUpperCase() + word.slice(1)
    ).join(' ');
};

const formatDate = (date, format = "hour", locales = []) => {

    let newDate = new Date(date * 1000);
    const options = {

        hour: '2-digit',
        minute: '2-digit',
    };
    const getDateMonth = () => newDate.toDateString().split(' ').slice(1, 3).join(' ');

    if(format === "hour") {

        return newDate.toLocaleTimeString(locales, options);
    }

    else if(format === "day") {

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[newDate.getDay()];
    }

    else if(format === "date-time") {

        const time =  newDate.toLocaleTimeString(locales, options) + ', ';
        return time + getDateMonth();
    }

    else if(format === "day-date") {

        const day = newDate.toDateString().split(' ').slice(0, 1) + ', ';
        return day + getDateMonth();
    }
};

const getRandNum = (min, max, roundOff = true) => {

    const randNum = Math.random() * (max - min) + min;
    return roundOff ? Math.round(randNum) : randNum;
}

export {

    capitalize, formatDate, getRandNum
};