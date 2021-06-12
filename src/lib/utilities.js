import moment from "moment-timezone";

const capitalize = (str) => {

    return str.split(' ').map(word =>
        word[0].toUpperCase() + word.slice(1)
    ).join(' ');
};

const formatDate = (date, format, timezone) => {

    const newDate = moment.utc((date + timezone) * 1000);

    if(format === 'hour') {
        return newDate.format("hh:mm A");
    }
    else if(format === 'day') {
        return newDate.format('dddd');
    }
    else if(format === 'date-time') {
        return newDate.format('hh:mm A, MMM DD');
    }
    else if(format === 'day-date') {
        return newDate.format('ddd, MMM DD');
    }
};

const getRandNum = (min, max, roundOff = true) => {

    const randNum = Math.random() * (max - min) + min;
    return roundOff ? Math.round(randNum) : randNum;
}

const strInArr = (array, string) => array.includes(string.toLowerCase());

export {

    capitalize, formatDate, getRandNum, strInArr
};