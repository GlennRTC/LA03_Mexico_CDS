# LA03_Mexico_CDS

Este proyecto contiene varios archivos XML y JavaScript que forman parte de un sistema de integración de datos. A continuación se describe la estructura del proyecto y el propósito de cada archivo.

## Estructura del Proyecto 
Default Group.xml in_SOAP_JSON.xml SendEmails.xml ToCDS_SourceTransformer.js ToCDS.xml


### Archivos

#### `Default Group.xml`
Este archivo contiene configuraciones y scripts relacionados con el grupo de canales por defecto. Incluye transformadores, scripts de despliegue y propiedades de los canales.

#### `in_SOAP_JSON.xml`
Este archivo define un canal que convierte mensajes SOAP a JSON. Contiene configuraciones de conexión, scripts de transformación y propiedades del canal.

#### `SendEmails.xml`
Este archivo contiene configuraciones y scripts para el envío de correos electrónicos. Incluye plantillas de código y propiedades del canal.

#### `ToCDS_SourceTransformer.js`
Este archivo JavaScript contiene lógica de transformación de mensajes para el canal `ToCDS`. Extrae y transforma datos de los mensajes entrantes antes de enviarlos a un destino.

Ejemplo de código:
```javascript
var episodeId = msg['episodes'][0]['episodeId'];
var empresa = msg['episodes'][0]['attributeWithValues'][1]['value']
channelMap.put('empresa', empresa);

var jsonData = JSON.parse(connectorMessage.getRawData());
if (msg['episodes'][0]['episodeDate'] != null ){
  var firstEpisode = jsonData.episodes[0];
}else{
    var firstEpisode = jsonData.episodes[1];
}

// Buscar el atributo con name "PACIENTE"
var pacienteAttribute = firstEpisode.attributeWithValues.find(attr => attr.name === "PACIENTE");

// Obtener el valor del atributo
var pacienteValue = pacienteAttribute ? pacienteAttribute.value : null;
channelMap.put('pacienteValue',pacienteValue)
channelMap.put('episodeId',episodeId)

var json = {}
json.caseId = msg['caseId'];
json.uuidCDS = UUIDGenerator.getUUID();
json.PID = pacienteValue;
json.orderID = episodeId;

msg['senderReference'] = JSON.stringify(json);
```

Este archivo define el canal ToCDS, incluyendo configuraciones de conexión, transformadores y scripts de procesamiento. Contiene múltiples secciones con identificadores y propiedades específicas para el canal.

## Uso
Para utilizar este proyecto, asegúrese de tener configurado el entorno adecuado para ejecutar los scripts y procesar los mensajes según las configuraciones definidas en los archivos XML y JavaScript.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, cree un pull request o abra un issue para discutir cualquier cambio que desee realizar.
