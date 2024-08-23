import chalk from 'chalk'
import mongoose from 'mongoose'
import { systemLogs } from '../utils/Logger.js'

const connectionToDb = async () => {
	try {
		const connectionParams = {
			dbName: process.env.DB_NAME,
		}
		const connect = await mongoose.connect(
			process.env.MONGO_URI ||
				`mongodb+srv://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@invoice.btacnj3.mongodb.net/`,
			connectionParams
		)
		console.log(
			`${chalk.blue.bold(`MongoDB Connected: ${connect.connection.host}`)}`
		)
		systemLogs.info(`MongoB Connected: ${connect.connection.host}`)
	} catch (error) {
		console.error(`${chalk.red.bold(`Error: ${error.message}`)}`)
		process.exit(1)
	}
}

export default connectionToDb
