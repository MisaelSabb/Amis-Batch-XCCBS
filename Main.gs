
function LIB_FUNC(){AmisLib.Utility.LIB_FUNC.apply(this, arguments);}

/* The script is deployed as a web app and renders the form */
function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('forms.html')
    .setTitle("");
}

function uploadFileToGoogleDrive(data, file, userToken) {
  
  try {

    var dropbox = "";
    var folder, folders = DriveApp.getFoldersByName(dropbox);
    var date = new Date().getTime();    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file);

    var fileUploaded = folder.createFolder(date).createFile(blob);
    
    
    var csvData = Utilities.parseCsv(fileUploaded.getBlob().getDataAsString());
    
    var elaborationResult= CsvUtility.elaborateData(userToken, csvData);  
    
    
    if(elaborationResult.result){
      //call ETL PROCESS
      ETLCaller.runETLJob();
    }
    
    elaborationResult.result ? elaborationResult.text='Data Uploaded Successfully. Please close the browser.' : elaborationResult.text='';
    
    return elaborationResult;

  } catch (f) {
    return f.toString();
  }

}