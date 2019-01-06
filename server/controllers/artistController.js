// artistController defines post and get for /api/artists

const artistController = function (Artist) {
    const post = function (req, res) {
        if (req.body.name) {
            let artist = new Artist(req.body)
            console.log(`artist to post: ${artist}`)
            artist.save()
            res.status(201)
            res.send(artist)
        } else {
            res.status(400)
            res.send('Name is required')
        }
    }

    const get = function (req, res) {
        // If we have req params - return just that artist
        if (req.artist) {
            res.json(req.artist)
        } else {
            // Return a list of all artists
            Artist.find(function (err, artists) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(artists)
                }
            }).sort({
                name: 1
            }) // Sort the results by artist name
        }
    }

    const deleteFunction = function (req, res) {
        req.artist.remove(function (remErr) {
            if (remErr)
                res.status(500).send(remErr)
            else {
                res.status(204).send('Removed')
            }
        })
    }

    return {
        post: post,
        get: get,
        delete: deleteFunction
    }
}

module.exports = artistController