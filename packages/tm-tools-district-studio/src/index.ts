import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false
    }
  })

  // Load a dummy index.html. Will become app starting page in the future.
  win.loadFile('../node_modules/@tm-tools/district-studio-app/dist/district-studio-app/index.html');
}

if (app) {
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
} else {
  console.log('app doesnt exist yet');
}