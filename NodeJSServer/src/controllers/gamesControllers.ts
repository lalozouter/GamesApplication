import {Request,Response} from 'express';
import pool from '../database'


class GamesController {

    public async list(req:Request,res:Response){
        const games=await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        const game= await pool.query('select * from games where id = ?',[id]);
        if(game.length >0 ){
            res.json(game);
        }
        else {
            res.status(404).json({message:"Game "+[id] +" not found"});
        }
    }

    public async create(req:Request,res:Response):Promise<void>{
        console.log(req.body);
        await pool.query('insert into games set ?',[req.body]);
        res.json({message:'game saved'});
    }

    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await pool.query('delete from games where id = ?',[id]);
        res.json({message:'The game was deleted'});
    }

    public async update(req:Request,res:Response):Promise<void>{
        const {id} =req.params;
        await pool.query('update games set ? where id = ?',[req.body,id]);
        res.json({message:'The game was updated'});
    }

}

export const gamesController= new GamesController();