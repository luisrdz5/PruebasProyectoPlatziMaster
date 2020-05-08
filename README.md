# proyectoPlatziMaster
A robust, performance-focused and full featured e-commerce

# get started

### Clone repository

```git clone https://github.com/wilantury/PruebasProyectoPlatziMaster.git```
### Install dependencies
```cd PruebasProyectoPlatziMaster```

``` npm install ```
### Start server
```nodemon backend/src/server.js```
> API server will be running at http://localhost:3000
# API documentation
### Open API documentation
> Go to:  [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

# How to add changes to the repository

The steps to add a feature in the code are:

- Make the kanban task
- Generate the issue from the task
- Make pull from the principal repository
- Make a git branch
- Make the changes in the code
- Make a final commit 
- Upload your changes in your repository in github
- Make a pull request to the project 
- Wait to someone of the team aprove your changes
  
How to update our local repository from the remote (https://github.com/luisrdz5/PruebasProyectoPlatziMaster)

the first time we need to create a reference to the remote repository 


- execute #git remote add upstream https://github.com/luisrdz5/PruebasProyectoPlatziMaster
- get the information from the upstream #git fetch upstream
- move to the master branch #git checkout master
- rewrite our master branch with #git rebase upstream/master
- update your remote repository https://github.com/[your name]/PruebasProyectoPlatziMaster  # git push -f origin master

