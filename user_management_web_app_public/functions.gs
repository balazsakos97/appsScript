function doGet() {
  const html = HtmlService.createTemplateFromFile('index');
  return html.evaluate().setTitle('Team Assignment').setFaviconUrl('https:.png');
}

function require(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function returnData(country, team, vertical) {
  var ss = SpreadsheetApp.openById('ID');
  var sheet = ss.getSheetByName('People');
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var sheetData1 = sheet.getRange(1,1,lastRow,lastCol).getDisplayValues();
  var sheetData = sheetData1.slice(1);
  var headerRow = sheetData1[0];
  if (country == '') {
    var filteredData1 = sheetData;
  } else {
    var filteredData1 = sheetData.filter(getDataValueC,country);
  }
  if (team == '') {
    var filteredData2 = filteredData1;
  } else {
    var filteredData2 = filteredData1.filter(getDataValueT,team);
  }
  if (vertical == '') {
    var filteredData = filteredData2;
  } else {
    var filteredData = filteredData2.filter(getDataValueV,vertical);
  }
  
  /*Logger.log(filteredData)*/

  var table = '<table id="table_insert">\n';
  table += '\t<tr>'
  for (f in headerRow) {
      table += '<th>'+headerRow[f]+'</th>'
    }
  table += '</tr>\n'
  for (i in filteredData) {
    table += '\t<tr>'
    for (j in filteredData[i]) {
      table += '<td>'+filteredData[i][j]+'</td>'
    }
    table += '</tr>\n'
  };
  table += '</table>';

  return HtmlService.createHtmlOutput(table).getContent();
}

function getDataValueC(array) {
  return array[3] == this
}
function getDataValueT(array) {
  return array[2] == this
}
function getDataValueV(array) {
  return array[1] == this
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function dropDownOptionsCountry() {
  var ss = SpreadsheetApp.openById('ID');
  var sheet = ss.getSheetByName('People');
  var lastRow = sheet.getLastRow();
  var valuesCountry1 = sheet.getRange(2,4,lastRow,1).getValues();
  var valuesCountry = [];
  for (i in valuesCountry1) {
    valuesCountry.push(valuesCountry1[i][0]);
  }
  var uniqueValues = valuesCountry.filter(onlyUnique);
  var dropDown = '';
  for (i in uniqueValues) {
    dropDown += '\t\t\t\t<option value="'+uniqueValues[i]+'">'+uniqueValues[i]+'</option>'
  };
  return HtmlService.createHtmlOutput(dropDown).getContent();
}

function dropDownOptionsTeam() {
  var ss = SpreadsheetApp.openById('ID');
  var sheet = ss.getSheetByName('People');
  var lastRow = sheet.getLastRow();
  var values1 = sheet.getRange(2,3,lastRow,1).getValues();
  var values = [];
  for (i in values1) {
    values.push(values1[i][0]);
  }
  var uniqueValues = values.filter(onlyUnique);
  uniqueValues = uniqueValues.reverse();
  var dropDown = '';
  for (i in uniqueValues) {
    dropDown += '\t\t\t\t<option value="'+uniqueValues[i]+'">'+uniqueValues[i]+'</option>'
  };
  return HtmlService.createHtmlOutput(dropDown).getContent();
}

function dropDownOptionsVertical() {
  var ss = SpreadsheetApp.openById('ID');
  var sheet = ss.getSheetByName('People');
  var lastRow = sheet.getLastRow();
  var values1 = sheet.getRange(2,2,lastRow,1).getValues();
  var values = [];
  for (i in values1) {
    values.push(values1[i][0]);
  }
  var uniqueValues = values.filter(onlyUnique);
  uniqueValues = uniqueValues.reverse();
  var dropDown = '';
  for (i in uniqueValues) {
    dropDown += '\t\t\t\t<option value="'+uniqueValues[i]+'">'+uniqueValues[i]+'</option>'
  };
  return HtmlService.createHtmlOutput(dropDown).getContent();
}