/**
 * Job: sonar
 *
 * Expected configuration:
 * 
 * { }
 */

module.exports = function(config, dependencies, job_callback) {
    var logger = dependencies.logger;
    var metrics = config.metrics;
    var metricsNames = [];
    for (var metric in metrics) {
        metricsNames.push(metric);
    }

    var options = {
        url: config.sonarUrl + "/api/resources?resource=" + config.resource + "&metrics=" + metricsNames.join(","),
        json: {}
    };

    dependencies.request(options, function(err, response, body) {
        if (err || !response || response.statusCode != 200) {
            var err_msg = err || "ERROR: Couldn't access the web page at " + options.url;
            logger.error(body);
            job_callback(err_msg);
        } else {
            var result = [];
            for (var i = 0; i < body[0].msr.length; i++) {
                var msr = body[0].msr[i];
                var metric = msr['key'];
                var metricName = metrics[metric];

                result.push({issueType: metricName, frequency: msr.frmt_val});
            }
            job_callback(null, {issues: result, title: config.widgetTitle });
        }
    });

};
