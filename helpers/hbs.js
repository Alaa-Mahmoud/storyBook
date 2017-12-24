const moment = require('moment');
module.exports = {
    trancate: function(str, len) {
        if (str.length > len && str.length > 0) {
            let newstr = str + " ";
            newstr = str.substring(0, len);
            newstr = str.substring(0, newstr.lastIndexOf(" "));
            newstr = (newstr.length > 0) ? newstr : str.substring(0, len);
            return newstr + ".......";
        }
        return str;
    },
    stripTags: function(input) {
        return input.replace(/<(.|\n)*?>/gm, '');
    },
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    select: function(selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
    }
};