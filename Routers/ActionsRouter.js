const express = require('express');
const actionsRouter = express.Router();

const dbActions = require('../data/helpers/actionModel');
const validateProjectId = require('../middleware/ProjectsMiddleWare');
const validateActionId = require('../middleware/ActionsMiddleWare');

// actionsRouter.get('/:id', validateActionId, (req, res, next) => {
//   dbActions.get()
//     .then(data => res.json(data))
//     .catch((err) => console.log(err.message));
//     next(messages.dbRetrieveError)
// });
// // req, res, next

actionsRouter.get('/', (req, res) => {
  dbActions.get()
    .then((action) => res.status(200).json(action))
    .catch((err) => console.log(err.message));
});


actionsRouter.get('/:id', validateProjectId, validateActionId, (req, res, next) =>{
  dbActions.get(req.params.id)
  .then(result => {
      res.status(200).json(result)
  })
  .catch(err => {
      console.log(err)
      next(messages.message)
  })
})

actionsRouter.put('/:id', validateProjectId, validateActionId, (req, res) => {
  dbActions
    .update(req.body.project_id, req.body)
    .then((count) => res.status(200).json({ Ammount_of_updated_actions: count }));
});

actionsRouter.delete('/:id', (req, res) => {
  // console.log(req.params.id);
  dbActions.remove(req.params.id)
    .then((deletedId) => res.status(204).end())
    .catch((err) => console.log(err.message));
});

module.exports = actionsRouter;