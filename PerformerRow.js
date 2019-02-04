/*global Utilities: false */
/*global PerformerSheet: false */
/*global Logger: false */
/*global mergeDateTime: false */

'use strict';

ColumnItem.constructor = ColumnItem;
ColumnItem.prototype.header = "";
ColumnItem.prototype.name = null;
ColumnItem.prototype.format = "@";
ColumnItem.prototype.mapIndex = 0;
ColumnItem.prototype.isStringFormat = function () {
  return this.format === ColumnItem.prototype.format;
}
function ColumnItem(name, header, format, mapIndex) {
  this.name = name;
  this.header = header;
  this.format = format;
  this.mapIndex = mapIndex;
}



/**
 * Base prototype contructor for ActRows in a spreadSheet
 * the prototype of the object calling this must contain
 * implementations, or valid values for the required properties
 * listed below
 */
function ActRow() {
  if (this.numColumns > 0 && this.columnItems.length > 0) {
    this.columnValues = new Array(this.numColumns);
    this.formatStrings = new Array();
    for (var i = 0; i < this.numColumns; ++i) {
      // define the column value indexs
      Object.defineProperty(this, this.columnItems[i].name, { value: i, writable: false, enumerable: false });
      this.formatStrings.push(this.columnItems[i].format);
    }
  }
}

// ActRow properties that are required
//  derived classes should provide all these properties
ActRow.prototype.actName = null;
ActRow.prototype.firstName = null;
ActRow.prototype.lastName = null;
ActRow.prototype.columnItems = null;
ActRow.prototype.numColumns = 0;


ActRow.prototype.getHeaderArray = function () {
  var retArray = new Array();
  var headerStrings = new Array();

  for (var i = 0; i < this.columnItems.length; ++i) {
    headerStrings.push(this.columnItems[i].header);
  }
  retArray.push(headerStrings);
  return retArray;
}

/**
 * Does the given row have the same ID has this
 * @param {ActRow} row - the row to test the ID of
 */
ActRow.prototype.hasSameIdHas = function (row) {
  var found = false;
  found = this.actName === row.actName;
  found = found && this.firstName === row.firstName;
  found = found && this.lastName === row.lastName;
  return found;
};

/**
 * Update this ActRow with the columns from the given ActRow
 * @param {ActRow} row - the row to update from
 */
ActRow.prototype.update = function (row) { this.fromArray(row.columnValues); };

/**
 * Set the array of column values to the values given in the Arra
 * @param {Array} newRowArray - the array to set the column values from
 */
ActRow.prototype.fromArray = function (newRowArray) {
  for (var i = 0; i < this.numColumns; ++i) {
    var item = newRowArray[i];
    if ("@" === this.formatStrings[i]) {
      item = String(item).trim();
    }
    this.columnValues[i] = item;
  }
};

ActRow.prototype.fromMappedArray = function (sourceArray) {
  for (var i = 0; i < this.numColumns; ++i) {
    var item = sourceArray[this.columnItems[i].mapIndex];
    if ("@" === this.formatStrings[i]) {
      item = String(item).trim();
    }
    this.columnValues[i] = item;
  }
}

ActRow.prototype.toMappedArray = function (destinationArray) {
  for (var i = 0; i < this.numColumns; ++i) {
    destinationArray[this.columnItems[i].mapIndex] = this.columnValues[i];
  }
}

// function logRange(range, strsArray){
//   Logger.log("Range starting cell Row:Column : " + range.getRow() + ":" + range.getColumn());
//   Logger.log("Range NumRows:NumColumns : " + range.getNumRows() + ":" + range.getNumColumns());
//   Logger.log("StrsArray Size NumRows:NumColumns : " + strsArray.length + ":" + strsArray[0].length);
// }

/**
 * Add the ActRow to the given sheet
 * @param {Sheet} sheet - the sheet to add the row to
 */
ActRow.prototype.addToSheet = function (sheet) {
  sheet.appendRow(this.columnValues);
  var range = sheet.getRange((sheet.getLastRow()), 1, 1, this.numColumns);
  //logRange(range, this.formatStrings);
  range.setNumberFormats(this.formatStrings);
}

