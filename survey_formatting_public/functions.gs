function doChanges() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetReqs = ss.getSheetByName('Input');
  var lastRow = sheetReqs.getLastRow()-1;
  var lastCol = sheetReqs.getLastColumn();
  var reqRange = sheetReqs.getRange(2,1,lastRow,lastCol);
  var reqVals = reqRange.getValues();
  
  var toDos = [];
  var rowNum = 2;
  for (i in reqVals) {
    if (reqVals[i][14] != true) {
        toDos.push(reqVals[i]);
        Logger.log(reqVals[i]);
        var rangeToSet = sheetReqs.getRange(rowNum,15)
        rangeToSet.setValue(true);
    }
    rowNum++
  }
  Logger.log(toDos.length);

  var sheetOutp = ss.getSheetByName('Output');
  var lastOutpRow = sheetOutp.getLastRow();
  var lastChangeRow = sheetOutp.getRange(lastOutpRow,1).getValue()+1;
  var firstChangeRow = lastOutpRow+1;
  for (dos in toDos) {
    var outpRow = sheetOutp.getRange(firstChangeRow,1,1,6);

    if (toDos[dos][2] == 'An employee was assigned to a different team.') {
      var nameN = toDos[dos][7].toString().toLowerCase();
      var teamN = '=INDEX(Teams!$A:$C,MATCH("'+toDos[dos][8]+'",Teams!$C:$C,0),1)';
      var dateN = toDos[dos][9];
      var leaverN = false;
    } else if (toDos[dos][2] == 'An employee left the company or moved to another business function.') {
      var nameN = toDos[dos][6].toString().toLowerCase();
      var teamN = '';
      var dateN = '';
      var leaverN = true;
    } else if (toDos[dos][2] == 'A new hire has joined my team.') {
      var nameN = toDos[dos][3].toString().toLowerCase();
      var teamN = '=INDEX(Teams!$A:$C,MATCH("'+toDos[dos][4]+'",Teams!$C:$C,0),1)';
      var dateN = toDos[dos][5];
      var leaverN = false;
    }


    var modifiedN = new Date(Date.now());

    var lastChangeRows = [[lastChangeRow,nameN,teamN,dateN,leaverN,modifiedN]];
    outpRow.setValues(lastChangeRows);
    lastChangeRow++
    firstChangeRow++
  }

  
  Logger.log('done')

}

function hardCodeChanges() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetOutp = ss.getSheetByName('Output');
  sheetOutp.getRange('C:C').copyTo(sheetOutp.getRange('C:C'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
}