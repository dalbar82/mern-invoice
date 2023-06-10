import chalk from 'chalk'
import mongoose from 'mongoose'
import { systemLogs } from '../utils/logger.js'

const connectionToDb = async () => {
	try {
		const connectionParams = {
			dbname: process.env.DB_NAME,
		}
		const connect = await mongoose.connect(
			process.env.MONGO_URI,
			connectionParams
		)
		console.log(
			`${chalk.blue.bold(`MongoDB Connected: ${connect.connection.host}`)}`
		)
		systemLogs.info(`MongoDB Connected: ${connect.connection.host}`)
	} catch (error) {
		systemLogs.info(`MongoDB Error: ${error.message}`)
		console.error(`${chalk.red.bold(`Error: ${error.message}`)}`)
		process.exit(1)
	}
}

export default connectionToDb
