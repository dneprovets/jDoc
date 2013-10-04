var assert = require('assert'),
    fs = require('fs'),
    webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    remote = require('selenium-webdriver/remote'),
    URL = "file:///var/projects/jDoc/test.html",
    locators = {
        fileField: {
            css: '[type="file"]'
        }
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
                driver.findElement(locators.fileField).sendKeys('');
            });
    });

    test.after(function () {
        driver.quit();
    });
    test.after(function () {
        server.stop();
    });
});