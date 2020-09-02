import { Router, Request, Response } from "express";
import CategoriaModel from "../models/Categoria";

class Categoria {
    router: Router;


    constructor() {
       this.router=Router();
       this.exponerRutas();
    }

    async getCategoria(req:Request,res:Response){
        try {
            let categoriaBD=await CategoriaModel.find({}).sort('nombre');
            let conteo =await CategoriaModel.countDocuments();
            res.json({
                categorias: categoriaBD,
                conteo: conteo
            });
        } catch (error) {
            return res.status(400).json({
                dato:error
            });
        }
    }

    async getCategoriaId(req:Request, res:Response){
        try {
            let idurl=req.params.id;
            let categoriaBD= await CategoriaModel.findById(idurl);
            res.json({
                ok:true,
                categoria: categoriaBD
            })
        } catch (error) {
            return res.status(400).json(
                {
                    ok:false,
                    dato:"Categoria no encontrado",
                    message: error
                });
        }
    }

    async postCategoria(req:Request, res:Response){
        try {
            let bodycabecera = req.body;
            console.log(req.body);
            let categoria = new CategoriaModel(
                {
                    nombre: bodycabecera.nombre,
                }
            );
            let categoriaBD = await categoria.save();
            res.json(
                {
                    categoria:categoriaBD
                });
        } catch (error) {
            return res.status(500).json(
                {
                    dato:error
                }
            );
        }
    }

    async putCategoria(req:Request, res:Response){
        try {
            let idurl=req.params.id;
            let bodycabecera=req.body;
            let categoriaBD = await CategoriaModel.findByIdAndUpdate(idurl,bodycabecera,{new:true,runValidators:true,context:'query'});
            res.json(
                {
                    categoria:categoriaBD
                }
            );
        } catch (error) {
            return res.status(400).json(
                {
                    ok:"ERROR",
                    dato:error
                }
            );
            
        }
    }

    async deleteCategoria(req:Request, res:Response){
        try {
            let idurl =req.params.id;
            let categoriaBD= await CategoriaModel.findByIdAndRemove(idurl);
            res.json({
                mensaje:"CATEGORIA ELIMINADO",
                categoria: categoriaBD
            });
        } catch (error) {
            return res.status(400).json(
                {
                    message:"CATEGORIA NO ENCONTRADO",
                    dato: error
                });
            
        }
    }


    exponerRutas(){
        this.router.get('/',this.getCategoria);
        this.router.get('/:id',this.getCategoriaId);
        this.router.post('/',this.postCategoria);
        this.router.put('/:id',this.putCategoria);
        this.router.delete('/:id',this.deleteCategoria);
    }
}

const categoria = new Categoria();
export default categoria.router;