const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     responses:
 *       200: { description: List of users }
 *       403: { description: Forbidden }
 */
router.get('/', protect, authorize('admin'), getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User deleted }
 */
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
