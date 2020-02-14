import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';


class Server {

    public app:Application; 

    constructor(){
        this.app=express(); //initialize express
        this.config();
        this.routes();
    }

    config():void{
        //if the infrastructure provides the port, take it; if don't, take the port given by code  
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());//so that angular could make requests to the server
        this.app.use(express.json());//to receive and response requests in JSON format
        this.app.use(express.urlencoded({extended:false})); 
    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/games',gamesRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port:'+this.app.get('port') );
        });
    }
}

const server=new Server();
server.start();