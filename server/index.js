if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ImageKit = require('imagekit')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const app = express()
const filePathMiddleware = require('./middleware/fileMiddleware')
const path = require('path')
const swaggerDocs = require('./utils/swagger')
const { loadAnimeData } = require('./animeData')

app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   }),
)
app.use('/api', router)
app.use(errorMiddleware)

var imagekit = new ImageKit({
   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
})

var imageURL = imagekit.url({
   path: 'user_icons/user.jpg',
   transformation: [
      {
         height: '200',
         width: '200',
      },
   ],
})

const start = async () => {
   try {
      await mongoose.connect(
         `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b0tz7ut.mongodb.net/`,
      )

      await loadAnimeData()

      swaggerDocs(app, PORT)

      app.use(express.static(path.join(__dirname, '../client/dist')))

      app.get('*', (req, res) => {
         res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
      })

      app.listen(PORT, () => {
         console.log(`Server started on PORT ${PORT}`)
      })
   } catch (error) {
      console.error('Ошибка:', error)
   }
}

module.exports = imagekit
start()
