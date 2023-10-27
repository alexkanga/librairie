import { log } from "node:console";
import http, { get } from "node:http";
import fs from "node:fs";
import path from "node:path";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("../index.html", "utf-8", (err, data) => {
      if (!err) {
        res.setHeader("content-type", "text/html");
        res.end(data);
      }
    });
    // on revoie les utilisateur apres les avoir transformés en chaine de caractère
  }

  else if (req.url === "/auth/register" && req.method === "POST") {
    let body = "";
    req.on("data", (data) => {     
      body += data;
    });
    req.on("end", () => {
      body = JSON.parse(body);

      if (body.password !== body.cpassword) {
        res.end("le password et le cpassword ne sont pas identiques !!");
      }

      let userData = fs.readFileSync(
        path.join("assets", "Data", "users.json"),
        { encoding: "UTF-8" }
      );
      userData = JSON.parse(userData);
      let verif = userData.find((user) => user.email === body.email);
      console.log(body);
      if (verif) {
        res.end("Désolé ce utilisateur exist déjà .");
      }
      else{
        let oldId = userData[userData.length-1]
        let id = oldId === undefined ? 1: parseInt(oldId.id)+1
        console.log(id);
        let data = {id:id, ...body};
        console.log(data);
        userData.push(data);
        fs.writeFileSync(
          path.join("assets", "Data", "users.json"),
          JSON.stringify(userData),
          { encoding: "UTF-8" }
        );
      res.end("Inscription effectué avec succes !!!");
      }
      
    });
  }
  else if(req.url === "/auth/login" && req.method === "POST"){
    let body = "";
    req.on("data", (data)=>{
      body += data;
      console.log(body);
    })
    req.on("end", () =>{
      body = JSON.parse(body);
      console.log(body);

      let userData = fs.readFileSync(
        path.join("assets", "Data", "users.json"),
        { encoding: "UTF-8" }
      );
        userData = JSON.parse(userData)
      let verify = userData.find((items) => items.email === body.email && items.password === body.password)
      if (verify) {
        const {email,name} = verify;
        console.log(email,name);
        let data = {status:true, email, name,id:verify.id, message:"Bienvenue vous êtes maintenant connecté"}
        res.end(JSON.stringify(data));  
      }
      else{
        let data = {status:false,message:"Email ou mot de passe incorrecte"}
        res.end(JSON.stringify(data));
      }
    });

  } else if (req.url.startsWith("/images") && req.method === "GET") {
    let receive = req.url.split("/");
    let dernierIndice = receive[receive.length - 1];
    let extension =
      dernierIndice.split(".")[dernierIndice.split(".").length - 1];
    //let path = `./assets/${dernierIndice}`;
    const path = "."+ req.url.replace("images", "images");
    let isExist = fs.existsSync(path);
    console.log(dernierIndice, extension, path, isExist);
    console.log(receive);

    if (isExist) {
      let data = fs.readFileSync(path);
      console.log(data);
      res.end(data);
    } else {
      res.end(null);
    }
  }
  else if (req.url.startsWith("/css") && req.method === "GET") {
    let receive = req.url.split("/");
    let dernierIndice = receive[receive.length - 1];
    let extension =
      dernierIndice.split(".")[dernierIndice.split(".").length - 1];
    //let path = `./assets/${dernierIndice}`;
    const path = "."+ req.url.replace("css", "css");
    let isExist = fs.existsSync(path);
    console.log(dernierIndice, extension, path, isExist);
    console.log(receive);

    if (isExist) {
      let data = fs.readFileSync(path);
      console.log(data);
      res.end(data);
    } else {
      res.end(null);
    }
  }
  else if (req.url.startsWith("/js") && req.method === "GET") {
    let receive = req.url.split("/");
    let dernierIndice = receive[receive.length - 1];
    let extension =
      dernierIndice.split(".")[dernierIndice.split(".").length - 1];
    //let path = `./assets/${dernierIndice}`;
    const path = "."+ req.url.replace("js", "js");
    let isExist = fs.existsSync(path);
    console.log(dernierIndice, extension, path, isExist);
    console.log(receive);

    if (isExist) {
      let data = fs.readFileSync(path);
      console.log(data);
      res.end(data);
    } else {
      res.end(null);
    }
  }
  else {
    console.log("ok");
    res.end("ok");
  }
  
}); 

server.listen(process.env.PORT || 4000, () => {
  console.log("server running");
});
