import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
//TOKEN PARA VER REGISTROS
let tokenGetRegistros=   "G8TB56ERJBC1513GFPQIGNAGFJA97452A";
//TOKEN PARA REGISTRAR REGISTROS
let tokenPostRegistros = "Y5ETRAVH5543AHBJLOPQAZ549BMSDVJ4K";

const app = express();
app.use(bodyParser.json());

const readData = () => {
 const data = fs.readFileSync("./db.json"); 
 return JSON.parse(data);  
}
http://localhost:5000/
app.get("/",(req,res) => {
 const data = readData();   
 res.send("API--V1, HECHA EN NODEJS");
 
});
//http://localhost:5000/registros
//TRAE TODOS LOS REGISTROS
//http://localhost:5000/registros/token/G8TB56ERJBC1513GFPQIGNAGFJA97452A
app.get("/registros/token/:token",(req,res) => {
    const data = readData();  
    let token = req.params.token; 
    token = token.toString();
    //compararCadenas(token,);
    if(token.length == 33){

        //let c0 = token.charAt(32);
        //let c1 = tokenGetRegistros.charAt(32);
        let b =  compararCadenas(token,tokenGetRegistros);
        //res.send(token + "  " + tokenGetRegistros + " POSICION 32: " + c0 + "   " + c1 + " CONDICION: " + b + " LONGITUD: " + token.length);
        if(b == true){
         res.json(data.registros);
        }else{
         res.send("REGISTROS NO ENCONTRADOS");  
        }    
    }else{
      res.send("REGISTROS NO ENCONTRADOS");  
    }

});
/*
 {
   "name":"TEXTO"
 }
*/
//http://localhost:5000/registros/registrar/token/Y5ETRAVH5543AHBJLOPQAZ549BMSDVJ4K
app.post("/registros/registrar/token/:token",(req,res) => {
     
  let token = req.params.token;
  token = token.toString();
  
  if(token.length == 33){

   let b = compararCadenas(token,tokenPostRegistros);

   if(b == true){
    const body = req.body;
    const name = body.name;
    const data = readData();
    const id = data.registros.length + 1;
    const nuevoRegistro = {
     "id": id,
     "name":name
    }
    data.registros.push(nuevoRegistro);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("VALOR DE LA CONDICION: " + b + " name: " + name + " ID NUEVO: " + id); 
 
   }else{
    res.send("NO SE PUDO REALIZAR EL PROCESO"); 
   }
  

  }else{
   res.send("NO SE PUDO REALIZAR EL PROCESO"); 
  }

 

});

//http://localhost:5000/registros
//TRAE UN REGISTRO EN PARTICULAR
app.get("/registros/id/:id",(req,res) => {
    const data = readData();   
    const id = parseInt(req.params.id);
    
    res.send("EL ID ES:" + id );
    
});



app.listen(5000, () => {
    console.log("Servidor escuchando por el, puerto 5000");
});

function compararCadenas(cadena1,cadena2){
 let c1;
 let c2;
 for (var i = 0; i < cadena1.length; i++) {
  c1=cadena1.charAt(i);
  c2=cadena2.charAt(i);
  if(c1==c2){

  }else{
    return false;
  }
 }

 return true;

}