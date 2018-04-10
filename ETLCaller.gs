/**
 * class to manage to sync data to the original sources
 */
var ETLCaller = new function() {
	/**
	 * call the ETL Jobs
	 * @param  {string} countryLabel label of the country
	 * @return  NO RETURN	 
	 */
	 this.runETLJob = function() {
       var options={
         'method' : 'post',
         'contentType': 'application/json',         
         'payload' : JSON.stringify({"jobNameAndParameters":Config.ETLjobNameAndParameters})
       };

       var resp= UrlFetchApp.fetch( Config.ETLEndpoints, options );
       Logger.log(resp);
       Logger.log(resp.getResponseCode());       
 	} 

};
