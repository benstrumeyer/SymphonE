import path = require("path");
import {app, BrowserWindow} from "electron";

var win;

function createWindow()
{
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
    });

    win.loadURL(path.join(__dirname, "index.html"));

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on("closed", () =>
    {
        win = null;
    })
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () =>
{
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin")
    {
        app.quit();
    }
});

// On macOS it"s common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on("activate", () =>
{
    if (win === null)
    {
        createWindow();
    }
});

