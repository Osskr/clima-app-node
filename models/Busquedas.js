const fs = require('fs')
const axios = require('axios');
const capitalize = require('capitalize')
class Busquedas {
    historial = []

    dbPath = './db/database.json'

    constructor(){
        this.leerDB()
    }

    getParamsMapbox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit': 5,
            'language':'es'
        }
    }
    
    getParamsClimaCiudad(lat,lon){
        return{
            'appid':process.env.OPEN_WEATHER_KEY,
            'lat':lat,
            'lon': lon,
            'lang':'es',
            'units':'metric'
        }
    }

    getHistorialCapitalizado(){

       return this.historial.map(ciudad => {
            return capitalize.words(ciudad)
        })
    }
    async ciudad(lugar=''){

        try{
                              
            const instance = axios.create({
                
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.getParamsMapbox()
            })

            const resp = await instance.get()
            return resp.data.features.map(lugar => ({
                id:lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            
               
        
        }catch (error){
            
            console.log(error)
            return error
        }
         //retorna las ciudades y lugares que coincidan con el parametro de busqueda
    }

    async climaPorLugar (lat, lon) {

        try {
            const instance = axios.create({
                baseURL:`http://api.openweathermap.org/data/2.5/weather`,
                params: this.getParamsClimaCiudad(lat,lon)
            })

            const resp = await instance.get()
            const {weather,main} = resp.data
            const desc = resp.data.weather[0].description
            return{
                temp: main.temp,
                temp_min:main.temp_min,
                temp_max:main.temp_max,
                desc:weather[0].description
            } 
        
        } catch (error) {
            return error 
        }
    }

    agregarHistorial(lugar=''){
        
        if (this.historial.includes(lugar.toLocaleLowerCase())) return
        this.historial.unshift(lugar.toLocaleLowerCase())
        this.guardarDB()
    }

           
    guardarDB(){
            
      
        fs.writeFileSync(this.dbPath, JSON.stringify(this))
    }

    leerDB(){

        if (!fs.existsSync(this.dbPath)){
            return
        }
         
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'})
        const {historial} = JSON.parse(info)
        
        this.historial = historial


        
    }
}

module.exports = Busquedas;