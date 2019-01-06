const express = require('express')

const artistRoutes = function (Artist) {
    let artistRouter = express.Router()

    // The artistController defines post and get for the route /api/artists
    let artistController = require('../controllers/artistController')(Artist)

    // Middleware to find an artist by id and handle when it isn't found
    artistRouter.use('/:artistId', function (req, res, next) {
        Artist.findById(req.params.artistId, function (err, artist) {
            if (err)
                res.status(500).send(err)
            else if (artist) {
                req.artist = artist
                next()
            } else {
                res.status(404).send('Artist not found')
            }
        })
    })

    artistRouter.route('/')
        .post(artistController.post)
        .get(artistController.get)


    artistRouter.route('/:artistId')
        .get(artistController.get)
        .delete(artistController.delete)

    return artistRouter
}

module.exports = artistRoutes