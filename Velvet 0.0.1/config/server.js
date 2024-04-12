import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {config} from 'dotenv'

const server = express()
config()
const port = process.env.PORT || 3200

server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))
server.use(helmet())

export const initServer = async () => {
    server.listen(port, () => {
        console.log(`Server HTTP running in port ${port}`)
    })
}