
//Creamos la clase auto
class Auto {
    constructor(id,modelo,costo,tasa,img){
        this.id = id
        this.modelo = modelo
        this.costo = costo
        this.tasa = tasa
        this.img = img
    }
}

//Declaramos el array

const arrayAutos = []

// Creamos los objetos y los agregamos al array
const city = new Auto(1,'City',363900,16,'city.png')
arrayAutos.push(city)
const civic = new Auto(2,'Civic',545900,14,'civic.png')
arrayAutos.push(civic)
const accord = new Auto(3,'Accord',779900,11,'accord.png')
arrayAutos.push(accord)
const crv = new Auto(4,'CRV',714900,12,'crv.png')
arrayAutos.push(crv)
const pilot = new Auto(5,'Pilot',1029900,9,'pilot.png')
arrayAutos.push(pilot)
const aveo = new Auto(6,'Odyssey',1255200,16,'odyssey.png')
arrayAutos.push(aveo)
console.log(arrayAutos)
//seleccionamos el select de autos
const selectAuto = document.querySelector('#selectAuto')

//llenamos el select del auto dinamicamente con el array de autos
arrayAutos.forEach((prod)=>{
    const optionAuto = document.createElement('option')
    optionAuto.innerText = `${prod.modelo}: $${prod.costo}`
    optionAuto.setAttribute('value', `${prod.id}`)
    selectAuto.append(optionAuto)
}) 

let  autoSeleccionado
//Recuperamos el Auto seleccionado por el usuario
selectAuto.addEventListener('change', () => {
   autoSeleccionado = selectAuto.value-1;
console.log(autoSeleccionado)
});


//seleccionamos el select de la mensualidad
const selectMensualidad = document.querySelector('#mensualidad')
let  mensulidadSeleccionada
//Recuperamos la mensualidad seleccionado por el usuario
selectMensualidad.addEventListener('change', () => {
    mensulidadSeleccionada = selectMensualidad.value;
console.log(mensulidadSeleccionada)
});


//seleccionamos el select del enganche
const selectEnganche = document.querySelector('#enganche')
let  engancheSeleccionado
//Recuperamos el enganche seleccionado por el usuario
selectEnganche.addEventListener('change', () => {
    engancheSeleccionado = selectEnganche.value;
console.log(engancheSeleccionado)
});

//Recuperamos el formulario
const form = document.querySelector('#formulario')

