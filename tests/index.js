window.onload = function () {
    var option,
        field = document.getElementById('localFileField'),
        list = document.getElementById('remoteFileField'),
        canvas = document.getElementById("pages-container");

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
        read(e.target.files[0]);
    };

    list.onchange = function (e) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", e.target.value, true);
        oReq.responseType = "blob";

        oReq.onload = function() {
            var blob = oReq.response;

            read(blob);
        };

        oReq.send();
    };

    function read (file) {
        canvas.innerHTML = "";
        console.log("START ");

        jDoc.read(file).then(function (fileData) {
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
            });

            readEnd();
        }, function () {
            console.log("ERROR ", arguments);

            readEnd();
        });
    }

    function readEnd () {
        console.log("END ", arguments);
    }
};