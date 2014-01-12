var assert = require('assert'),
    fs = require('fs'),
    webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    remote = require('selenium-webdriver/remote'),
    URL = "file:///var/projects/jDoc/test.html",
    locators = {
        fileField: {
            css: '[type="file"]'
        },
        pages: {
            css: '#pages-container'
        }
    },
    testFiles = {
        dsv: ["/var/projects/jDoc/files/DSV/transaction.csv"],
        fictionBook: ["/var/projects/jDoc/files/FictionBook/«Об интеллекте».fb2"],
        odt: ["/var/projects/jDoc/files/ODT/file1.odt"],
        oxml: [
            "/var/projects/jDoc/files/OXML/Collection_and_Map.docx",
            "/var/projects/jDoc/files/OXML/ПДР-2013.doc"
        ],
        rtf: [
            "/var/projects/jDoc/files/RTF/Collection_and_Map2.rtf",
            '/var/projects/jDoc/files/RTF/my_people.rtf'
        ]
    },
    capabilities = {
        'browserName': 'firefox'
    };

test.describe('jDoc', function () {
    var driver, server;

    test.before(function () {
        var jar = process.env.SELENIUM;
        assert.ok(!!jar, 'SELENIUM environment variable not set');
        assert.ok(fs.existsSync(jar), 'The specified jar does not exist: ' + jar);

        server = new remote.SeleniumServer(jar, {port: 4444});
        server.start();

        driver = new webdriver.Builder().
            usingServer(server.address()).
            withCapabilities(capabilities).
            build();
    });

    test.it('Read file', function () {
        driver.get(URL);
        driver.wait(function () {
            return driver.isElementPresent(locators.fileField);
        }, 1000)
            .then(function () {
                var key,
                    i;

                for (key in testFiles) {
                    if (testFiles.hasOwnProperty(key)) {
                        for (i = testFiles[key].length - 1; i >= 0; i--) {
                            driver.findElement(locators.fileField).sendKeys(testFiles[key][i]);
                            driver.sleep(5000);
                            driver.findElement(locators.pages);
                        }
                    }
                }
            });
    });

    test.after(function () {
        driver.quit();
    });
    test.after(function () {
        server.stop();
    });
});