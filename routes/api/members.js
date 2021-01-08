const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const members = require('../../Members')

// GET All Members
router.get('/', (req, res) => res.json(members))

// GET Single Member
router.get('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id))

	if (!found) {
		res
			.status(400)
			.json({ msg: `Member with ID of ${req.params.id} Not Found` })
	} else {
		res
			.status(200)
			.json(members.filter((member) => member.id === parseInt(req.params.id)))
	}
})

// Create a Member
router.post('/', (req, res) => {
	const { name, email } = req.body

	const newMember = {
		id: uuid.v4(),
		name,
		email,
		status: 'active',
	}

	if (!newMember.name || !newMember.email) {
		res.status(400).json({ msg: 'Please include a name and email' })
	}

	members.push(newMember)
	res.status(200).json(members)
	// res.redirect('/')
})

// Update Member
router.put('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id))

	if (!found) {
		res
			.status(400)
			.json({ msg: `Member with ID of ${req.params.id} Not Found` })
	} else {
		const memberToUpdate = req.body
		members.forEach((member) => {
			if (member.id === parseInt(req.params.id)) {
				member.name = memberToUpdate ? memberToUpdate.name : member.name
				member.email = memberToUpdate ? memberToUpdate.email : member.email

				res.status(200).json({
					msg: `Member with ID of ${req.params.id} Updated`,
					payload: member,
				})
			}
		})
	}
})

// Delete Member
router.delete('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id))

	if (!found) {
		res
			.status(400)
			.json({ msg: `Member with ID of ${req.params.id} Not Found` })
	} else {
		res.json({
			msg: 'Member deleted',
			payload: members.filter(
				(member) => member.id !== parseInt(req.params.id)
			),
		})
	}
})

module.exports = router
