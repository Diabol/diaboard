widget = {
    onData: function (el, data) {
        $('.content', el).empty();

        if (data.title) {
            $('h2', el).text(data.title);
        }


        if (data.metrics.length) {

            data.metrics.forEach(function (metric) {
                var content = "";
                content += "<div class='item-container'>" +
                "<div class='metric'>" + metric.metric + "</div>" +
                "<div class='value'>" + metric.value + "</div><div class='trend'>";

                switch (metric.trend) {
                    case -1: content+="<img src='images/green-up.png'/>"; break;
                    case 1: content+="<img src='images/green-down.png'/>"; break;
                }
                content += "</div></div>";


                $('.content', el).append(content);
            })
        }

    }
};