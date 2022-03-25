const Character = require ('../models/character')

let sex = 'all';

class CharacterController {

    async filter(req, res) {
        sex =  req.body.sex
        res.render('index', {
            title: 'Игра'
        })
    }

    async game(req, res) {
        let characters
        if (sex == 'all') {
            characters = await Character.find({}).lean()
        }
        else  {
            characters = await Character.find({sex: sex}).lean()
        }

        characters.sort(() => Math.random() - 0.5)
        characters = characters.slice(0,3)
        const titleOfAnime = characters[0].anime
        res.render('game', {
            title: 'Игра',
            characters,
            titleOfAnime
        })
    }

    async settings(req, res) {
        res.render('settings', {
            title: 'Настройки'
        })
    }

    async create (req, res) {
        try {
            const {name, anime, img, sex, kiss, marry, kill} = req.body
            const character = await Character.create ({name, anime, img, sex, kiss, marry, kill})
            res.json (character)
        } catch (e) {
            res.json (e)
        }
    }

    async getAll (req, res) {
        try {
            const characters = await Character.find ()
            return res.json (characters)
        } catch (e) {
            res.status (500).json (e)
        }

    }

    async getOne (req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status (400).json ({message: "Id не указан"})
            }
            const character = await Character.findById (id)
            return res.json (character)
        } catch (e) {
            res.status (500).json (e)
        }
    }

    async update (req, res) {
        try {
            const character = req.body
            if (!character._id) {
                res.status (400).json ({message: "Id не указан"})
            }
            const updatedCharacter = await Character.findByIdAndUpdate(character._id, character, {new: true})
            return res.json(updatedCharacter)
        } catch (e) {
            res.status (500).json (e)
        }
    }

    async delete (req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status (400).json ({message: "Id не указан"})
            }
            const character = await Character.findByIdAndDelete(id)
            return res.json (character)
        } catch (e) {
            res.status (500).json (e)
        }
    }
}

module.exports = new CharacterController ()