/**
 *  Initialize given range to the values of the column values
 *  and set the cell formatting for the range
 * @param {Range} range - the range to set to the column values
 */
ActRow.prototype.initRange = function (range) {
  if (this.updateRange(range)) {
    range.setNumberFormats(this.formatStrings);
  }
};



PerformerRow.prototype = new ActRow();
PerformerRow.constructor = PerformerRow;
PerformerRow.prototype.columnItems = [
  { name: "ACT_NAME"              , header: "" , mapIndex:    1, format: "@"},
  { name: "NUMBER_IN_ACT"         , header: "" , mapIndex:    2, format: "@"},
  { name: "FIRST_NAME"            , header: "" , mapIndex:    3, format: "@"},
  { name: "LAST_NAME"             , header: "" , mapIndex:    4, format: "@"},
  { name: "MOBILE"                , header: "" , mapIndex:    5, format: "@"},
  { name: "EMAIL"                 , header: "" , mapIndex:    6, format: "@"},
  { name: "METHOD"                , header: "" , mapIndex:    7, format: "@"},
  { name: "NEEDS_RIDES"           , header: "" , mapIndex:   13, format: "@"},
  { name: "NEEDS_SHUTTLE"         , header: "" , mapIndex:   14, format: "@"},
  { name: "TRAVEL_NOTES"          , header: "" , mapIndex:   23, format: "@"},
  { name: "COMING_FROM"           , header: "" , mapIndex:   25, format: "@"},
  { name: "ARRIVING_AT"           , header: "" , mapIndex:   26, format: "@"},
  { name: "ARRIVAL_DATE"          , header: "" , mapIndex:   27, format: "mm-dd-yyyy"},
  { name: "ARRIVAL_TIME"          , header: "" , mapIndex:   28, format: "hh:mm"},
  { name: "ARRIVAL_NUM"           , header: "" , mapIndex:   29, format: "@"},
  { name: "ARRIVAL_NOTES"         , header: "" , mapIndex:   30, format: "@"},
  { name: "NEEDS_PICKUP"          , header: "" , mapIndex:   31, format: "@"},
  { name: "ARRIVAL_SHIFT_ENTERED" , header: "" , mapIndex:   32, format: "@"},
  { name: "ARRIVAL_DRIVER"        , header: "" , mapIndex:   33, format: "@"},
  { name: "ARRIVAL_PHONE"         , header: "" , mapIndex:   34, format: "@"},
  { name: "GOING_TO"              , header: "" , mapIndex:   36, format: "@"},
  { name: "DEPART_FROM"           , header: "" , mapIndex:   37, format: "@"},
  { name: "DEPART_DATE"           , header: "" , mapIndex:   38, format: "mm-dd-yyyy"},
  { name: "DEPART_TIME"           , header: "" , mapIndex:   39, format: "hh:mm"},
  { name: "DEPART_NUM"            , header: "" , mapIndex:   40, format: "@"},
  { name: "DEPART_NOTES"          , header: "" , mapIndex:   41, format: "@"},
  { name: "NEEDS_DROPOFF"         , header: "" , mapIndex:   42, format: "@"},
  { name: "DEPART_SHIFT_ENTERED"  , header: "" , mapIndex:   43, format: "@"},
  { name: "DEPART_DRIVER"         , header: "" , mapIndex:   44, format: "@"},
  { name: "DEPART_PHONE"          , header: "" , mapIndex:   45, format: "@"},
  { name: "HOUSING_HOST"          , header: "" , mapIndex:   49, format: "@"},
  { name: "HOUSING_PHONE"         , header: "" , mapIndex:   50, format: "@"},
  { name: "HOUSING_ADDDRESS"      , header: "" , mapIndex:   51, format: "@"},
  { name: "HOUSING_EMAIL"         , header: "" , mapIndex:   52, format: "@"}
]

