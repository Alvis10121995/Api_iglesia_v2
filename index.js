//se verifica espacio del servidor
const os = require('os');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const Rutas = require('./routes/Routes')
const cron = require('node-cron');
const PORT =  process.env.port || 6000;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const freeMemoryBytes = os.freemem();
const totalMemoryBytes = os.totalmem();

const bytesToMegabytes = (bytes) => bytes / (1024 * 1024);
const bytesToGigabytes = (bytes) => bytes / (1024 * 1024 * 1024);

app.get('/disk',  (req, res) => {

  const totalb = bytesToMegabytes(freeMemoryBytes);
  const totalg = bytesToGigabytes(totalMemoryBytes);

  res.json({ "bytesToMegabytes":totalb,"bytesToGigabytes":totalg })
  
  


}

)
  




// se inicializa token
let token = process.env.token;

 
const apiIns =`https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=80&access_token=${token}`;
let SCRIP=`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

//fecha de vencimiento
let dia=15
let mes=2
let year=2024
let fechaExpiracion = new Date(`${year}-${mes}-${dia+1}`);

app.use(Rutas);


// retorna true si las fechas son iguales
const verificarfecha =(fecha1, fecha2)=> {
  return (
    fecha1.getFullYear() === fecha2.getFullYear()
     && fecha1.getMonth() === fecha2.getMonth()
     && fecha1.getDate() === fecha2.getDate()
  );
}





// Esta tarea se ejecutará todos los días a las 2:15 AM



cron.schedule('56 17 * * *', () => {
  console.log('Tarea para verificar Token', new Date());
  let fechaDeHoy = new Date();
      // se imprime fechas de pruebas
    
 
  if (verificarfecha(fechaDeHoy, fechaExpiracion)) {
    
      console.log('token proximo a vender, se debe actualizar');
     
       fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`)
       .then( e => e.json())
        // se muesta por consola nuevo token
       .then((e)=> {
        // se crea fecha temporal en segundo a parte de fecha de expiracion
        let fechatemp = Math.floor(fechaExpiracion.getTime()/ 1000);
        // se suman las fecha
            fechatemp = fechatemp+4752000;
            fechatemp = new Date(fechatemp*1000);
            console.log("Fecha nueva  de expiracion"+fechatemp)
            fechaExpiracion=fechatemp;
             
        // Se actualiza token
             return token=e.access_token
      
               
                } )
      
  
  
  } else {
    console.log('Token-vigente');
     
  }
});










app.get('/instagram', async (req, res) => {
  try {
    const respuesta = await fetch(apiIns);
    const datos = await respuesta.json();
       res.json(datos);
  } catch (error) {
     console.error('Error al consumir la API:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/',  (req, res) => {
  res.send("API iglesia v2")
});
 




const server = app.listen(PORT, () => {
  console.log("SERVIDOR EJECUTANDOSE", server.address().port);
});