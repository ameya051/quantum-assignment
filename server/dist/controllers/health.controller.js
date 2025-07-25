export const getHealth = (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'quantum-assignment-server'
    });
};
export const getRoot = (req, res) => {
    res.json({
        message: 'Express server is running!',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            users: '/api/users',
            dbStatus: '/api/db-status'
        }
    });
};
