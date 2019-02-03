/*global Utilities: false */
/*global PerformerSheet: false */
/*global Logger: false */
/*global mergeDateTime: false */

function PerformerRow(rowRange) {
  var TRANSPORT_ACT_NAME_COLUMN = 2;
  var TRANSPORT_NUMBER_IN_ACT_COLUMN = 3;
  var TRANSPORT_FIRST_NAME_COLUMN = 4;
  var TRANSPORT_LAST_NAME_COLUMN = 5;
  var TRANSPORT_MOBILE_COLUMN = 6;
  var TRANSPORT_EMAIL_COLUMN = 7;
  var TRANSPORT_METHOD_COLUMN= 8;
  var TRANSPORT_NEEDS_RIDES_COLUMN = 14;
  var TRANSPORT_NEEDS_SHUTTLE_COLUMN = 15;

  var TRANSPORT_COMING_FROM_COLUMN = 27;
  var TRANSPORT_ARRIVING_AT_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 1;
  var TRANSPORT_ARRIVAL_DATE_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 2;
  var TRANSPORT_ARRIVAL_TIME_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 3;
  var TRANSPORT_ARRIVAL_NUM_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 4;
  var TRANSPORT_ARRIVAL_NOTES_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 5;
  var TRANSPORT_NEEDS_PICKUP_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 6;
  var TRANSPORT_ARRIVAL_SHIFT_ENTERED_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 7;
  var TRANSPORT_ARRIVAL_DRIVER_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 8;
  var TRANSPORT_ARRIVAL_PHONE_COLUMN = TRANSPORT_COMING_FROM_COLUMN + 9;

  var TRANSPORT_GOING_TO_COLUMN = 38;
  var TRANSPORT_DEPART_FROM_COLUMN = TRANSPORT_GOING_TO_COLUMN + 1;
  var TRANSPORT_DEPART_DATE_COLUMN = TRANSPORT_GOING_TO_COLUMN + 2;
  var TRANSPORT_DEPART_TIME_COLUMN = TRANSPORT_GOING_TO_COLUMN + 3;
  var TRANSPORT_DEPART_NUM_COLUMN = TRANSPORT_GOING_TO_COLUMN + 4;
  var TRANSPORT_DEPART_NOTES_COLUMN = TRANSPORT_GOING_TO_COLUMN + 5;
  var TRANSPORT_NEEDS_DROPOFF_COLUMN = TRANSPORT_GOING_TO_COLUMN + 6;
  var TRANSPORT_DEPART_SHIFT_ENTERED_COLUMN = TRANSPORT_GOING_TO_COLUMN + 7;
  var TRANSPORT_DEPART_DRIVER_COLUMN = TRANSPORT_GOING_TO_COLUMN + 8;
  var TRANSPORT_DEPART_PHONE_COLUMN = TRANSPORT_GOING_TO_COLUMN + 9;

  var TRANSPORT_HOUSING_HOST_COLUMN = 51;
  var TRANSPORT_HOUSING_PHONE_COLUMN = TRANSPORT_HOUSING_HOST_COLUMN + 1;
  var TRANSPORT_HOUSING_ADDDRESS_COLUMN = TRANSPORT_HOUSING_HOST_COLUMN + 2;
  var TRANSPORT_HOUSING_EMAIL_COLUMN = TRANSPORT_HOUSING_HOST_COLUMN + 3;

  this.range = rowRange;
  var transSheetRowData = this.range.getValues()[0];
  // read performer information
  this.actName = String(transSheetRowData[TRANSPORT_ACT_NAME_COLUMN]).trim();
  this.numberInAct = transSheetRowData[TRANSPORT_NUMBER_IN_ACT_COLUMN];
  this.firstName = transSheetRowData[TRANSPORT_FIRST_NAME_COLUMN].trim();
  this.lastName = transSheetRowData[TRANSPORT_LAST_NAME_COLUMN].trim();
  this.mobile = transSheetRowData[TRANSPORT_MOBILE_COLUMN].trim();
  this.eMail = transSheetRowData[TRANSPORT_EMAIL_COLUMN].trim();
  // read travel methods
  this.needsRides = transSheetRowData[TRANSPORT_NEEDS_RIDES_COLUMN].trim();
  this.needsShuttle = transSheetRowData[TRANSPORT_NEEDS_SHUTTLE_COLUMN].trim();
  this.travelMethod = transSheetRowData[TRANSPORT_METHOD_COLUMN].trim();
  // read arrival data
  this.comingFrom = transSheetRowData[TRANSPORT_COMING_FROM_COLUMN].trim();
  this.arrivingAt = transSheetRowData[TRANSPORT_ARRIVING_AT_COLUMN];
  {
    var tempDate = new mergeDateTime(transSheetRowData[TRANSPORT_ARRIVAL_DATE_COLUMN], transSheetRowData[TRANSPORT_ARRIVAL_TIME_COLUMN]);

    this.flightArrivalDate = tempDate;
    this.flightArrivalTime = tempDate;
  }
  this.flightArrivalNum = transSheetRowData[TRANSPORT_ARRIVAL_NUM_COLUMN];
  this.flightArrivalNotes = transSheetRowData[TRANSPORT_ARRIVAL_NOTES_COLUMN].trim();
  // needs Pick up is a function that
  this.needsPickUp = function(){
    var pickup = transSheetRowData[TRANSPORT_NEEDS_PICKUP_COLUMN].trim();
    var needsRide = transSheetRowData[TRANSPORT_NEEDS_RIDES_COLUMN].trim();

    return pickup.toUpperCase() == "NEEDS" ||
           needsRide.toUpperCase() == "NEEDS";
  }
  this.flightArrivalisShiftEntered = transSheetRowData[TRANSPORT_ARRIVAL_SHIFT_ENTERED_COLUMN].trim() === "Yes";
  this.flightArrivalDriver = transSheetRowData[TRANSPORT_ARRIVAL_DRIVER_COLUMN].trim();
  this.flightArrivalPhone = transSheetRowData[TRANSPORT_ARRIVAL_PHONE_COLUMN].trim();


  this.goingTo = transSheetRowData[TRANSPORT_GOING_TO_COLUMN].trim();
  this.departForm = transSheetRowData[TRANSPORT_DEPART_FROM_COLUMN];
  {
    var tempDate = new mergeDateTime(transSheetRowData[TRANSPORT_DEPART_DATE_COLUMN], transSheetRowData[TRANSPORT_DEPART_TIME_COLUMN]);

    this.flightDepartDate = tempDate;
    this.flightDepartTime = tempDate;
  }
  this.flightDepartNum = transSheetRowData[TRANSPORT_DEPART_NUM_COLUMN];
  this.flightDepartNotes = transSheetRowData[TRANSPORT_DEPART_NOTES_COLUMN].trim();
  this.needsDropOff = function(){
     var dropOff = transSheetRowData[TRANSPORT_NEEDS_DROPOFF_COLUMN].trim();
     var needsRide = transSheetRowData[TRANSPORT_NEEDS_RIDES_COLUMN].trim();
    return dropOff.toUpperCase() == "NEEDS" ||
           needsRide.toUpperCase() == "NEEDS";
  }
  this.flightDepartIsShiftEntered = transSheetRowData[TRANSPORT_DEPART_SHIFT_ENTERED_COLUMN].trim() === "Yes";
  this.flightDepartDriver = transSheetRowData[TRANSPORT_DEPART_DRIVER_COLUMN].trim();
  this.flightDepartPhone = transSheetRowData[TRANSPORT_DEPART_PHONE_COLUMN].trim();

  this.housingHost = transSheetRowData[TRANSPORT_HOUSING_HOST_COLUMN].trim();
  this.housingPhone = transSheetRowData[TRANSPORT_HOUSING_PHONE_COLUMN].trim();
  this.housingAddress = transSheetRowData[TRANSPORT_HOUSING_ADDDRESS_COLUMN].trim();
  this.housingEmail = transSheetRowData[TRANSPORT_HOUSING_EMAIL_COLUMN].trim();


  this.updateRowData = function(){
    //transSheetRowData[TRANSPORT_ACT_NAME_COLUMN] = this.actName;
    //transSheetRowData[TRANSPORT_NUMBER_IN_ACT_COLUMN] = this.numberInAct;
    //transSheetRowData[TRANSPORT_FIRST_NAME_COLUMN] = this.firstName;
    //transSheetRowData[TRANSPORT_LAST_NAME_COLUMN] = this.lastName;
    //transSheetRowData[TRANSPORT_MOBILE_COLUMN] = this.mobile;
    //transSheetRowData[TRANSPORT_EMAIL_COLUMN] = this.eMail;
    //transSheetRowData[TRANSPORT_METHOD_COLUMN] = this.travelMethod;
    //transSheetRowData[TRANSPORT_NEEDS_RIDES_COLUMN] = this.needsRides;
    transSheetRowData[TRANSPORT_NEEDS_SHUTTLE_COLUMN] = this.needsShuttle;
    //transSheetRowData[TRANSPORT_COMING_FROM_COLUMN] = this.comingFrom;
    //transSheetRowData[TRANSPORT_ARRIVING_AT_COLUMN] = this.arrivingAt;
    //transSheetRowData[TRANSPORT_ARRIVAL_DATE_COLUMN] = this.flightArrivalDate;
    //transSheetRowData[TRANSPORT_ARRIVAL_TIME_COLUMN] = this.flightArrivalTime;
    //transSheetRowData[TRANSPORT_ARRIVAL_NUM_COLUMN] = this.flightArrivalNum;
    //transSheetRowData[TRANSPORT_ARRIVAL_NOTES_COLUMN] = this.flightArrivalNotes;
    //transSheetRowData[TRANSPORT_NEEDS_PICKUP_COLUMN] = this.needsPickUp;
    transSheetRowData[TRANSPORT_ARRIVAL_SHIFT_ENTERED_COLUMN] = (this.flightArrivalisShiftEntered === true) ? "Yes" : "";
    transSheetRowData[TRANSPORT_ARRIVAL_DRIVER_COLUMN] = this.flightArrivalDriver;
    transSheetRowData[TRANSPORT_ARRIVAL_PHONE_COLUMN] = this.flightArrivalPhone;
    //transSheetRowData[TRANSPORT_GOING_TO_COLUMN] = this.goingTo;
    //transSheetRowData[TRANSPORT_DEPART_FROM_COLUMN] = this.departForm;
    //transSheetRowData[TRANSPORT_DEPART_DATE_COLUMN] = this.flightDepartDate;
    //transSheetRowData[TRANSPORT_DEPART_TIME_COLUMN] = this.flightDepartTime;
    //transSheetRowData[TRANSPORT_DEPART_NUM_COLUMN] = this.flightDepartNum;
    //transSheetRowData[TRANSPORT_DEPART_NOTES_COLUMN] = this.flightDepartNotes;
    //transSheetRowData[TRANSPORT_NEEDS_DROPOFF_COLUMN] = this.needsDropOff;
    transSheetRowData[TRANSPORT_DEPART_SHIFT_ENTERED_COLUMN] = (this.flightDepartIsShiftEntered === true) ? "Yes" : "";
    transSheetRowData[TRANSPORT_DEPART_DRIVER_COLUMN] = this.flightDepartDriver;
    transSheetRowData[TRANSPORT_DEPART_PHONE_COLUMN] = this.flightDepartPhone;
    //transSheetRowData[TRANSPORT_HOUSING_HOST_COLUMN] = this.housingHost;
    //transSheetRowData[TRANSPORT_HOUSING_PHONE_COLUMN] = this.housingPhone;
    //transSheetRowData[TRANSPORT_HOUSING_ADDDRESS_COLUMN] = this.housingAddress;
    //transSheetRowData[TRANSPORT_HOUSING_EMAIL_COLUMN] = this.housingEmail;
  }

  /**
  *
  */
  this.updateRow = function(){
    this.updateRowData()
    var rowsData = [];
    rowsData.push(transSheetRowData)
    this.range.setValues(rowsData);
  }


  /**
  *
  */

  this.mergeToDoc = function (docBody, isArrival) {
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
    if(!isArrival) {
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
  this.mergeSubject = function(subjectTemplate, forArrival) {
    var subjectPickup = "Picking up";
    var subjectDropoff = "Dropping off";

    var retText = subjectTemplate.replace("<FirstName>", this.firstName);
    retText = retText.replace("<LastName>", this.lastName);
    retText = retText.replace("<ActName>", this.actName);
    var dirStr = subjectPickup
    if(!forArrival) {
      dirStr = subjectDropoff;
    }
    retText = retText.replace("<SubjectDirection>", dirStr);
    return retText;
  }

  /**
  * Test if the row has an address
  */
  this.hasHousingAddress = function(){
     return this.housingAddress !== null && this.housingAddress !== "";
  }

  this.hasArrival = function(){
    return this.flightArrivalNum !== null && this.flightArrivalNum !== "";
  }

  this.hasDeparture = function(){
    return this.flightDepartNum !== null && this.flightDepartNum !== "";
  }

  this.isValidForArrival = function(){
    return (this.hasHousingAddress() && this.hasArrival());
  }

  this.isValidForDeparture = function(){
    return this.hasHousingAddress() && this.hasDeparture();
  }

  this.toLog = function(){
    Logger.log("Act Name: " + this.actName);
    Logger.log("Number in act: " + this.numberInAct);
    Logger.log("Fist Name: " + this.firstName);
    Logger.log("lastName: " + this.lastName);
    Logger.log("mobile: " + this.mobile);
    Logger.log("eMail: " + this.eMail);
    Logger.log("travelMethod: " + this.travelMethod);
    Logger.log("NeedsRides: " + this.needsRides);
    if(this.isValidForArrival()){
      Logger.log("comingFrom: " + this.comingFrom);
      Logger.log("arrivingAt: " + this.arrivingAt);
      Logger.log("flightArrivalDate: " + Utilities.formatDate(this.flightArrivalDate, "PST", "MMM dd") );
      Logger.log("flightArrivalTime: " + Utilities.formatDate(this.flightArrivalTime, "PST", "hh:mm a") );
      Logger.log("flightArrivalNum: " + this.flightArrivalNum);
      Logger.log("flightArrivalNotes: " + this.flightArrivalNotes);
      Logger.log("needsPickUp: " + this.needsPickUp());
      Logger.log("flightArrivalisShiftEntered: " + this.flightArrivalisShiftEntered);
      Logger.log("flightArrivalDriver: " + this.flightArrivalDriver);
      Logger.log("flightArrivalPhone: " + this.flightArrivalPhone);
    }
    if(this.isValidForDeparture()){
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
}



function testPerformerRow(){
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.findPerformerByName("Alan Plotkin");
  if(null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if(null === errorMessage && !performerRow.isValidForArrival()) {
    errorMessage = Utilities.formatString('Transport Row Test:: There is currently no arrival data for %s', performerRow.toString());
  }
  if(null === errorMessage && !performerRow.isValidForDeparture()) {
    errorMessage = Utilities.formatString("Transport Row Test:: There is currently no departure data for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if(null === errorMessage && !performerRow.hasHousingAddress()) {
      errorMessage = Utilities.formatString("Transport Row Test: There is currently no housing available for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if(null === errorMessage) {
    Logger.log("Test Passed");
  }
  else {
    Logger.log(errorMessage);
  }

}


function testUpdateRow(){
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.getPerformerRow(1);
  if(null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if(null == errorMessage && !performerRow.hasHousingAddress()) {
      errorMessage = Utilities.formatString("Transport Row Test: There is currently no housing available for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if(null == errorMessage && !performerRow.isValidForArrival()) {
    errorMessage = Utilities.formatString('Transport Row Test:: There is currently no arrival data for %s', performerRow.toString());
  }
  if(null == errorMessage && !performerRow.isValidForDeparture) {
    errorMessage = Utilities.formatString("Transport Row Test:: There is currently no departure data for %s\n%s", performerRow.actName, performerRow.toString());
  }
  if(null == errorMessage) {
    performerRow.flightArrivalDriver = "NO BODY";
    performerRow.flightDepartDriver = "NO BODY";
    performerRow.updateRow();

    Logger.log("Test Passed");
  }
  else {
    Logger.log(errorMessage);
  }
}


function testMergeSubject(){
  var errorMessage = null;
  var performerSheet = new PerformerSheet();
  var performerRow = performerSheet.getPerformerRow(1);
  if(null == performerRow) {
    errorMessage = 'Transport Row Test:no data in row 1';
  }
  if(null == errorMessage) {
    Logger.log(performerRow.mergeSubject());
  }
}


function testNeedPickupAndDropoff(){
  var performerSheet = new PerformerSheet();

  var t = 0;
  while( t < performerSheet.rowCount) {
    var performerRow = new PerformerRow(performerSheet.getRowRange(t));

    Logger.log("Act: %s Performer: %s %s ", performerRow.actName, performerRow.firstName, performerRow.lastName);
    if( performerRow.needsPickUp()){
          Logger.log("Needs a Pickup");
      }
    else{
      Logger.log("Does not need Pickup");
      }

    if( performerRow.needsDropOff()){
       Logger.log("Needs Dropoff");
      }
    else{
       Logger.log("Does not need Dropoff");
      }

    t++;
  }
}