//Cachamos el evento onsubmit del formulario 
form.onsubmit = (evento) => {
    //Paramos la ejecución del formulario
    evento.preventDefault()
    //Buscamos con un filtro en el array de autos la selección del usuario
    const automovil = arrayAutos.filter(auto=>auto.id===autoSeleccionado)
    //Sacamos el indice del array, retsamos 1 porque el array comienza en cero
    const indice = selectAuto.selectedIndex-1
    //Recuperamos los datos del auto dentro del array por medio del indice
    const modeloAuto = arrayAutos[indice].modelo
    const costoAuto = arrayAutos[indice].costo
    const tasaAuto = arrayAutos[indice].tasa
    const imgAuto = arrayAutos[indice].img

    //Funcion para Calcular la cantidad del enganche dado el porcentaje por el usuario
    function enganchefuncion(ePorcentaje,iAuto) {
        const calculoEnganche = (ePorcentaje*iAuto)/100
    return calculoEnganche
    }
    //Llamamos a la funciuón anterior y le pasamos los parametros que recibe
    const enganche = enganchefuncion(engancheSeleccionado,costoAuto)
    //verificamos que funcione la funcion
    console.log('Enganche recibido: '+enganche)
    
    //Calculamos el crédito al costo del auto menos el enganche
    const credito = costoAuto-enganche
    console.log('Tu credito es por: '+credito)
    //Dividmos el credito y las mensualidades seleccionadas
    const mensulidadesSinintereses = credito/mensulidadSeleccionada
    //Seleccionamos la tasa del auto y la convertimos en decimasles para su multiplicacion
    const tasaConvertida = tasaAuto/100
    //sacamos los intereses por cada mensualidad y redondemos la cantidad
    const mensulidadInteres = Math.round(mensulidadesSinintereses*tasaConvertida)
    //sacamos el impuesto por cada mensualidad y redondemos la cantidad
    const impuestoDelInteres = Math.round(mensulidadInteres*.16)
    //sacamos la mensualidad total sumando mensualidad + intereses+impuestos
    const mensulidadTotal = Math.round(mensulidadesSinintereses+mensulidadInteres+impuestoDelInteres)
    //verificamos contidad en consola
    console.log('mensulidadesSinintereses: '+mensulidadesSinintereses)
    console.log('mensulidadInteres: '+mensulidadInteres)
    console.log('impuestInteres: '+impuestoDelInteres)
    console.log('mensualidadTotal: '+mensulidadTotal)
    
    //ocultamos el section del HTML inicial
    const carrusel = document.getElementById('main')
    carrusel.style.display = "none"

    //Recuperamos datos de los Inputs
    const nombre = document.querySelector('#nombre').value
    const email = document.querySelector('#email').value
    //Insertamos las variables en el HTML
    document.getElementById('cliente').innerHTML = nombre
    document.getElementById('txtCostoAuto').innerHTML = costoAuto
    document.getElementById('txtFinanciamiento').innerHTML = credito
    document.getElementById('txtEnganche').innerHTML = engancheSeleccionado
    document.getElementById('cantidadEnganche').innerHTML = enganche
    document.getElementById('txtMensualidad').innerHTML = mensulidadSeleccionada
    document.getElementById('txtCoche').innerHTML = modeloAuto
    document.getElementById('imgAuto').src = `img/${imgAuto}`;
    //Seleccionamos el body de la tabla
    const tmensual = document.getElementById('tablaMensual')
     //Por medio de un for generamos la tabla del desglose con base a la mensualidades selecionadas por el cliente
    for (let index = 1; index <= mensulidadSeleccionada; index++) {
        let tablaFila = document.createElement('tr')
        tmensual.append(tablaFila)

        //contador mensualidad
        let tablaColumna1 = document.createElement('td')
        tablaColumna1.innerHTML = index
        tablaFila.append(tablaColumna1)
        tablaColumna1.classList.add("text-center")
        //mensulidad sin interes
        let tablaColumna2 = document.createElement('td')
        tablaColumna2.innerHTML = mensulidadesSinintereses
        tablaFila.append(tablaColumna2)
        tablaColumna2.classList.add("text-center")
        //interes
        let tablaColumna3 = document.createElement('td')
        tablaColumna3.innerHTML = mensulidadInteres
        tablaFila.append(tablaColumna3)
        tablaColumna3.classList.add("text-center")
        //impuesto
        let tablaColumna4 = document.createElement('td')
        tablaColumna4.innerHTML = impuestoDelInteres
        tablaFila.append(tablaColumna4)
        tablaColumna4.classList.add("text-center")
        //totalmensual
        let tablaColumna5 = document.createElement('td')
        tablaColumna5.innerHTML = mensulidadTotal
        tablaFila.append(tablaColumna5)
        tablaColumna5.classList.add("text-center")
    }
    //cerramos modal
    bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal')).hide()
    //Mostramos la tabla generada
    document.getElementById('cotizado').classList.remove("d-none")

    //Guardamos en LocalStorage solo para hacer uso del localstorage 
    fechaCotizada = new Date()
    localStorage.setItem('Lfecha', fechaCotizada)
    localStorage.setItem('Lnombre', nombre)
    localStorage.setItem('Lemail', email)
    localStorage.setItem('LindiceAutomovil', indice)
    localStorage.setItem('Lenganche', engancheSeleccionado)
    localStorage.setItem('LmensulidadSeleccionada', mensulidadSeleccionada)
    //Buscamos datos en LocalStorage
    const localNombre = localStorage.getItem('Lnombre')
    const localfecha = localStorage.getItem('Lfecha')
    //Mostramos datos desde localstorage
    console.log(localNombre)
    console.log(localfecha)

    //Generamos un array con los datos para guardar en JSON
    const Cotizacion = {
        Cotizado:fechaCotizada,
        Nombre:nombre,
        Email:email,
        AutoSeleccionado:indice,
        Enganche:engancheSeleccionado,
        Mensualidad:mensulidadSeleccionada
    }
    //Convertimos el arreglo a JSON
    const CotizacionJson = JSON.stringify(Cotizacion)
    //Guadarmaos el localStorage la cotización en JSON
    localStorage.setItem('CotizacionJSON', CotizacionJson)

    //Recuperamos el JSON
    const CotizacionJsonLStorage = localStorage.getItem('CotizacionJSON')
    console.log(CotizacionJsonLStorage)
    //Pasamos y vemos el JSON como Objeto al mismo tiempo
    console.log(JSON.parse(CotizacionJsonLStorage))

    //FIN
    
}