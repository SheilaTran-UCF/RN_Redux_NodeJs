import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import passport from 'passport'
import { connectionMongodb, env, logger, passportConfig } from './config/index.js'
import { errorHandle } from './middleware/index.js'
import { route as routes } from './routes/index.js'

// passport config
passportConfig(passport)

const app = express()
const port = env.PORT

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser(env.JWT_SECRET))

// session
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

routes(app)

const start = async () => {
	try {
		await connectionMongodb()
		app.listen(port, () => {
			logger.info(`Server is listening on port ${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

//error handler
app.use(errorHandle)

start()
