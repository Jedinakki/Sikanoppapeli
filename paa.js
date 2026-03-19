const heita = document.getElementById("heitaNoppa")
const noppa = document.getElementById("noppa")
const lopeta = document.getElementById("lopeta")

const aloitus = document.getElementById("aloitus")
const input = document.getElementById("tieto")
const nappi = document.getElementById("hyvaksy")
const ohjeet = document.getElementById("teksti")

let kaksinoppaa = ""
const pelaajat = []
const nimet = []
let pmaar = 0
let nytpelaava = 0
let tavoitepisteet = 100
let vaihe = 1
const heitot = []

function nytpelaa(){
    heitot.splice(0,heitot.length)
    if (nytpelaava >= pelaajat.length-1){
        nytpelaava = 0
    } else {
        nytpelaava +=1
    }
}
function pelaajienMaaritys(){
    if (input.value.length > 0){
        if (vaihe === 1 && Number.isInteger(parseInt(input.value))){
            pmaar = input.value
            vaihe +=1
            input.value = ""
            ohjeet.innerText = "Syötä nimet"
        } else if (vaihe <= pmaar+1){
            nimet.push(input.value)
            vaihe +=1
            input.value = ""
        }
        if (pmaar == nimet.length){
            kaksinoppaa = document.getElementById("noppiamonta").value
            aloitus.innerHTML = ""
            teePelaajat()
        }
    }
}
function teePelaajat(){
    num =1
    while (num <= pmaar){
        const div = document.createElement("div")
        div.id = "p"+num
        const teksti = document.createTextNode(nimet[num-1])
        const divin = document.createElement("div")
        const numin = document.createTextNode("0")
        divin.appendChild(numin)
        div.appendChild(teksti)
        div.appendChild(divin)
        document.getElementById("pelaajat").appendChild(div)
        pelaajat.push({nimi: nimet[num-1],id: "p"+num,pisteet:0})
        num +=1
    }
}

function lopetus(){
    id = pelaajat[nytpelaava].id

    totPisteet = heitot.reduce((a, b) => a + b, 0)
    pelaajat[nytpelaava].pisteet += totPisteet

    pelaaja = document.getElementById(id)

    pelaaja.children[0].innerText = pelaajat[nytpelaava].pisteet
    if (pelaajat[nytpelaava].pisteet >=tavoitepisteet){
        pelaaja.children[0].innerText ="voittaja"
    }
    nytpelaa()
}

function RTD(){
    return Math.floor(Math.random()*6)+1
}

function heitto(){
    
    num1 = RTD()
    if (kaksinoppaa ==="2"){
        num2 = RTD()
    }   else {
        num2 = ""
    }

    noppa.innerText = `${num2} ${num1}`
    if(pmaar>0 && pmaar == pelaajat.length)
        if (kaksinoppaa ==="2"){
            if (num1 === 1 && num2 === 1){
                heitot.push(25)
            } else if (num1 === num2) {
                heitot.push((num1+num2)*2)
            } else {
                heitot.push(num1+num2)
            }
        }else{
            heitot.push(num1)
        }
    
    if ((num1 === 1 || num2===1) && num1 !== num2){
        nytpelaa()
    }
    
}

heita.addEventListener("click",heitto)
lopeta.addEventListener("click",lopetus)
nappi.addEventListener("click",pelaajienMaaritys)
