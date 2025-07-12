import express, { type Request, Response, NextFunction } from 'express'
import { registerRoutes } from './routes'
import { setupVite, serveStatic, log } from './vite'

const app = express()

// Parse JSON and URL-encoded requests
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Log API requests with timing + response preview
app.use((req, res, next) => {
  const start = Date.now()
  const path = req.path
  let capturedJsonResponse: Record<string, any> | undefined = undefined

  const originalResJson = res.json
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson
    return originalResJson.apply(res, [bodyJson, ...args])
  }

  res.on('finish', () => {
    const duration = Date.now() - start
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`
      }

      if (logLine.length > 300) {
        logLine = logLine.slice(0, 299) + '…'
      }

      log(logLine)
    }
  })

  next()
})
;(async () => {
  const server = await registerRoutes(app)

  // Error handler middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(status).json({ message })
    throw err
  })

  // Setup Vite dev server or serve static build
  if (app.get('env') === 'development') {
    await setupVite(app, server)
  } else {
    serveStatic(app)
  }

  // Listen on port 5000
  const port = 5000
  server.listen(port, () => {
    log(`✅ Server running at http://localhost:${port}`)
  })
})()
