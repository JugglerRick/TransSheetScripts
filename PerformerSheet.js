/*global SpreadsheetApp: false */
/*global PropertiesService: false */
/*global PerformerRow: false */
/*global Logger: false */
/*global ArrayContains: false */

//144rrquvABOxlQWOT4UhHdEUbUfgleqdZdD7eDdZ6BWA -- 2018 sheet
//193UtFAnVv1aZUfH5lRBUapkME0jnNLWg_LyRNLD_MOQ -- 2019 sheet
//1Xd0quFct-O9r2sIdpB6ONBcEsd-R39S0xSlkH5RoA-4 -- 2019 test sheet

/**
* This is the object that is used to read the spreadsheet information
*/
function PerformerSheet() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var performerSheetID = scriptProperties.getProperty("SOURCE_SHEET_ID");
  var ss = SpreadsheetApp.openById(performerSheetID);
  this.sheet = ss.getSheets()[0];
  this.startingRow = this.sheet.getFrozenRows() + 1;
  this.rowCount = (this.sheet.getDataRange().getLastRow() + 1) - this.startingRow;
  this.rows = [];

  /**
  * Given the index of row data in the this.rows, return the index of the row in the sheet
  */
  this.getSheetRowIndex = function(rowIndex){
    return rowIndex + this.startingRow;
  }

  /**
  *
  */
  this.getSheetColumnIndex = function(colIndex){
    return colIndex + 1; // 1 to convert from zero based index
  }

  /**
  * get a spreadsheet range for the given row number
  */
  this.getRowRange = function(rowNumber){
    return this.sheet.getRange(this.getSheetRowIndex(rowNumber), 1, 1, this.sheet.getLastColumn());
  }

  /**
  * get the Performer Row by index
  */
  this.getPerformerRow = function(rowNumber){
    return new PerformerRow(this.getRowRange(rowNumber));
  }

  for(var i = 0 ; i < this.rowCount ; ++i) {
    var row = this.getPerformerRow(i);
    this.rows.push(row);
  }


  /**
  * Find the row for the given performers name
  */
  this.findPerformerByName = function(name) {
    var performer = null;
    var performerName = null;
    for(var i = 0 ; i < this.rows.length && null == performer ; ++i){
      performerName = this.rows[i].firstName + ' ' + this.rows[i].lastName;
      if(name == performerName) {
        performer = this.rows[i];
      }
    }
    if(null == performer) {
      Logger.log("findPerformer was unable to locate " + name);
    }
    return performer;
  }

  /**
  * Get a list of the Acts
  */
  this.getActList = function(){
    var list = [];
    for(var i = 0 ; i < this.rows.length ; ++i){
      if(this.rows[i].actName != "" && !ArrayContains(list, this.rows[i].actName)){
          list.push(this.rows[i].actName);
      }
    }
    return list.sort();
  }

  /**
  * GetPerformersList
  */
  this.getPerformerList = function(){
    var list = [];
    for(var i = 0 ; i < this.rows.length ; ++i){
      if(this.rows[i].firstName != "" && this.rows[i].lastName != ""){
          list.push(this.rows[i].firstName + ' ' + this.rows[i].lastName);
      }
    }
    return list.sort();
  }
}

/*
*
*/
function testFindPerformer(){
  var performerName = 'Alan Plotkin';

  var performerSheet = new PerformerSheet();
  var performer = performerSheet.findPerformerByName(performerName);
  performer.toLog();
}

