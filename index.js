require('dotenv').config()

const {leerInput, inquirerMenu, pausa, listadoDeLugares} = require ('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');



const main = async ()=>{

    
    const busquedas = new Busquedas();
    let opt;

    do{    

        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
                console.clear()
                //Mostrar Mensaje
                const lugar = await leerInput('Ingrese una ciudad: ')
                const lugares = await busquedas.ciudad(lugar)
                const opt = await listadoDeLugares(lugares)
               
                const lugarSel = lugares.find(l=> l.id===opt)

                if(opt==='0') continue;

                //Guardar DB

                busquedas.agregarHistorial(lugarSel.nombre)

                
                const clima = await busquedas.climaPorLugar(lugarSel.lat, lugarSel.lng)
                //buscar ciudad 
                // seleccionar 
                //clima
                //mostrar resultados
                console.clear()
                console.log('\nInformacion de la ciudad'.green)
                console.log('===========================\n')
                console.log(`Ciudad: ${lugarSel.nombre}`)
                console.log(`Latitud: ${lugarSel.lat}`)
                console.log(`Longitud: ${lugarSel.lng}`)
                console.log(`Temperatura Actual ${clima.temp}°C`)
                console.log(`Minima ${clima.temp_min}°C`)
                console.log(`Maxima ${clima.temp_max}°C`)
                console.log(`Se ve como: ${clima.desc}`)
                
                break;
            case 2:
                console.log('\n')
                busquedas.getHistorialCapitalizado().forEach(lugar => {
                    console.log(`* ${lugar}`)
                })
                break;
        
            
        }
        
        if(opt!==0) await pausa()
       

    }while(opt!==3)
}


main()

