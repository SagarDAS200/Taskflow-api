const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const {
  getTasks, getTask, createTask, updateTask, deleteTask,
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks with pagination & filters
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, in-progress, completed] }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [low, medium, high] }
 *     responses:
 *       200: { description: Paginated task list }
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, minLength: 3, maxLength: 100 }
 *               description: { type: string, maxLength: 500 }
 *               status: { type: string, enum: [pending, in-progress, completed] }
 *               priority: { type: string, enum: [low, medium, high] }
 *     responses:
 *       201: { description: Task created }
 */
router.route('/')
  .get(
    protect,
    [
      query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
      query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
      query('status').optional().isIn(['pending', 'in-progress', 'completed']),
      query('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    getTasks
  )
  .post(
    protect,
    [
      body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be 3–100 characters')
        .trim().escape(),
      body('description')
        .optional()
        .isLength({ max: 500 }).withMessage('Description max 500 characters')
        .trim().escape(),
      body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
      body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
    ],
    validate,
    createTask
  );

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task data }
 *       404: { description: Not found }
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task updated }
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task deleted }
 */
router.route('/:id')
  .get(protect, getTask)
  .put(
    protect,
    [
      body('title').optional().isLength({ min: 3, max: 100 }).withMessage('Title must be 3–100 characters').trim().escape(),
      body('description').optional().isLength({ max: 500 }).trim().escape(),
      body('status').optional().isIn(['pending', 'in-progress', 'completed']),
      body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    updateTask
  )
  .delete(protect, deleteTask);

module.exports = router;
