/*global PerformerSheet: false */
/*global Logger: false */

function PerformerRowToPickupString(performerRow)
{
  var message = "Act Name: " + performerRow.actName;
  if(performerRow.numberInAct > 1){
    message += " which has " + performerRow.numberInAct + "people in it.";
  }
  message += "\n"
  message += "\tPerformer: " + performerRow.firstName + " " + performerRow.lastName + "\n";
  message += "\t\tmobile: " + performerRow.mobile + "\n";
  message += "\t\teMail: " + performerRow.eMail + "\n";

  message += "Performer's Housing information\n";
  message += "\tHost: " + performerRow.housingHost + "\n";
  message += "\tPhone: " + performerRow.housingPhone + "\n";
  message += "\tAddress: " + performerRow.housingAddress + "\n";
  message += "\tEmail: " + performerRow.housingEmail + "\n\n\n";
  return message;
}

  var weeks = [{start:Date(2017, 03, 14 ), end:Date(2017, 03, 20)},
               {start:Date(2017, 03, 21), end:Date(2017, 03, 27)},
               {start:Date(2017, 03, 28), end:Date(2016, 04, 03)},
               {start:Date(2017, 04, 04), end:Date(2017, 04, 11)},
               {start:Date(2017, 04, 12), end:Date(2017, 04, 30)}
              ]

function getCurrentFestivalWeek()
{
  var currentWeek = 0;
  var today = new Date();

  for(var i = 0 ; i < weeks.length && currentWeek == 0 ; ++i){
    if(weeks[i].start <= today && today <= weeks[i].end){
      currentWeek = i + 1;
      }
    }
  return currentWeek;
}



function WeeklyShuttleList()
{
  var sheet = new PerformerSheet();

  var message = "The Performer needing shuttle rides for week\n";
  // week number is given has 1 based and needs to be 0 based
  for(var i = 0 ; i < sheet.rowCount ; ++i){
    var performerRow = sheet.getPerformerRow(i);
    if(performerRow.needsShuttle.toUpperCase() == "NEEDS"){
         message += PerformerRowToPickupString(performerRow);
      }
    }
  return message;
}


function emailWeek()
{
  Logger.log(WeeklyShuttleList(getCurrentFestivalWeek()));
}