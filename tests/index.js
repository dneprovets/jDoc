window.onload = function () {
    var jD = new jDoc(),
        option,
        field = document.getElementById('localFileField'),
        list = document.getElementById('remoteFileField'),
        canvas = document.getElementById("pages-container");

    jD.on('readstart', function () {
        canvas.innerHTML = "";
        console.log("START ", arguments);
    });
    jD.on('readend', function () {
        console.log("END ", arguments);
    });
    jD.on('read', function (fileData) {
        console.log("READ ", arguments);
        console.log("File name -", fileData.getName());
        console.log("Words count -", fileData.getWordsCount());
        console.log("Pages count -", fileData.getPagesCount());
        canvas.appendChild(fileData.html());

        Array.prototype.forEach.call(document.querySelectorAll('.pages-container > div'), function (page) {
            if (page.scrollHeight > page.offsetHeight) {
                console.log('Invalid page', {
                    page: page,
                    pageHeight: page.offsetHeight,
                    contentHeight: page.scrollHeight
                });
            }
        })
    });
    jD.on('error', function () {
        console.log("ERROR ", arguments);
    });



    option = document.createElement('option');
    option.appendChild(document.createTextNode('Select doc'));
    option.disabled = true;
    option.selected = true;
    list.appendChild(option);

    testDocsList.forEach(function (d) {
        option = document.createElement('option');
        option.setAttribute('value', d);
        option.appendChild(document.createTextNode(d));
        list.appendChild(option);
    });



    field.onchange = function (e) {
        jD.read(e.target.files[0]);
    };

    list.onchange = function (e) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", e.target.value, true);
        oReq.responseType = "blob";

        oReq.onload = function() {
            var blob = oReq.response;

            jD.read(blob);
        };

        oReq.send();
    }
};