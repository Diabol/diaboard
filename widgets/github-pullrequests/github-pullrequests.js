widget = {
    onData: function (el, data) {
        if (data.title) {
            $('h2', el).text(data.title);
        }
        $('.number', el).text(data.number);
        $('.title', el).text(data.title);
        $('.table', el).show();
    }
};