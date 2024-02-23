/**
 * Función principal para realizar la llamada a la API, procesar los datos de la última hora y guardarlos como CSV.
 */
function llamarAPIYProcesarDatos() {
  // Calcula timestamps para definir el rango de la última hora
  var ahora = new Date();
  var tsInicio = ahora.getTime() - (60 * 60 * 1000); // 1 hora atrás en milisegundos
  var tsFin = ahora.getTime(); // Tiempo actual en milisegundos

  var urlBase = `https://api.trawlingweb.com/?token=TOKEN_AQUI&q=TERM_AQUI&order=desc&ts=${tsInicio}&tsi=${tsFin}`; 
  /**
  *TOKEN_AQUI: Usa tu "playground" en TrawlingWeb para obtener el token y configurar la URL de búsqueda.
  * TERM_AQUI: ejemplo1. Para buscar "Cocacola" sin espacios, ingresa: q=cocacola. ejemplo2. Para buscar "Coca Cola" con un espacio, utiliza: q=%22Coca%20Cola%22, donde %22 representa comillas para términos exactos y %20 es el espacio.
  */

  var seguirLlamando = true;
  var idsProcesados = {}; // Objeto para llevar registro de los IDs ya procesados.
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

      Logger.log("Elementos únicos procesados: " + elementosUnicos);

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
  var nombreArchivo = "Datos_Completos_" + fechaHoy + ".csv";
  var idCarpeta = 'ID_CARPETA_AQUI'; // ID de la carpeta donde se buscarán los CSVs y se guardará la hoja de calculo
  guardarCsvEnDrive(csvTotal, nombreArchivo, idCarpeta);
}

/**
 * Convierte un array de objetos JSON a un string en formato CSV, opcionalmente incluyendo la cabecera.
 * @param {Object[]} json Array de objetos a convertir.
 * @param {boolean} incluirCabecera Indica si se debe incluir la cabecera CSV.
 * @return {string} String en formato CSV.
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
 * Formatea una fecha JavaScript a un string en el formato ddmmaaaa.
 * @param {Date} date Fecha a formatear.
 * @return {string} Fecha en formato ddmmaaaa.
 */
function formatDate(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0.
  var yyyy = date.getFullYear();
  var hh = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  return dd + mm + yyyy + "_" + hh + min;
}

/**
 * Guarda el string CSV en un archivo dentro de una carpeta específica en Google Drive.
 * @param {string} csv Contenido en formato CSV a guardar.
 * @param {string} nombreArchivo Nombre del archivo CSV a crear.
 * @param {string} idCarpeta ID de la carpeta de Drive donde se guardará el archivo.
 */
function guardarCsvEnDrive(csv, nombreArchivo, idCarpeta) {
  try {
    var blob = Utilities.newBlob(csv, 'text/csv', nombreArchivo);
    var carpeta = DriveApp.getFolderById(idCarpeta);
    carpeta.createFile(blob);
    Logger.log("Archivo CSV guardado con el nombre: " + nombreArchivo);
  } catch (e) {
    Logger.log("Error al guardar el archivo CSV en Drive: " + e.toString());
  }
}

/**
 * Crea un disparador temporal que ejecuta 'llamarAPIYProcesarDatos' cada hora.
 */
function crearDisparadorPorHora() {
  // Elimina cualquier disparador existente para evitar duplicaciones
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'llamarAPIYProcesarDatos') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Crea un nuevo disparador para ejecutar la función cada hora
  ScriptApp.newTrigger('llamarAPIYProcesarDatos')
    .timeBased()
    .everyHours(1)
    .create();
}
