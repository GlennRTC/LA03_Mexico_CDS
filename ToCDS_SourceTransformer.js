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
/*
"senderReference" : "{\"caseId\":\"1010851024_443239094\",
\"uuidCDS\":\"118cdf2b-6513-4241-8ea1-1bf2d5d4c265\",
\"site\":\"900098476\",
\"PID\":\"RC\",
\"PID2\":\"1010851024\",\"PID3\":\"443239094\",\"episodeDate\":\"20230821142956\",\"SampleID\":\"\",\"FechaRegistroOrden\":\"20230821142956\",\"MedicoPeticionarioID\":\"5000\",\"SedeSynlabPresentacion\":\"443\",\"CodigoPlanCliente\":\"14050\",\"NIT\":\"900098476\",\"RazonSocial\":\"FUNDACION HOSPITAL INFANTIL UNIVERSITARIO DE SAN JOSE\",\"EdadPaciente\":1,\"PatientSex\":\"F\"}",
 

*/

msg['senderReference'] = JSON.stringify(json);