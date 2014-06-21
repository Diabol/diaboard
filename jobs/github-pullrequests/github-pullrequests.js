/**
 * Job: github-pullrequests
 *
 * Expected configuration:
 * 
 * { }
 */

module.exports = function(config, dependencies, job_callback) {
    var logger = dependencies.logger;

    var options = {
        url: config.githubUrl + "repos/" + config.owner + "/" + config.repo + "/pulls?access_token=" + config.token,
        json: {},
        headers: {
                'User-Agent': 'Atlasboard'
            }
    };

    dependencies.request(options, function(err, response, body) {
        if (err || !response || response.statusCode != 200) {
            var err_msg = err || "ERROR: Couldn't access the web page at " + options.url;
            logger.error(body);
            job_callback(err_msg);
        } else {
            var number = body.length;
            job_callback(null, {number: number, title: config.widgetTitle });
        }
    });
};
