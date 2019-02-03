/*global SpreadsheetApp: false */
/*global PropertiesService: false */
// ID to the spread sheet containing the driver contact data
//var TEAM_SHEET_ID = "0Atu3g8WIA7BjdG1xRDAxRWtWYlZHTW95TEFKdmxSbkE"
//var TEAM_SHEET_ID = "1l6kaIQJoInY88iK2-3ds76n8MgPJFowkXt7LJx6Q-YQ"
//var TEAM_SHEET_ID = "17wqwleIBfPBONlDY4h81TGogOzdCbwL9geuG260M-b4" // 2016
//var TEAM_SHEET_ID = "1SoyjKxvnhLwiNL5pkIYmeIDrQqxoL_zkw2n4RHmlLrI" // 2017
//var TEAM_SHEET_ID = "1lWxM8-juLzWZIfoUfDOjOabdPmwuUrrysWpvB8dyrRQ" // 2018


// Create new instance of a Driver Sheet
function DriversSheet(){
  var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("TEAM_SHEET_ID"));
  var sheet = ss.getSheets()[0];
  var maxRow = sheet.getDataRange().getLastRow();
  var range = sheet.getRange(2,1,maxRow - 1, sheet.getDataRange().getLastColumn());

  this.drivers = getRowsData(sheet, range, 1);

  this.findByName = function(name){
    var ret = null
    var i = 0;
    while(i < this.drivers.length && null == ret){
      if(this.drivers[i].screenName == name){
        ret = this.drivers[i];
      }
      ++i;
    }
    return ret;
  }

  this.getDriverList = function(){
    var ret = []
    for(var i = 0 ; i < this.drivers.length ; ++i){
      ret.push(this.drivers[i].screenName)
    }
    return ret;
  }
}

function testDriverFindByName(){
  var drivers = new DriversSheet();
  var driver = drivers.findByName("Rick Purtee");

  for (var key in driver) {
    if (driver.hasOwnProperty(key)) {
      Logger.log(key + ":" + driver[key]);
    }
  }
}



