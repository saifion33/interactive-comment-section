function timeStampConverter(timestamp) {
    const timeDevider = {
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2628288,
        year: 31536000
    }
    const currentTime = new Date();
    const time = Math.floor((currentTime - timestamp) / 1000);
    if (time === 0) {
        return ('Just Now')
    }
    else if (time <= timeDevider.minute) {
        return (Math.floor(time) + ' Second ago')
    }
    else if (time <= timeDevider.hour) {
        return (Math.floor(time / 60) + ' Minute ago')
    }
    else if (time <= timeDevider.day) {
        return (Math.floor(time / 3600) + ' Hour ago')
    }
    else if (time <= timeDevider.week) {
        return (Math.floor(time / 86400) + ' Day ago')
    }
    else if (time <= timeDevider.month) {
        return (Math.floor(time / 604800) + ' week ago')
    }
    else if (time <= timeDevider.year) {
        return (Math.floor(time / 2628288) + ' month ago')
    }
    else if (time >= timeDevider.year) {
        return (Math.floor(time / 31536000) + ' Year ago')
    }
    else {
        return ('Unknown time')
    }

}
export default timeStampConverter;