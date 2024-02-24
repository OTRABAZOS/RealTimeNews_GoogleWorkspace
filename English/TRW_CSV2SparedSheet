// Updates or creates a Spreadsheet to update data coming from the Trawlingweb News API
function actualizarHojaDesdeCSV() {
  const idCarpeta = 'YOUR_FOLDER_ID_HERE'; // ID of the folder where the CSVs will be searched for and the spreadsheet will be saved
  const idCarpetaRaw = 'YOUR_RAW_FOLDER_ID'; // ID of the RAW folder to move processed CSVs to
  const nombreHoja = 'AGENCY_BRAND'; // Desired name for the Spreadsheet. e.g., MyAgency_CocaCola
  
  const carpeta = DriveApp.getFolderById(idCarpeta);
  let hoja = buscarOcrearHoja(carpeta, nombreHoja); // Adjustment to handle sheet creation without the need for an additional parameter
  const hojaActiva = hoja.getSheets()[0];
  let idsExistentes = obtenerIdsExistentes(hojaActiva);

  const archivosCSV = carpeta.getFilesByType(MimeType.CSV);
  let primeraIteracion = true;

  while (archivosCSV.hasNext()) {
    const archivoCSV = archivosCSV.next();
    const contenidoCSV = archivoCSV.getBlob().getDataAsString();
    const datosCSV = Utilities.parseCsv(contenidoCSV);

    // Checks if the CSV file has content
    if (datosCSV.length <= 1 || !datosCSV[0]) {
      Logger.log("The file " + archivoCSV.getName() + " is empty or could not be read correctly.");
      archivoCSV.moveTo(DriveApp.getFolderById(idCarpetaRaw));
      continue; // Skips to the next CSV file
    }

    if (primeraIteracion && idsExistentes.size === 0) {
      hojaActiva.appendRow(datosCSV[0]); // Assumes the first row of the CSV are headers
      primeraIteracion = false; // Ensures that headers are only added once
    }

    const indiceId = datosCSV[0].indexOf("id");
    let noticiasInsertadas = 0;
    let duplicadosEncontrados = 0;

    if (indiceId === -1) {
      Logger.log("Column 'id' not found in " + archivoCSV.getName() + ". Ensure the CSV is formatted correctly.");
      archivoCSV.moveTo(DriveApp.getFolderById(idCarpetaRaw));
      continue;
    }

    for (let i = 1; i < datosCSV.length; i++) {
      const fila = datosCSV[i];
      const idNoticia = fila[indiceId];
      if (!idsExistentes.has(idNoticia)) {
        hojaActiva.appendRow(fila);
        idsExistentes.add(idNoticia);
        noticiasInsertadas++;
      } else {
        duplicadosEncontrados++;
      }
    }

    Logger.log(`File ${archivoCSV.getName()}: New news inserted: ${noticiasInsertadas}. Duplicates found: ${duplicadosEncontrados}.`);

    archivoCSV.moveTo(DriveApp.getFolderById(idCarpetaRaw));
  }
}

function buscarOcrearHoja(carpeta, nombreHoja) {
  const spreadsheets = carpeta.getFilesByType(MimeType.GOOGLE_SHEETS);
  while (spreadsheets.hasNext()) {
    const spreadsheet = spreadsheets.next();
    if (spreadsheet.getName() === nombreHoja) {
      return SpreadsheetApp.openById(spreadsheet.getId());
    }
  }
    const hoja = SpreadsheetApp.create(nombreHoja);
  const archivoNuevo = DriveApp.getFileById(hoja.getId());
  archivoNuevo.moveTo(carpeta);
  return hoja;
}

function obtenerIdsExistentes(hojaActiva) {
  const rango = hojaActiva.getDataRange();
  const valores = rango.getValues();
  const indiceId = valores[0].indexOf("id");
  const idsExistentes = new Set();

  if (indiceId !== -1) {
    for (let i = 1; i < valores.length; i++) {
      idsExistentes.add(valores[i][indiceId]);
    }
  }

  return idsExistentes;
}
