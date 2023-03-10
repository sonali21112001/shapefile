const { app, BrowserWindow, ipcMain ,dialog} = require('electron');
const path = require("path");
const fs = require("fs");
const os = require("os");


let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow
  ({width: 800, 
    height: 395,
    webPreferences: {
    nodeIntegration: true
  }
})
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Receive async message from renderer
// See file renderer.js on line 3
/* ipcMain.on('ping-good', event => {
  // It's so good because below have a delay 5s to execute, and this don't lock rendereder :)
  setTimeout(() => {
    console.log('GOOD finshed!')
    // Send reply to a renderer
    event.sender.send('ping-good-reply', 'pong')
  }, 5000)
})

// Receive sync message from renderer
// See file renderer.js on line 18
ipcMain.on('ping-bad', event => {
  // It's so bad because below have a delay 5s to execute, meanwhile the renderer stay locked :(
  setTimeout(() => {
    console.log('BAD finshed!')
    event.returnValue = 'pong'
  }, 5000)
}) */

//retrive the event that send by the renderer process

 /* ipc.on('open-files', event => {
   //checking the os system of the user
   if(os.platform()=='linux'|| os.platform() ||'win32'){
     dialog.showOpenDialog({
      properties:['openfile']
     },function(files){
      if(files){
        event.sender.send('selected-files',files[0]);
      }
     })
   }
   else{
    dialog.showOpenDialog({
      properties:['openfile','openDirectory']
     },function(files){
      if(files){
        event.sender.send('selected-files',files[0]);
      }
     })
    }
  })//for mac */

  
   
   /* fs.readdir("./shapefiles/", (x, files) => {
    files
      .filter((x) => x.endsWith(".shp"))
      .map((file) => {
        console.log("opening file", file);
        var { spawn } = require("child_process");
        var spawn = spawn("notepad", ["./shapefiles/" + file], {env : {DATABASE_URL: "postgres://postgres:postgres@127.0.0.1/iawns_db"}});
        spawn.stdout.on("data", function (msg) {
          console.log(msg.toString());
        });
        event.sender.send('selected-file',files);
      });
  });
})  */

ipcMain.on("open-file", (event) => {
  fs.readdir("./shapefiles/", (errors, files) => {
    files
      .filter((file) => file.endsWith(".shp"))
      //.map((file) => {
        /* console.log("opening file", file);
        var { spawn } = require("child_process");
        var spawn = spawn("notepad",["./shapefiles/" + file], {
          env: {
            DATABASE_URL: "postgres://postgres:postgres@127.0.0.1/iawns_db",
          },
        });
        spawn.stdout.on("data", function (msg) {
          console.log(msg.toString());
        }); */
        event.sender.send("selected-file", files);
      //});
  });
});

ipcMain.on("open-files", (event) => {
  fs.readdir("./shapefiles/", (errors, files) => {
    files
      .filter((file) => file.endsWith(".shp"))
      .map((file) => {
        console.log("opening file", file);
        var { spawn } = require("child_process");
        var spawn = spawn("notepad",["./shapefiles/" + file], {
          env: {
            DATABASE_URL: "postgres://postgres:postgres@127.0.0.1/iawns_db",
          },
        });
        spawn.stdout.on("data", function (msg) {
          console.log(msg.toString());
        });
        event.sender.send("selected-files", files);
      });
  });
});

ipcMain.on("relaunch", (event) => {
  app.quit();
  app.relaunch();

});