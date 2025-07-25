import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import { corsMiddleware, requestLogger, errorHandler } from './middleware/index.js';
import { getHealth } from './controllers/health.controller.js';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Custom middleware
app.use(requestLogger);
app.use(corsMiddleware);
// Routes
app.get('/health', getHealth);
app.use('/api/v1', routes);
// Error handling middleware (must be last)
app.use(errorHandler);
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`API endpoints:`);
            console.log(`   - GET  /health - Health check`);
            console.log(`   - POST /api/auth/register - Register user`);
            console.log(`   - POST /api/auth/login - Login user`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
