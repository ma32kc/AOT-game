const {Router} = require('express')
const router = Router()
const CharacterController = require('../controllers/CharacterController')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', (req, res) => {
    res.render('index', {
        title: 'Kiss marry kill',
        isIndex: true
    })
})
router.get('/game', CharacterController.game)
router.post('/game', urlencodedParser, CharacterController.filter)
router.get('/settings', CharacterController.settings)
router.post('/characters', CharacterController.create)
router.get('/characters', CharacterController.getAll)
router.get('/characters/:id', CharacterController.getOne)
router.put('/characters', CharacterController.update)
router.delete('/characters/:id', CharacterController.delete)

// router.put('/game', async (req, res) => {
//     const character = req.body
//     if(!character._id) {
//         console.log ('Error')
//     }
//     const updateCharacter = await Character.findByIdAndUpdate(character._id, character, {new: true})
//     return res.json(updateCharacter)
// })

module.exports = router