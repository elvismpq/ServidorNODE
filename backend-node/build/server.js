"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(helmet_1.default());
        const MONGO_URI = 'mongodb+srv://elvis-anthony:vayneakali@cluster0.0elia.mongodb.net/cafe?retryWrites=true&w=majority';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        //this.app.get('/',(req,res)=>{res.send("SERVIDOR DE NODE")});
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}
const server = new Server();
server.start();
