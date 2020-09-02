"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Categoria_1 = __importDefault(require("../models/Categoria"));
class Categoria {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categoriaBD = yield Categoria_1.default.find({}).sort('nombre');
                let conteo = yield Categoria_1.default.countDocuments();
                res.json({
                    categorias: categoriaBD,
                    conteo: conteo
                });
            }
            catch (error) {
                return res.status(400).json({
                    dato: error
                });
            }
        });
    }
    getCategoriaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let categoriaBD = yield Categoria_1.default.findById(idurl);
                res.json({
                    ok: true,
                    categoria: categoriaBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    dato: "Categoria no encontrado",
                    message: error
                });
            }
        });
    }
    postCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bodycabecera = req.body;
                console.log(req.body);
                let categoria = new Categoria_1.default({
                    nombre: bodycabecera.nombre,
                });
                let categoriaBD = yield categoria.save();
                res.json({
                    categoria: categoriaBD
                });
            }
            catch (error) {
                return res.status(500).json({
                    dato: error
                });
            }
        });
    }
    putCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let bodycabecera = req.body;
                let categoriaBD = yield Categoria_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
                res.json({
                    categoria: categoriaBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: "ERROR",
                    dato: error
                });
            }
        });
    }
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let categoriaBD = yield Categoria_1.default.findByIdAndRemove(idurl);
                res.json({
                    mensaje: "CATEGORIA ELIMINADO",
                    categoria: categoriaBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "CATEGORIA NO ENCONTRADO",
                    dato: error
                });
            }
        });
    }
    exponerRutas() {
        this.router.get('/', this.getCategoria);
        this.router.get('/:id', this.getCategoriaId);
        this.router.post('/', this.postCategoria);
        this.router.put('/:id', this.putCategoria);
        this.router.delete('/:id', this.deleteCategoria);
    }
}
const categoria = new Categoria();
exports.default = categoria.router;