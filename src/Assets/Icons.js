import './icons.css';

import sunrise from './Icons/sunrise.svg';
import sunset from './Icons/sunset.svg';
import moonrise from './Icons/moonrise.svg';
import moonset from './Icons/moonset.svg';
import realFeel from './Icons/real-feel.svg';
import pressure from './Icons/pressure.svg';
import humidity from './Icons/humidity.svg';
import dewPoint from './Icons/dew-point.svg';
import uvIndex from './Icons/uv-index.svg';
import wind from './Icons/wind.svg';

import newMoon from './Icons/new-moon.svg';
import waxingCrescent from './Icons/waxing-crescent.svg';
import firstQuarter from './Icons/first-quarter.svg';
import waxingGibbous from './Icons/waxing-gibbous.svg';
import fullMoon from './Icons/full-moon.svg';
import waningGibbous from './Icons/waning-gibbous.svg';
import thirdQuarter from './Icons/third-quarter.svg';
import waningCrescent from './Icons/waning-crescent.svg';


const Sunrise = () => {

    return (<img src={ sunrise } className="weather-icon" alt="" />);
};

const Sunset = () => {

    return (<img src={ sunset } className="weather-icon" alt="" />);
};

const Moonrise = () => {

    return (<img src={ moonrise } className="weather-icon" alt="" />);
};

const Moonset = () => {

    return (<img src={ moonset } className="weather-icon" alt="" />);
};

const RealFeel = () => {

    return (<img src={ realFeel } className="weather-icon" alt="" />);
};

const Pressure = () => {

    return (<img src={ pressure } className="weather-icon" alt="" />);
};

const Humidity = () => {

    return (<img src={ humidity } className="weather-icon" alt="" />);
};

const DewPoint = () => {

    return (<img src={ dewPoint } className="weather-icon" alt="" />);
};

const UVIndex = () => {

    return (<img src={ uvIndex } className="weather-icon" alt="" />);
};

const Wind = () => {

    return (<img src={ wind } className="weather-icon" alt="" />);
};

const NewMoon = () => {

    return (<img src={ newMoon } className="weather-icon" alt="" />);
};

const WaxingCrescent = () => {

    return (<img src={ waxingCrescent } className="weather-icon" alt="" />);
};

const FirstQuarter = () => {

    return (<img src={ firstQuarter } className="weather-icon" alt="" />);
};

const WaxingGibbous = () => {

    return (<img src={ waxingGibbous } className="weather-icon" alt="" />);
};

const FullMoon = () => {

    return (<img src={ fullMoon } className="weather-icon" alt="" />);
};

const WaningGibbous = () => {

    return (<img src={ waningGibbous } className="weather-icon" alt="" />);
};

const ThirdQuarter = () => {

    return (<img src={ thirdQuarter } className="weather-icon" alt="" />);
};

const WaningCrescent = () => {

    return (<img src={ waningCrescent } className="weather-icon" alt="" />);
};

export {

    Sunrise, Sunset, Moonrise, Moonset,
    NewMoon, WaxingCrescent, FirstQuarter, WaxingGibbous,
    FullMoon, WaningGibbous, ThirdQuarter, WaningCrescent,
    RealFeel, Pressure, Humidity, DewPoint, UVIndex, Wind,
};