# Obetbner Noticias de Interés y Almacenarlas en Google Drive

Este repositorio está diseñado para expertos en marketing y comunicación que necesitan gestionar noticias sobre sus clientes de manera eficaz, sin requerir amplios conocimientos en gestión de datos. Solo necesitas tener una cuenta de Google y conocimientos básicos de Excel para comenzar.

## Público Objetivo

Dirigido a community managers, expertos en marketing y comunicación de agencias de tamaño mediano y pequeño, que buscan cierta independencia en el proceso de obtención y análisis de noticias.

## Características

- **Obtención de Noticias y Opiniones**: Conecta con el proveedor ETL TrawlingWeb para recuperar noticias sobre empresas, marcas o temas de interés para tus clientes y tus estrategias.
- **Gestión desde Google**: Almacena los resultados en carpetas y archivos dentro de Google Drive, facilitando su acceso y procesamiento.
- **Apps Script**: Utiliza esta herramienta de Google para ejecutar todo el proceso en pocos minutos, de manera sencilla y eficiente.

## Cómo Usar

Sigue estos pasos para utilizar los conectores de este repositorio:

1. Regístrate en el proveedor de noticias ETL en [TrawlingWeb](https://dashboard.trawlingweb.com/register).
2. Accede a [Apps Script de Google](https://www.google.com/script/start/) y prepárate para copiar y pegar el código proporcionado.
3. En Google Drive, crea una carpeta con el nombre de tu preferencia que identifique fácilmente con tu cliente o tema de interés.
4. Dentro de esta carpeta, crea otra llamada `RAW`.
5. Selecciona el script [`TRW_NewsMedia2CSV`](https://github.com/OTRABAZOS/MonitoreoMedios-para-Google-WorkSpace/blob/main/TRW_NewsMedia2CSV) disponible en este repositorio. Dentro encontrarás comentarios útiles (iniciados con `//`) para obtener la clave Token necesaria y cómo usar términos de búsqueda específicos.
6. Crea un nuevo proyecto en Apps Script de Google, nómbralo a tu gusto, copia el código del script, guárdalo y ejecútalo. Esto almacenará las noticias en tu carpeta de Google Drive en formato CSV.
7. Sin cerrar el proyecto creado, abre un nuevo proyecto en Apps Script de Google para el script [`TRW_CSV2SpreadSheet`](https://github.com/OTRABAZOS/MonitoreoMedios-para-Google-WorkSpace/blob/main/TRW_CSV2SparedSheet), cópialo, pégalo, guárdalo y ejecútalo. Esto convertirá los CSV en hojas de cálculo para facilitar su gestión.

### Notas

- Al finalizar, tendrás dos proyectos en Apps Script: uno que almacena las noticias en CSV y otro que las actualiza en una hoja de cálculo, todo dentro de la carpeta creada en Google Drive.
- Considera usar la función "Activadores" en cada proyecto para ejecutar los scripts automáticamente cada 12 o 24 horas, automatizando así todo el proceso.

### Prerrequisitos

- Una cuenta de Google (personal o profesional).
- Conocimientos básicos de Google Drive.
- Una cuenta gratuita en [TrawlingWeb](https://dashboard.trawlingweb.com/register).

## ¿Qué son los ETL?

ETL son las siglas de *Extract, Transform, Load* (Extracción, Transformación y Carga), un proceso que describe la obtención de datos de una o más fuentes, su transformación para cumplir con ciertos criterios o formatos, y su carga en un sistema de destino para análisis o almacenamiento. Las soluciones de este repositorio están diseñadas para facilitar estas tareas con diversas fuentes de datos, simplificando la gestión de datos y permitiéndote acceder a información valiosa de manera rápida y eficiente.

## Sobre TrawlingWeb

TrawlingWeb es una empresa especializada en la captura de datos y contenidos, ofreciéndote acceso a contenidos capturados en tiempo real, incluyendo noticias de 18 millones de fuentes de información y conversaciones en redes sociales. Proveemos las herramientas necesarias para que la información relevante siempre esté a tu disposición, optimizando tus estrategias de análisis y toma de decisiones.
