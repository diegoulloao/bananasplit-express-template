/**
 *
 *  Provider: Express
 *  @module providers/express
 * 
 *  @description the express nodejs provider
 * 
 */
import http from 'http'

import Express, { Application as ExpressApp } from 'express'
import chalk from 'chalk'
import boxen from 'boxen'

import Settings from '../settings/express'
import Middlewares from '../middlewares/middleware'
import MainRouter from '../app/routes/main.routes'


/**
 * 
 *  Definitions for ExpressProvider singleton parameters
 *  @typedef
 * 
 */
type AppProps = {
    port?: number
}


export default
    /**
     * 
     *  @class ExpressProvider
     *  @classdesc provides an express server
     * 
     */
    class ExpressProvider {

        /**
         *
         *  @property { string } name
         * 
         */
        public name: string = 'Express'

        
        /**
         * 
         *  @private @property { ExpressApp } service
         * 
         */
        private service!: ExpressApp


        /**
         * 
         *  @property { number } port
         * 
         */
        public port: number = 3627

        
        /**
         *
         *  Singleton instance
         *  @private @static @property { ExpressProvider } instance
         * 
         */
        private static instance: ExpressProvider
        

        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not accesible
         *  Implements: singleton pattern
         * 
         */
        private constructor() {
            // Singleton      
        }

        
        /**
         *  
         *  Singleton
         *  @description provides or returns a singleton instance for ExpressProvider
         * 
         *  @static @method provide
         *  @param { AppProps } config? - configuration object
         * 
         *  @returns { ExpressProvider }
         * 
         */
        public static provide( config?: AppProps ): ExpressProvider {

            if ( !this.instance ) {

                // Creates a new instance
                this.instance = new ExpressProvider()
                this.instance.service = Express()
                
                // Executes provide parts
                this.instance.settings( config )
                this.instance.middlewares()
                this.instance.routes()

            }

            return this.instance

        }


        /**
         * 
         *  Returns the ExpressProvider singleton instance
         * 
         *  @static @method getInstance
         *  @returns { ExpressProvider }
         * 
         */
        public static getInstance = (): ExpressProvider => ExpressProvider.instance


        /**
         * 
         *  Gets express server app
         * 
         *  @method app
         *  @returns { ExpressApp }
         *  
         */
        public app = (): ExpressApp => <ExpressApp>ExpressProvider.getInstance().service


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @private @method settings
         * 
         *  @params { AppProps } config?
         *  @returns { void }
         * 
         */
        private settings( config?: AppProps ): void {

            this.service.set( 'port', config ? (config.port || this.port) : this.port )
            this.port = this.service.get( 'port' )

            /**
             *  Then do custom settings
             *  @overwrite
             */
            Settings( <ExpressApp>this.service )

        }


        /**
         * 
         *  Sets all middlewares
         * 
         *  @private @method middlewares
         *  @returns { void }
         * 
         */
        private middlewares(): void {
            Middlewares( <ExpressApp>this.service )
        }


        /**
         * 
         *  Adds routes for ExpressProvider
         * 
         *  @private @method routes
         *  @returns { void }
         * 
         */
        private routes(): void {
            this.service.use( MainRouter )
        }


        /**
         * 
         *  Start express server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise<http.Server> {
            
            if ( port )
                this.service.set( 'port', this.port = port )
            ;

            const httpServer: http.Server = await this.service.listen( this.service.get('port') )


            return httpServer

        }

    }
;
