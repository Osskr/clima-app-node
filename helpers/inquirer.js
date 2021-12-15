const inquirer = require('inquirer')
require('colors')


const menuOpts ={

    type: 'list',
    name: 'opcion',
    message: 'Seleccione una opcion ',
    choices: [
        {
            value: 1,
            name: '1. Buscar Ciudad'
        },
        {
            value: 2,
            name: '2. Historial'
        },
        {
            value: 3,
            name: '3.Salir'
        }
]
}
const inquirerMenu  = async ()=>{

    console.clear()
    
    console.log('==========Clima App ===========\n\n')
   

    const {opcion}  = await inquirer.prompt([menuOpts])
    return opcion;
}

const pausa = async()=>{
    
    const question = [
        {
            type:'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
   
}

const confirmar = async (message) => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }]

    const {ok} = await inquirer.prompt(question)
    return ok;
}

const leerInput = async (message)=>{

    const question = [ 
        {
            type:'input',
            name:'desc',
            message,
            validate( value){
                if(value.length === 0 ){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }        
    ]
    const {desc} = await inquirer.prompt(question)
    return desc;
}


const listadoDeLugares = async ( lugares = [] )=> {

    const choices = lugares.map((lugar,idx)=> {

      
        return {
            value: lugar.id,
            name: `${idx+1}. ${lugar.nombre}`
        }
    })
    
  
    const menuLugares = {
        type: 'list',
        name: 'id',
        message:'Seleccione Lugar:',
        choices:choices
    }

  

    const {id}  = await inquirer.prompt([menuLugares])
    return id;

}



const mostrarListadoChecklist = async ( tareas = [] )=> {

    const choices = tareas.map((tarea,idx)=> {

      
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: tarea.completadoEn? true : false
        }
    })
    
 
    const menuTareas = {
        type: 'checkbox',
        name: 'ids',
        message:'Selecciones:',
        choices:choices
    }

  

    const {ids}  = await inquirer.prompt([menuTareas])
    return ids;

}


module.exports = {
    inquirerMenu:inquirerMenu,
    pausa:pausa,
    leerInput:leerInput,
    listadoDeLugares:listadoDeLugares,
    confirmar:confirmar,
    mostrarListadoChecklist:mostrarListadoChecklist

}