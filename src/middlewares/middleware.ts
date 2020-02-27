/**
 * 
 *  Middlewares
 *  @middleware
 * 
 *  @module middlewares/middleware
 *  @description Contains all middlewares
 * 
 */



import Express from 'express'
import Morgan from 'morgan'
import SassMiddleware from 'node-sass-middleware'
import path from 'path'



export default

    ( app: Express.Application ) => {
        
        /**
         * 
         *  Your Middlewares goes here!!
         *  @middlewares
         * 
         */
        
        app.use( Morgan('dev') )
        app.use( Express.json() )

        // Compile .scss files into .css
        app.use( SassMiddleware({

            src: app.get( 'sass' ),
            dest: app.get( 'sass:output' ),
            outputStyle: 'compressed',
            debug: true

        }) )

        // Public directory:
        app.use( Express.static( app.get('public') ) )

    }
;
