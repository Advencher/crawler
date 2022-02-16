import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default class Connection {
    constructor() {
        const url = process.env.MONGO_URL;
        mongoose.Promise = global.Promise;
        mongoose.set( 'useNewUrlParser', true );
        mongoose.set( 'useFindAndModify', false );
        mongoose.set( 'useCreateIndex', true );
        mongoose.set( 'useUnifiedTopology', true );
        this.connect( url ).then( () => {
            console.log( '✔ Database Connected' );
        } ).catch( ( err ) => {
            console.error( '✘ MONGODB ERROR: ', err.message );
        } );

    }

    async connect( url ) {
        try {
            await mongoose.connect( url );
        } catch ( e ) {
            throw e;
        }
    }
}
