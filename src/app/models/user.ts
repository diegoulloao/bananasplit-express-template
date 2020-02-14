/**
 *
 *  User Model
 *  @model
 * 
 *  @module app/models/user
 *  @description Defines a user model example
 * 
 */


 import { Model, DataTypes } from 'sequelize'
 import { sequelize } from '../../providers/sequelize'


 class User extends Model {

    // Fields:
    private id!: number
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string

    private readonly createdAt!: Date
    private readonly updatedAt!: Date


    // Fields Definitions (defines Model):
    public static fields = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        lastname: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        email: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },

        password: {
            type: new DataTypes.STRING(50),
            allowNull: false
        }
        
    }

    // Options:
    public static options = {
        sequelize,  // sequelize connection
        timestamps: true
    }

 }


 User.init( User.fields, User.options )

; ( async () => {
    await User.sync({ force: true })
} )()

 
 export default User