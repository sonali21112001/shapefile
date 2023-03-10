/* const ipc = require("electron").ipcRenderer;

const buttonCreated = document.getElementById("upload");

buttonCreated.addEventListener("click", function (event) {
  ipc.send("open-file");
});
ipc.on("selected-file", function (event, files) {
  console.log("open-file" + files);
});
 */
const ipc = require("electron").ipcRenderer;

const buttonUpload = document.getElementById("upload");
var table = document.getElementById("mytable");
//const textarea = document.getElementById("textarea");

buttonUpload.addEventListener("click", function (event) {
  ipc.send("open-file");
});

ipc.on("selected-file", function (event, files) {
  //console.log("open-file" + files);
  files.map((file) => {
    console.log("File: ", file);
    var listItem = document.createElement("li");
    listItem.setAttribute("id", "list-item-");
    listItem.textContent = file;
    list.appendChild(listItem); 
    

    // document.createElement("TR");
    //  cell =row. insertcell();
    // table.textContent = file;
    // list.appendChild(table);
     



    var listbutton = document.createElement("button");
    listbutton.innerHTML = "Add Tile";
    listItem.appendChild(listbutton);
    listbutton.addEventListener("click", function (event) {
      ipc.send("open-files");
    });
     ipc.on("selected-files", function (event, files) {
    console.log("open-file" + files); })
    
    


    var listbutton = document.createElement("button");
    listbutton.innerHTML = "Add Route";
    listItem.appendChild(listbutton);
  
  // const tbl = document.createElement("table");
  // const tblBody = document.createElement("tbody");
  // // creating all cells
  // for (let i = 0; i < 3; i++) {
  //   // creates a table row
  //   const row = document.createElement("tr");
  //   for (let j = 0; j < 3; j++) {
  //     // Create a <td> element and a text node, make the text
  //     // node the contents of the <td>, and put the <td> at
  //     // the end of the table row
  //     const cell = document.createElement("td");
  //     const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
  //     cell.appendChild(cellText);
  //     row.appendChild(cell);
  //   }
  //   // add the row to the end of the table body
  //   tblBody.appendChild(row);
  // }
  // // put the <tbody> in the <table>
  // tbl.appendChild(tblBody);
  // // appends <table> into <body>
  // document.body.appendChild(tbl);
  // // sets the border attribute of tbl to '2'
  // tbl.setAttribute("border", "2");
  // listItem.appendChild(table);

}



    

    /* var textarea = document.createElement("TEXTAREA");
    textarea.setAttribute("rows", "2");
    textarea.setAttribute("cols", "6");
    textarea.setAttribute("placeholder", "text");
    listItem.appendChild(textarea);  */
);
 /*  textarea.setAttribute("rows", "4");
  textarea.setAttribute("cols", "50");
  textarea.setAttribute("placeholder", "text");
  textarea.appendChild(textarea); */
});
const buttonRelaunch = document.getElementById("relaunch");

buttonRelaunch.addEventListener("click", function (event) {
  ipc.send("relaunch");
});