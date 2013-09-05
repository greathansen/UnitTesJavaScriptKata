// Create the XHR object.

var cors = {};

cors = {

    createCORSRequest: function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    },

    // Helper method to parse the title tag from the response.
    getTitle: function (text) {
        return text.match('<title>(.*)?</title>')[1];
    },

    // Make the actual CORS request.
    makeCorsRequest: function () {
        // All HTML5 Rocks properties support CORS.
        var url = 'http://unittestjavascriptkata.azurewebsites.net/BinaryKataService.svc';
        var url = 'http://api.alice.com/cors';
        var xhr = createCORSRequest('GET', url);
        xhr.send();
        var xhr = cors.createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;


            // Response handlers.
            xhr.onload = function () {
                var text = xhr.responseText;
                var title = cors.getTitle(text);
                alert('Response from CORS request to ' + url + ': ' + title);
            };

            xhr.onerror = function () {
                alert('Woops, there was an error making the request.');
            };

            xhr.send();
        }
    }
}