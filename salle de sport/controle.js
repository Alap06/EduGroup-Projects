// JavaScript Document
//Partie 1 
function Verification_p1() {
    var ch=document.getElementById("user").Value;
    var mp=document.getElementById("pass").Value;
     // Vérification de l'adresse e-mail (exemple simple)//
     
     if (!(ch.IndexOf("@")<ch.lastIndexOf(".")) ||  ch.IndexOf("@")==-1 || ch.length<10  ) {
         alert('Adresse e-mail invalide');
         return false;
     }
     if (mp.length<6) {
        alert('Mot de passe invalide');
         return false;
     }
}

function Verification_p2() {

    var mp=document.getElementById("pass").Value;
    let cp =document.getElementById("cpass").value;
    let em =document.getElementById("ema").value;
    var na =document.f2.user.value;
     // Vérification de l'adresse e-mail (exemple simple)//
     /*if (na.length<3) {
        alert('username et invalide');
         return false;
     }
     if (!(em.IndexOf("@")<em.lastIndexOf(".")) ||  em.IndexOf("@")==-1 || em.length<10  ) {
         alert('Adresse e-mail invalide');
         return false;
     }
     if (mp.length<6) {
        alert('Mot de passe invalide');
         return false;
     }
     if (mp!=cp) {
        alert('confirmation Mot de passe invalide');
         return false;
     }
     
}
