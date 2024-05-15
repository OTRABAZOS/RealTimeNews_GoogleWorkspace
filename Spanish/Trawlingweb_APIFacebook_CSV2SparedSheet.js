/** Función principal:
 * Despues de ejecutar el JS Trawlingweb_APIFacebook_2CSV.js
 * Busca el CSV creado de la colección obtenido desde trawlingweb.com
 * Convierte el CSV en un archivo Spared Sheet de Google
 * Mueve el CSV a una carpeta RAW
 * Crea y/o actualiza el Spared Sheet en cada ejecución programada
 */
/** Instrucciones:
 * Este GS esta pensado para su ejecución en Google Apps Script y trabajar con carpetas de google Drive
 * debes configurar las const: const idCarpeta = //  const idCarpetaRaw = // const nombreHoja =
 */
function actualizarHojaDesdeCSV() {
  const idCarpeta = '11111111111111111'; // añade ID de la carpeta de Google Drive que hemos usado en Trawlingweb_APIFacebook_2CSV.js
  const idCarpetaRaw = '22222222222222222222222'; // ID de la carpeta RAW para mover los CSVs procesados
  const nombreHoja = 'EMPRESA_MARCA_Facebook'; // Nombre deseado para el Spreadsheet. ej: MiAgencia_Cocacola_Facebook
  
  const carpeta = DriveApp.getFolderById(idCarpeta);
  let hoja = buscarOcrearHoja(carpeta, nombreHoja); 
  const hojaActiva = hoja.getSheets()[0];
  let idsExistentes = obtenerIdsExistentes(hojaActiva);

  const archivosCSV = carpeta.getFilesByType(MimeType.CSV);
  let primeraIteracion = true;

  while (archivosCSV.hasNext()) {
    const archivoCSV = archivosCSV.next();
    const contenidoCSV = archivoCSV.getBlob().getDataAsString();
    const datosCSV = Utilities.parseCsv(contenidoCSV);

    // Verifica si el archivo CSV tiene contenido
    if (datosCSV.length <= 1 || !datosCSV[0]) {
      Logger.log("El archivo " + archivoCSV.getName() + " está vacío o no se pudo leer correctamente.");
      archivoCSV.moveTo(DriveApp.getFolderById(idCarpetaRaw));
      continue; // Salta al siguiente archivo CSV
    }

    if (primeraIteracion && idsExistentes.size === 0) {
      hojaActiva.appendRow(datosCSV[0]); // Asume que la primera fila del CSV son las cabeceras
      primeraIteracion = false; // Asegura que solo se añaden cabeceras una vez
    }

    const indiceId = datosCSV[0].indexOf("id");
    let noticiasInsertadas = 0;
    let duplicadosEncontrados = 0;

    if (indiceId === -1) {
      Logger.log("No se encontró la columna 'id' en " + archivoCSV.getName() + ". Asegúrate de que el CSV está formateado correctamente.");
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

    Logger.log(`Archivo ${archivoCSV.getName()}: Noticias nuevas insertadas: ${noticiasInsertadas}. Duplicados encontrados: ${duplicadosEncontrados}.`);

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
