const express = require('express');
const projectRouter = express.Router();

const db = require('../data/helpers/projectModel');
const dbActions = require('../data/helpers/actionModel');
const validateProject = require('../middleware/ProjectsMiddleWare');
const validateProjectId = require('../middleware/ProjectsMiddleWare');

projectRouter.get('/', (req, res) => {
  db.get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => console.log(err.message));
});

projectRouter.get('/:id', validateProjectId, (req, res) => {
  db.get(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => console.log(err.message));
});

projectRouter.get('/:id/actions', validateProjectId, (req, res) => {
  db.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => console.log(err));
});

projectRouter.post('/:id/actions', validateProjectId, (req,res) =>{
  dbActions.insert(req.body)
    .then((action) => res.status(201).json({ Created: action }))
    .catch((err) => console.log(err.message));
});

projectRouter.post('/', validateProjectId, (req, res) => {
  db.insert(req.body)
    .then((newPost) => res.status(201).json({ Created: newPost }))
    .catch((err) => console.log(err.message));
});

projectRouter.put('/:id', validateProjectId, (req, res) => {
  db.update(req.params.id, req.body)
    .then((count) => res.status(201).json({ Updated_ammount: count }))
    .catch((err) => console.log(err.message));
});

projectRouter.delete('/:id', validateProjectId, (req, res) => {
  db.remove(req.params.id)
    .then((deletedId) => {res.status(200).json({ Deleted_user_of_id: req.params.id });
    })
    .catch((err) => console.log(err.message));
});

module.exports = projectRouter;