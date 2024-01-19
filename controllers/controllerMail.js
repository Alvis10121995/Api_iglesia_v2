
const fs = require('fs');
const transporter = require('../conect/conexion')
require('dotenv').config();
 


const data = (req , res)=>{
    const { nombre, apellido } = req.body;
    console.log(" "+nombre+" "+apellido)
    res.json("datos enviados")

}


const upimg = async function  (req, res, next){
   
     
  try {
    const image = req.file;
    const { nombre, apellido, correo } = req.body;
  


  const mailOptions = {
    // credenciales
    from:  process.env.correodesalida,
    to:   process.env.correodestino,
    subject: 'informacion de cliente',
    text: ` 
      Hola, información de formulario, API.
      
     Nombre:  ${nombre} 
     Apellido: ${apellido} 
      Correo:  ${correo}
      
      Comprobate de pago
      `,
        //parte para manejar archivos adjuntados
    attachments: [
      {
        filename: 'comprobante.jpg',
        path: req.file.path,
      },
    ],


  };
 










    
  
      
  
   
      // manejo de error
      const info = await transporter.sendMail(mailOptions);
      console.log(image)
  
  
  
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Imagen eliminda');
        }
      });
       
  
      res.json(info);
  
    } catch (error) {
       console.log("find error",error)
       res.json("error en sessión de envio de correo", error)
    }
  
   
  
  
  
   
  

}






module.exports = {upimg}