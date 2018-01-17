var CsvUtility=new function(){  
  //---------------------------------------------------------
  /**
  * upload CSV Data  to  FIREBASE function     
  * @param  {string} auth token     
  * @param  {string} user uid on firebase
  * @param  {ARRAY} csvData
  */
  //---------------------------------------------------------
  this.elaborateData=function(userToken,uid, values) {
    
    //retrive config
    var batchCSVMappingNode= 'config/batchConfig/xccbs/CSVMappingOrderFields';
    var batchCSVMapping = FirebaseConnector.getFireBaseDataParsed(batchCSVMappingNode, userToken);
    var batchCSVBaseYearNode= 'config/batchConfig/xccbs/baseYear';
    var batchCSVBaseYear = FirebaseConnector.getFireBaseDataParsed(batchCSVBaseYearNode, userToken);
    
    //the saving node
    var dataNode= 'dataXCCBS';
    
    var lenght = values.length;    
    
    //inizialize the json array
    var jsonArray = []
  
    //get the current year
    var fullYear= (new Date()).getFullYear();
    //get how many years should look for
    var lenghtOfLoop= fullYear-batchCSVBaseYear;
        
    //loop the CSV elements
    for(var i=1; i<lenght;i++){
      //jsonRow
      var jsonRow={};      
      
      //loop and set the year keys into the json
      for(var j=0; j<=lenghtOfLoop;j++){                      
        //to avoid undefined keys
        if(batchCSVMapping[batchCSVBaseYear+j]){          
          //set key into jsonRow
          jsonRow[batchCSVBaseYear+j]=values[i][batchCSVMapping[batchCSVBaseYear+j]];
        }        
      }      
      jsonRow.COUNTRY_REGION=values[i][batchCSVMapping.COUNTRY_REGION];
      jsonRow.ELEMENT_INDICATOR=values[i][batchCSVMapping.ELEMENT_INDICATOR];
      jsonRow.ITEM_GROUP=values[i][batchCSVMapping.ITEM_GROUP];
      jsonRow.UNIT=values[i][batchCSVMapping.UNIT];      
      
      jsonArray.push(jsonRow);
      //break;
    }    
    
    //Logger.log(jsonArray);
    
    //save data in FIREBASE
    FirebaseConnector.writeOnFirebase(jsonArray,dataNode,userToken);
    
  }
  //---------------------------------------------------------
  // END Fetch Sheet Data from FIREBASE function
  //--------------------------------------------------------- 
}
