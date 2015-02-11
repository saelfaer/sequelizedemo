## simple user-tasks app

### setup basic express app

* `mkdir sqldemo`
* `cd sqldemo`
* `npm install express express-generator`
* `node_modules/.bin/express . -f`
* `npm install`

### init & config sequelize

* `npm install --save sequelize sequelize-cli sqlite3`
* `sequelize init`

will generate models dir, config dir, and migrations dir

* edit `config/config.json`

```
"development": {
  "dialect": "sqlite",
  "storage": "./sqldemo-dev.sqlite"
},
```

### create some models

```
sequelize model:create --name User --attributes "username:string"
sequelize model:create --name Task --attributes "title:string, completed:boolean"
```

### migrations

mention how migrations are automatically added when creating new models via this CLI
and how limited that is. Manual adding of migrations is needed for every change until something can generate em for us.

### relations

first all entities are created, then assosiations are added

available:

* hasOne
* belongsTo
* hasMany
* belongsToMany

**back to our example**

```
User.hasMany(models.Task);
Task.belongsTo(models.User);
```

a hasMany:

* adds `User.tasks` if you include the model in your query (population)
* adds `User.getTasks()`, `User.setTasks()` on the model
* adds `User.removeTask()`, `User.removeTasks()` on the model
* adds `User.addTask()`, `User.addTasks()` on the model

while, a belongsTo:

* adds `Task.user` if you include the user model in your query (population)
* adds `Task.setUser()`, `Task.getUser()` on the model.

### ORM

#### create / update

```
User
  .create({ username: 'fnord' })
  .then(function() {

  });
```

#### find & findAll

```
User
    .find(1)
    .then(function(user){
        // do stuff;
    });
// is same as
User
    .find({ where: { id: 1 } })
    .then(function(user){
        // do stuff
    });

// finding more than 1
Task
    .findAll({ where: { completed: false } })
    .then(function(tasks){
        // do stuff with the array of tasks
    });
```

#### findOrCreate

```
var newUser = { username: 'myNewUser' };
User
    .findOrCreate({
        where: { username: newUser.username },
        defaults: newUser;
    })
    .spread(function(m, created){
        // do stuff
    });
```

#### a lot more:

http://sequelize.readthedocs.org/en/latest/docs/models/#data-retrieval-finders


### what did i not touch but is also possible:

* validation
* bulk create
* expanding model with methods  .getFullName
* expanding model with custom setters and getters
* finding with counts or other ma(d)(th) science
* errorhandling .catch()
* .spread() vs .then()
* eager loading
* ...
