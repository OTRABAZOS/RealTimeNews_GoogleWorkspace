/**
 * Main function to make the API call, process data from the last hour, and save it as CSV.
 */
function llamarAPIYProcesarDatos() {
  // Calculate timestamps to define the range of the last hour
  var ahora = new Date();
  var tsInicio = ahora.getTime() - (60 * 60 * 1000); // 1 hour ago in milliseconds
  var tsFin = ahora.getTime(); // Current time in milliseconds

  var urlBase = `https://api.trawlingweb.com/?token=TOKEN_HERE&q=TERM_HERE&order=desc&ts=${tsInicio}&tsi=${tsFin}`; 
  /**
  *TOKEN_HERE: Use your "playground" in TrawlingWeb to obtain the token and configure the search URL.
  * TERM_HERE: example1. To search for "Cocacola" without spaces, enter: q=cocacola. example2. To search for "Coca Cola" with a space, use: q=%22Coca%20Cola%22, where %22 represents quotes for exact terms and %20 is the space.
  */

  var seguirLlamando = true;
  var idsProcesados = {}; // Object to keep track of the already processed IDs.
  var csvTotal = "";
  var elementosUnicos = 0;

  while (seguirLlamando) {
    var respuesta = UrlFetchApp.fetch(urlBase, {'muteHttpExceptions': true});
    var json = JSON.parse(respuesta.getContentText());

    if ('response' in json && 'data' in json.response && json.response.data.length > 0) {
      json.response.data.forEach((elemento) => {
        if (!idsProcesados[elemento.id]) {
          var incluirCabecera = elementosUnicos === 0;
          csvTotal += convertirJsonACsv([elemento], incluirCabecera);
          idsProcesados[elemento.id] = true;
          elementosUnicos++;
        }
      });

      Logger.log("Unique elements processed: " + elementosUnicos);

      if ((json.response.restResults && json.response.restResults > 0) && 
          (json.response.requestLeft && json.response.requestLeft > 0)) {
        if (json.response.hasOwnProperty('next') && json.response.next) {
          urlBase = json.response.next;
        } else {
          seguirLlamando = false;
        }
      } else {
        seguirLlamando = false;
      }
    } else {
      seguirLlamando = false;
    }
  }

  var fechaHoy = formatDate(new Date());
  var nombreArchivo = "Complete_Data_" + fechaHoy + ".csv";
  var idCarpeta = 'FOLDER_ID_HERE'; // ID of the folder where CSVs will be searched for and the spreadsheet will be saved
  guardarCsvEnDrive(csvTotal, nombreArchivo, idCarpeta);
}

/**
 * Converts an array of JSON objects into a CSV string, optionally including the header.
 * @param {Object[]} json Array of objects to convert.
 * @param {boolean} incluirCabecera Indicates whether to include the CSV header.
 * @return {string} String in CSV format.
 */
function convertirJsonACsv(json, incluirCabecera) {
  var csv = incluirCabecera ? Object.keys(json[0]).join(",") + "\r\n" : "";

  json.forEach((obj) => {
    var linea = Object.values(obj).map((valor) => `"${valor.toString().replace(/"/g, '""')}"`).join(",");
    csv += linea + "\r\n";
  });

  return csv;
}

/**
 * Formats a JavaScript date into a string in the ddmmyyyy format.
 * @param {Date} date Date to format.
 * @return {string} Date in ddmmyyyy format.
 */
function formatDate(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0.
  var yyyy = date.getFullYear();
  var hh = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  return dd + mm + yyyy + "_" + hh + min;
}

/**
 * Saves the CSV string to a file in a specific folder on Google Drive.
 * @param {string} csv CSV format content to save.
 * @param {string} nombreArchivo Name of the CSV file to create.
 * @param {string} idCarpeta Drive folder ID where the file will be saved.
 */
function guardarCsvEnDrive(csv, nombreArchivo, idCarpeta) {
  try {
    var blob = Utilities.newBlob(csv, 'text/csv', nombreArchivo);
    var carpeta = DriveApp.getFolderById(idCarpeta);
    carpeta.createFile(blob);
    Logger.log("CSV file saved with the name: " + nombreArchivo);
  } catch (e) {
    Logger.log("Error saving CSV file to Drive: " + e.toString());
  }
}

/**
 * Creates a time-driven trigger that executes 'llamarAPIYProcesarDatos' every hour.
 */
function crearDisparadorPorHora() {
  // Removes any existing triggers to avoid duplication
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'llamarAPIYProcesarDatos') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Creates a new trigger to run the function every hour
  ScriptApp.newTrigger('llamarAPIYProcesarDatos')
    .timeBased()
    .everyHours(1)
    .create();
}
