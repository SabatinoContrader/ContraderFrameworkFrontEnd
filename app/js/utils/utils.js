utils = (function () {
    allGommeCallback = function (data) {
        var pageBody = $("<div id='page-content' class='main-content'></div>");
        pageBody.append("<h3>Le nostre gomme</h3>")
        pageBody.append("<br/>")
        for (i = 0; i < data.data.length; i++) {
            pageBody.append("<div class='well'><p>" + data.data[i].model + "</p><p>" + data.data[i].manufacturer + "</p><p>" + data.data[i].price + "</p></div>");
        }
        return utils.render(pageBody.html());
    };
    postGomma = function () {
        data = {
                model: $("#model").val(),
                manufacturer: $("#manufacturer").val(),
                price: $("#price").val(),
        };
        $.ajax({
            url: 'http://localhost:8080/gommastore/gomme/new',
            type: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function (data) {
                if (data.response == 0) {
                    return utils.render('<h3>Gomma inserita correttamente!</h3>')
                }
                else {
                    return utils.render('<h3>Abbiamo qualche problema!</h3>')
                }
            }
        })
    };
    views = {
        home: {
            isAjax: false,
            template: '<p>Ciao Mondo!</p>'
        },
        allGomme: {
            isAjax: true,
            url: 'http://localhost:8080/gommastore/gomme/all',
            method: 'GET',
            callback: allGommeCallback,
        },
        insertGomma: {
            template: "<h3>Inserisci una gomma</h3>" + "<br/>" +
            "<form>" +
            "<input id='model' type='text' placeholder='Modello...'/>" +
            "<input id='manufacturer' type='text' placeholder='Produttore...'/>" +
            "<input id='price' type='text' placeholder='Prezzo...'/>" +
            "<input type='submit' value='Invia' onclick='postGomma()'/>" +
            "</form>",
            postGomma: postGomma
        },

        aboutUs: {
            isAjax: false,
            template: '<p>Kontattaci111!111</p>'
        }
    };
    return {
        router: function () {
            route = location.hash.substr(1);
            if (route == "") {
                route = "home";
            }
            if (views[route].isAjax) {
                return this.request(views[route].url, views[route].method, views[route].callback)
            }
            else {
                return this.render(views[route].template)
            }
        },
        request: function (url, method, callback) {
            $.ajax({
                url: url,
                type: method,
                success: function (data) {
                    return callback(data)
                }
            })
        },
        render: function (content) {
            $('#page-content').remove();
            $('.container').append("<div id='page-content' class='main-content'>" + content + "</div>");
        }
    }
})();

module.exports = utils;
