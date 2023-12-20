require('dotenv').config();

 // controllers.js solo local
const youtube = async (req, res) => {
    try {
        const respuesta = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.key2}&channelId=${process.env.id2}&part=snippet,id&order=date&maxResults=20`);
        const datos = await respuesta.json();
           res.json(datos);
      } catch (error) {
         console.error('Error al consumir la API:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
  };
  


  
 




 


  module.exports = { youtube };
  