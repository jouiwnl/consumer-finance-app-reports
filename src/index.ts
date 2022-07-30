import { AppDataSource } from "./data-source"
import app from './server/server';
import consumer from './consumer/consumer';

AppDataSource.initialize().then(async () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('server opened');
        consumer();
    });
}).catch(error => console.log(error))
