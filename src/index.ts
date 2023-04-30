import logger from './logger/index'
import app from './server/server';
import consumer from './consumer/consumer';

app.listen(process.env.PORT || 3000, () => {
    logger.info('Server running...');
    consumer().start();

    consumer().on('error', (err) => {
        console.error(err.message);
    });

    consumer().on('processing_error', (err) => {
        console.error(err.message);
    });
});

