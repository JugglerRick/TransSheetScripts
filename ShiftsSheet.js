/*global SpreadsheetApp: false */
/*global PropertiesService: false */
/*global Logger: false */
/*global isCellEmpty: false */
/*global StringStartsWith: false */
/*global normalizeHeaders: false */

//team
//date
//shift
//account
//firstName
//lastName
//subject
//roomfloor
//details
//shiftboardId
//email
//profileType
//address
//city
//state
//zippostalCode
//country
//homePhone
//published
//noPickup
//location
//locationDescription
//locationAddress
//locationCity
//locationStateprovince
//locationZippostalCode
//locationCountry
//covered
//hours
//creditHours
//compHours
//qty
//id

var ShiftTypeEnum = {
  UNKNOWN:0,
  SHUTTLE:1,
  PICKUP:2,
  DROPOFF:3,
  Strings:{0:"Unknown", 1:"Shuttle", 2:"Picking up", 3:"Dropping off"}
  }



function Shift(rowData, headers){
  this.hasData = false;

  this.Shift
  for (var i = 0; i < rowData.length; ++i) {
    var cellData = rowData[i];
    if (isCellEmpty(cellData)) {
      continue;
    }
    this[headers[i]] = cellData;
    this.hasData = true;
  }


  this.type = ShiftTypeEnum.UNKNOWN;

  // gets the type of shift it is based on the details of the shift
  // This only works if the strings that start the detail are the ones in the Strings of the ShiftType
  this.getType = function(){
    if(this.type == ShiftTypeEnum.UNKNOWN){
      if(StringStartsWith(this.details, ShiftTypeEnum.Strings[ShiftTypeEnum.SHUTTLE])){
        this.type = ShiftTypeEnum.SHUTTLE;
      }
      else if(StringStartsWith(this.details, ShiftTypeEnum.Strings[ShiftTypeEnum.PICKUP])){
        this.type = ShiftTypeEnum.PICKUP;
      }
      else if(StringStartsWith(this.details, ShiftTypeEnum.Strings[ShiftTypeEnum.DROPOFF])){
        this.type = ShiftTypeEnum.DROPOFF;
      }
    }
    return this.type;
  }


  this.isAirportRun = function(){
    return this.getType() == ShiftTypeEnum.PICKUP || this.getType() == ShiftTypeEnum.PICKUP;
  }


  this.getPerformer = function(){
    var startPos = ShiftTypeEnum.Strings[this.getType()].length;
    var endPos = this.details.indexOf('(', startPos);
    var andPos = this.details.indexOf("and", startPos);
    var ret;
    if(andPos > -1 && andPos < endPos){
      endPos = andPos - 1;
      }
    ret = this.details.slice(startPos, endPos);
    return ret;
  }


}



// Create new instance of a Shifts Sheet
function ShiftsSheet(){
  this.shifts = [];

  var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("SHIFTS_SHEET_ID"));
  var sheet = ss.getSheets()[0];
  var maxRow = sheet.getDataRange().getLastRow();
  var range = sheet.getRange(2,1,maxRow - 1, sheet.getDataRange().getLastColumn());


  var columnHeadersRowIndex = range.getRowIndex() - 1;
  var numColumns = range.getLastColumn() - range.getColumn() + 1;
  var headersRange = sheet.getRange(columnHeadersRowIndex, range.getColumn(), 1, numColumns);
  var headers = normalizeHeaders(headersRange.getValues()[0]);
  var data = range.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = new Shift(data[i], headers);
    if (row.hasData) {
      this.shifts.push(row);
    }
  }

  this.findAllByName = function(name){
    var ret = new Array();
    var i = 0;
    while(i < this.shifts.length){
      if(this.shifts[i].account == name){
        ret.push(this.shifts[i]);
      }
      ++i;
    }
    return ret;
  }
}

function logShifts(shift, index, shifts)
{
  Logger.log(shift);
}

function testShiftFindByName(){
  var shifts = new ShiftsSheet();
  var driverShifts = shifts.findAllByName("Sharon Mason");
  driverShifts.forEach(logShifts);
}


function testShiftType(){
  var shiftsheet = new ShiftsSheet();
  for(var i = 0 ; i < shiftsheet.shifts.length ; ++ i){
    Logger.log(ShiftTypeEnum.Strings[shiftsheet.shifts[i].getType()]);
  }
}

function testGetPerformer(){
  var shiftsheet = new ShiftsSheet();
  for(var i = 0 ; i < shiftsheet.shifts.length ; ++ i){
    if(shiftsheet.shifts[i].isAirportRun()){
      Logger.log(shiftsheet.shifts[i].getPerformer());
    }
  }
}


