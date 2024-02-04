"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = require("./db/connect");
const task_route_1 = __importDefault(require("./routes/task.route"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const baseUrl = process.env.AUTH0_BASE_URL;
app_1.default.use(express_1.default.json());
app_1.default.use((0, cors_1.default)({ origin: baseUrl }));
app_1.default.use((0, morgan_1.default)('dev'));
app_1.default.get('/api/public-route', (req, res) => {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});
app_1.default.use('/api', authMiddleware_1.checkJwt, task_route_1.default);
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, './docs/swagger.yaml'));
app_1.default.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const PORT = 5000;
const main = () => {
    try {
        (0, connect_1.connect)();
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to server:', error);
    }
};
main();