PerformerRow.prototype.numColumns = PerformerRow.prototype.columnItems.length;

 function PerformerRow(){
  ActRow.call(this);
  Object.defineProperty(this, 'actName'             ,{get: function(){return this.columnValues[this.ACT_NAME        ];}, set: function(value){this.columnValues[this.ACT_NAME        ] = value;}, enumerable: true});
  Object.defineProperty(this, 'firstName'           ,{get: function(){return this.columnValues[this.FIRST_NAME      ];}, set: function(value){this.columnValues[this.FIRST_NAME      ] = value;}, enumerable: true});
  Object.defineProperty(this, 'lastName'            ,{get: function(){return this.columnValues[this.LAST_NAME       ];}, set: function(value){this.columnValues[this.LAST_NAME       ] = value;}, enumerable: true});
  Object.defineProperty(this, 'numberInAct'         ,{get: function(){return this.columnValues[this.NUMBER_IN_ACT   ];}, set: function(value){this.columnValues[this.NUMBER_IN_ACT   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'mobile'              ,{get: function(){return this.columnValues[this.MOBILE          ];}, set: function(value){this.columnValues[this.MOBILE          ] = value;}, enumerable: true});
  Object.defineProperty(this, 'eMail'               ,{get: function(){return this.columnValues[this.EMAIL           ];}, set: function(value){this.columnValues[this.EMAIL           ] = value;}, enumerable: true});
  Object.defineProperty(this, 'needsRides'          ,{get: function(){return this.columnValues[this.NEEDS_RIDES     ];}, set: function(value){this.columnValues[this.NEEDS_RIDES     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'needsShuttle'        ,{get: function(){return this.columnValues[this.NEEDS_SHUTTLE   ];}, set: function(value){this.columnValues[this.NEEDS_SHUTTLE   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'travelMethod'        ,{get: function(){return this.columnValues[this.METHOD          ];}, set: function(value){this.columnValues[this.METHOD          ] = value;}, enumerable: true});
  Object.defineProperty(this, 'travelNotes'         ,{get: function(){return this.columnValues[this.TRAVEL_NOTES    ];}, set: function(value){this.columnValues[this.TRAVEL_NOTES    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'comingFrom'          ,{get: function(){return this.columnValues[this.COMING_FROM     ];}, set: function(value){this.columnValues[this.COMING_FROM     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'arrivingAt'          ,{get: function(){return this.columnValues[this.ARRIVING_AT     ];}, set: function(value){this.columnValues[this.ARRIVING_AT     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'arriveDate'          ,{get: function(){return this.columnValues[this.ARRIVAL_DATE    ];}, set: function(value){this.columnValues[this.ARRIVAL_DATE    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'arriveTime'          ,{get: function(){return this.columnValues[this.ARRIVAL_TIME    ];}, set: function(value){this.columnValues[this.ARRIVAL_TIME    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightArrivalNum'    ,{get: function(){return this.columnValues[this.ARRIVAL_NUM     ];}, set: function(value){this.columnValues[this.ARRIVAL_NUM     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightArrivalNotes'  ,{get: function(){return this.columnValues[this.ARRIVAL_NOTES   ];}, set: function(value){this.columnValues[this.ARRIVAL_NOTES   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightArrivalDriver' ,{get: function(){return this.columnValues[this.ARRIVAL_DRIVER  ];}, set: function(value){this.columnValues[this.ARRIVAL_DRIVER  ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightArrivalPhone'  ,{get: function(){return this.columnValues[this.ARRIVAL_PHONE   ];}, set: function(value){this.columnValues[this.ARRIVAL_PHONE   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'goingTo'             ,{get: function(){return this.columnValues[this.GOING_TO        ];}, set: function(value){this.columnValues[this.GOING_TO        ] = value;}, enumerable: true});
  Object.defineProperty(this, 'departForm'          ,{get: function(){return this.columnValues[this.DEPART_FROM     ];}, set: function(value){this.columnValues[this.DEPART_FROM     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'departDate'          ,{get: function(){return this.columnValues[this.DEPART_DATE     ];}, set: function(value){this.columnValues[this.DEPART_DATE     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'departTime'          ,{get: function(){return this.columnValues[this.DEPART_TIME     ];}, set: function(value){this.columnValues[this.DEPART_TIME     ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightDepartNum'     ,{get: function(){return this.columnValues[this.DEPART_NUM      ];}, set: function(value){this.columnValues[this.DEPART_NUM      ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightDepartNotes'   ,{get: function(){return this.columnValues[this.DEPART_NOTES    ];}, set: function(value){this.columnValues[this.DEPART_NOTES    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightDepartDriver'  ,{get: function(){return this.columnValues[this.DEPART_DRIVER   ];}, set: function(value){this.columnValues[this.DEPART_DRIVER   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'flightDepartPhone'   ,{get: function(){return this.columnValues[this.DEPART_PHONE    ];}, set: function(value){this.columnValues[this.DEPART_PHONE    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'housingHost'         ,{get: function(){return this.columnValues[this.HOUSING_HOST    ];}, set: function(value){this.columnValues[this.HOUSING_HOST    ] = value;}, enumerable: true});
  Object.defineProperty(this, 'housingPhone'        ,{get: function(){return this.columnValues[this.HOUSING_PHONE   ];}, set: function(value){this.columnValues[this.HOUSING_PHONE   ] = value;}, enumerable: true});
  Object.defineProperty(this, 'housingAddress'      ,{get: function(){return this.columnValues[this.HOUSING_ADDDRESS];}, set: function(value){this.columnValues[this.HOUSING_ADDDRESS] = value;}, enumerable: true});
  Object.defineProperty(this, 'housingEmail'        ,{get: function(){return this.columnValues[this.HOUSING_EMAIL   ];}, set: function(value){this.columnValues[this.HOUSING_EMAIL   ] = value;}, enumerable: true});

  Object.defineProperties(this, 'flightArrivalDate', {
    enumerable: true,
    get: function() {
      return new mergeDateTime(this.arriveDate,this.arriveTime);
    },
    set: function(date){
      this.arriveDate = date.getDateString();
      this.arriveTime = date.getTimeString();
    }
  });
  Object.defineProperties(this, 'flightDepartDate', {
    enumerable: true,
    get: function() {
      return new mergeDateTime(this.departDate,this.departTime);
    },
    set: function(date){
      this.departDate = date.getDateString();
      this.departTime = date.getTimeString();
    }
  });
  Object.defineProperties(this, 'flightArrivalIsShiftEntered', {
    enumerable: true,
    get: function(){
      return  this.currentValues[this.ARRIVAL_SHIFT_ENTERED].trim() === "Yes";
    },
    set: function(isShiftEntered) {
      this.currentValues[this.ARRIVAL_SHIFT_ENTERED] = (isShiftEntered) ? "Yes" : "";
    }
  });
  Object.defineProperties(this, 'flightDepartIsShiftEntered', {
    enumerable: true,
    get: function(){
      return  this.currentValues[this.DEPART_SHIFT_ENTERED].trim() === "Yes";
    },
    set: function(isShiftEntered) {
      this.currentValues[this.DEPART_SHIFT_ENTERED] = (isShiftEntered) ? "Yes" : "";
    }
  });

  // needsPickUp
  Object.defineProperties(this, 'needsPickUp', {
    enumerable: true,
    get: function () {
      var pickup = this.columnValues[this.NEEDS_PICKUP].trim();
      var needsRide = this.columnValues[this.NEEDS_RIDES].trim();
      return pickup.toUpperCase() == "NEEDS" || needsRide.toUpperCase() == "NEEDS";
    }
  });
  // needsDropOff
  Object.defineProperties(this, 'needsDropOff', {
    enumerable: true,
    get: function() {
      var dropOff = this.columnValues[this.NEEDS_DROPOFF].trim();
      var needsRide = this.columnValues[this.NEEDS_RIDES].trim();
      return dropOff.toUpperCase() == "NEEDS" || needsRide.toUpperCase() == "NEEDS";
    }
  });

  /**
  * Test if the row has an address
  */
  Object.defineProperties(this, 'hasHousingAddress', {
    enumerable: true,
    get: function () {
      return this.housingAddress !== null && this.housingAddress !== "";
    }
  });

  Object.defineProperties(this, 'hasArrival', {
    enumerable: true,
    get: function () {
      return this.flightArrivalNum !== null && this.flightArrivalNum !== "";
    }
  });

  Object.defineProperties(this, 'hasDeparture', {
    enumerable: true,
    get: function () {
      return this.flightDepartNum !== null && this.flightDepartNum !== "";
    }
  });

  Object.defineProperties(this, 'isValidForArrival', {
    enumerable: true,
    get: function () {
      return this.hasHousingAddress() && this.hasArrival();
    }
  });

  Object.defineProperties(this, 'isValidForDeparture', {
    enumerable: true,
    get: function () {
      return this.hasHousingAddress() && this.hasDeparture();
    }
  });

 }
  /**
  *
  */
 PerformerRow.prototype.mergeToDoc = function (docBody, isArrival) {
  var directionPickup = "pick up";
  var directionDropoff = "drop off";

  docBody.replaceText("<FirstName>", this.firstName);
  docBody.replaceText("<LastName>", this.lastName);
  docBody.replaceText("<Mobile>", this.mobile);
  docBody.replaceText("<Email>", this.eMail);
  var flightDate = this.flightArrivalDate;
  var directionStr = directionPickup;
  var flightDirectionStr = "Arriving";
  var flightNumStr = this.flightArrivalNum;
  if (!isArrival) {
    flightDate = this.flightDepartDate
    directionStr = directionDropoff;
    flightDirectionStr = "Departing";
    flightNumStr = this.flightDepartNum;
  }
  docBody.replaceText("<Direction>", directionStr);
  docBody.replaceText("<FlightDate>", Utilities.formatDate(flightDate, "PST", "MMM dd"));
  docBody.replaceText("<FlightTime>", Utilities.formatDate(flightDate, "PST", "hh:mm a"));
  docBody.replaceText("<FlightDirection>", flightDirectionStr);
  docBody.replaceText("<FlightNum>", flightNumStr);

  docBody.replaceText("<HousingName>", this.housingHost);
  docBody.replaceText("<HousingPhone>", this.housingPhone);
  docBody.replaceText("<HousingAddress>", this.housingAddress);
  docBody.replaceText("<HousingEmail>", this.housingEmail);

  // Current data set has all notes in the arrival column
  //if(isArrival){
  docBody.replaceText("<Notes>", this.flightArrivalNotes);
  //}
  //else{
  //  docBody.replaceText("<Notes>", this.flightDepartNotes);
  //}
}
/**
* Given a template string replace the templated strings with row data and return the new string
*
* @param subjectTemplate - String containing the subject template
* @return a new string containing the formatted data
*
* example Template: "<SubjectDirection> <FirstName> <LastName> of <ActName>"
*/
PerformerRow.prototype.mergeSubject = function (subjectTemplate, forArrival) {
  var subjectPickup = "Picking up";
  var subjectDropoff = "Dropping off";

  var retText = subjectTemplate.replace("<FirstName>", this.firstName);
  retText = retText.replace("<LastName>", this.lastName);
  retText = retText.replace("<ActName>", this.actName);
  var dirStr = subjectPickup
  if (!forArrival) {
    dirStr = subjectDropoff;
  }
  retText = retText.replace("<SubjectDirection>", dirStr);
  return retText;
}

PerformerRow.prototype.toLog = function () {
  Logger.log("Act Name: " + this.actName);
  Logger.log("Number in act: " + this.numberInAct);
  Logger.log("Fist Name: " + this.firstName);
  Logger.log("lastName: " + this.lastName);
  Logger.log("mobile: " + this.mobile);
  Logger.log("eMail: " + this.eMail);
  Logger.log("travelMethod: " + this.travelMethod);
  Logger.log("NeedsRides: " + this.needsRides);
  if (this.isValidForArrival()) {
    Logger.log("comingFrom: " + this.comingFrom);
    Logger.log("arrivingAt: " + this.arrivingAt);
    Logger.log("flightArrivalDate: " + Utilities.formatDate(this.flightArrivalDate, "PST", "MMM dd"));
    Logger.log("flightArrivalTime: " + Utilities.formatDate(this.flightArrivalDate, "PST", "hh:mm a"));
    Logger.log("flightArrivalNum: " + this.flightArrivalNum);
    Logger.log("flightArrivalNotes: " + this.flightArrivalNotes);
    Logger.log("needsPickUp: " + this.needsPickUp());
    Logger.log("flightArrivalisShiftEntered: " + this.flightArrivalisShiftEntered);
    Logger.log("flightArrivalDriver: " + this.flightArrivalDriver);
    Logger.log("flightArrivalPhone: " + this.flightArrivalPhone);
  }
  if (this.isValidForDeparture()) {
    Logger.log("goingTo: " + this.goingTo);
    Logger.log("departForm: " + this.departForm);
    Logger.log("flightDepartDate: " + this.flightDepartDate);
    Logger.log("flightDepartTime: " + this.flightDepartTime);
    Logger.log("flightDepartNum: " + this.flightDepartNum);
    Logger.log("flightDepartNotes: " + this.flightDepartNotes);
    Logger.log("needsDropOff: " + this.needsDropOff());
    Logger.log("flightDepartIsShiftEntered: " + this.flightDepartIsShiftEntered);
    Logger.log("flightDepartDriver: " + this.flightDepartDriver);
    Logger.log("flightDepartPhone: " + this.flightDepartPhone);
  }
  Logger.log("housingHost: " + this.housingHost);
  Logger.log("housingPhone: " + this.housingPhone);
  Logger.log("housingAddress: " + this.housingAddress);
  Logger.log("housingEmail: " + this.housingEmail);
}



function testPerformerRow() {
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.findPerformerByName("Alan Plotkin");
  if (null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if (null === errorMessage && !performerRow.isValidForArrival()) {
    errorMessage = Utilities.formatString('Transport Row Test:: There is currently no arrival data for %s', performerRow.toString());
  }
  if (null === errorMessage && !performerRow.isValidForDeparture()) {
    errorMessage = Utilities.formatString("Transport Row Test:: There is currently no departure data for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if (null === errorMessage && !performerRow.hasHousingAddress()) {
    errorMessage = Utilities.formatString("Transport Row Test: There is currently no housing available for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if (null === errorMessage) {
    Logger.log("Test Passed");
  }
  else {
    Logger.log(errorMessage);
  }

}

function testUpdateRow() {
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.getPerformerRow(1);
  if (null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if (null == errorMessage && !performerRow.hasHousingAddress()) {
    errorMessage = Utilities.formatString("Transport Row Test: There is currently no housing available for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if (null == errorMessage && !performerRow.isValidForArrival()) {
    errorMessage = Utilities.formatString('Transport Row Test:: There is currently no arrival data for %s', performerRow.toString());
  }
  if (null == errorMessage && !performerRow.isValidForDeparture) {
    errorMessage = Utilities.formatString("Transport Row Test:: There is currently no departure data for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if (null == errorMessage) {
    performerRow.flightArrivalDriver = "NO BODY";
    performerRow.flightDepartDriver = "NO BODY";
    performerRow.updateRow();

    Logger.log("Test Passed");
  }
  else {
    Logger.log(errorMessage);
  }
}

function testMergeSubject() {
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.getPerformerRow(1);
  if (null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if (null == errorMessage) {
    Logger.log(performerRow.mergeSubject());
  }
}

function testNeedPickupAndDropoff() {
  var performerSheet = new PerformerSheet();

  var t = 0;
  while (t < performerSheet.rowCount) {
    var performerRow = new PerformerRow(performerSheet.getRowRange(t));

    Logger.log("Act: %s Performer: %s %s ", performerRow.actName, performerRow.firstName, performerRow.lastName);
    if (performerRow.needsPickUp()) {
      Logger.log("Needs a Pickup");
    }
    else {
      Logger.log("Does not need Pickup");
    }

    if (performerRow.needsDropOff()) {
      Logger.log("Needs Dropoff");
    }
    else {
      Logger.log("Does not need Dropoff");
    }

    t++;
  }
}




