const {
    app, session, protocol, BrowserWindow, Menu, globalShortcut, dialog
} = require('electron');
const remote = require('electron').remote;
const path = require('path');
let mainWindow = null;
let applicationName = "Springboot on electron";
let loading = null;
let serverProcess = null;
const gotTheLock = app.requestSingleInstanceLock();
const port = 8080;
const showApplication = function (appUrl) {
    mainWindow = new BrowserWindow({
        title: applicationName
        , show: false
        , width: 1200
        , height: 800
        , frame: true
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL(appUrl);
    mainWindow.once('ready-to-show', () => {
        loading.hide();
        mainWindow.show();
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
        app.quit();
    });
    mainWindow.on('close', function (e) {
        if (serverProcess) {
            var choice = require('electron').dialog.showMessageBox(this, {
                type: 'question'
                , buttons: ['Yes', 'No']
                , title: 'Confirm'
                , message: 'Are you sure you want to quit?'
            });
            if (choice == 1) {
                e.preventDefault();
            }
        }
    });
};
const awaitStartUp = function (appUrl, callback) {
    const requestPromise = require('minimal-request-promise');
    requestPromise.get(appUrl).then(function (response) {
        callback();
    }, function (response) {
        setTimeout(function () {
            awaitStartUp(appUrl, callback);
        }, 200);
    });
};
const focusSecondInstance = function () {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
            if (mainWindow) {
                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                mainWindow.focus();
            }
        }
    )
};
const getJavaFile = function () {
    var fs = require("fs");
    var files = fs.readdirSync(app.getAppPath() + "/java/");
    var filename = null;
    for (var i in files) {
        if (path.extname(files[i]) === ".jar") {
            filename = path.basename(files[i]);
            break;
        }
    }
    if (!filename) {
        throw new Error("There is no JAR file in ./java/ !");
    }
    return filename;
};
const isPortAvailable = function (callback) {
    var server = require('net').createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });
    server.listen(port, '127.0.0.1');
    server.on('error', function (e) {
        callback(false);
    });
    server.on('listening', function (e) {
        server.close();
        callback(true);
    });
};
const showStartUpErrorMessage = function () {
    setTimeout(function () {
        dialog.showMessageBox(null, {
            type: 'error'
            ,
            buttons: ['Ok']
            ,
            title: 'Java Runtime not available'
            ,
            message: '"' + applicationName + '" is not able to start. There seem to be issues related to the shipped Open JDK.'
        });
        app.quit();
    }, 200);
}
const spawnServerProcess = function () {
    var filename = getJavaFile();
    platform = process.platform;
    if (platform === 'win32') {
        return require('child_process').spawn('jre/bin/java', ['-jar', filename, '--logging.file=logfile.log'], {
            cwd: app.getAppPath() + '/java/'
        }).on('error', function (code, signal) {
            showStartUpErrorMessage();
        });
    } else if (platform === 'linux') {
        // make java executable
        require('child_process').spawn('chmod',
            ['+x', 'java'],
            {
                cwd: app.getAppPath() + '/java/jre/bin'
            }
        ).on('error', function (code, signal) {
            showStartUpErrorMessage();
        });

        return require('child_process').spawn('jre/bin/java', ['-jar', filename, '--logging.file=logfile.log'], {
            cwd: app.getAppPath() + '/java/'
        }).on('error', function (code, signal) {
            showStartUpErrorMessage();
        });
    } else if (platform === 'darwin') {
        if (!app.getAppPath().startsWith("/Applications/")) {
            dialog.showMessageBox(null, {
                type: 'error'
                ,
                buttons: ['Ok']
                ,
                title: 'Wrong directory'
                ,
                message: '"' + applicationName + '" is not able to start. Please move the application folder to "Applications".'
            });
            app.quit();
            return null;
        }
        return require('child_process').spawn('jre/Contents/Home/bin/java', ['-jar', filename, '--logging.file=logfile.log'], {
            cwd: app.getAppPath() + '/java/'
        }).on('error', function (code, signal) {
            showStartUpErrorMessage();
        });
    } else {
        throw new Error("Platform not supported");
    }
};
const showLoadingScreen = function () {
    loading = new BrowserWindow({
        show: true
        , frame: false
        , width: 500
        , height: 280
    });
    loading.loadURL('file://' + app.getAppPath() + '/loading.html');
};
if (!gotTheLock) {
    app.quit()
} else {
    focusSecondInstance();
    app.on('window-all-closed', function () {
        app.quit();
    });
    app.on('ready', function () {
        isPortAvailable(function (isPort) {
            if (!isPort) {
                dialog.showMessageBox(null, {
                    type: 'error'
                    , buttons: ['Ok']
                    , title: 'Port not available'
                    , message: '"' + applicationName + '" is not able to start if port ' + port + ' is being used.'
                });
                app.quit();
            } else {
                showLoadingScreen();
                serverProcess = spawnServerProcess();
                var appUrl = "http://127.0.0.1:" + port;
                awaitStartUp(appUrl, function () {
                    showApplication(appUrl);
                });
            }
        });
    });
    app.on('will-quit', function () {
        serverProcess.kill('SIGINT');
    });
}
