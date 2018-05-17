import moment from 'moment';

/**
 * Format Time
 * @param timestamp
 * @returns {*}
 */
const formatTime = (timeStr) => {
    if(timeStr){
        const timestamp = timeStr / 1000;
        const date = moment.unix(timestamp)
            .format('YYYY-MM-DD HH:mm');
        return date;
    }else{
        return '';
    }
};
const formatDate = (timeStr) => {
    if(timeStr){
        const date = moment.unix(timeStr/1000)
            .format('YYYY-MM-DD');
        return date;
    }else{
        return '';
    }
};

export  {
    formatTime,
    formatDate,
};
