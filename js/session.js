document.addEventListener('DOMContentLoaded',()=>{
    let getLocalSt = localStorage.getItem("session");
    let passName = location.href;
    console.log(getLocalSt,passName);
    if (getLocalSt && (passName.endsWith("signup.html") || passName.endsWith("signin.html"))) {
        location.href = "./accueil.html";
    }
    else if(!getLocalSt && passName.endsWith("dashboard.html")){
        location.href = "./index.html";
    }
});