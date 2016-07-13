About
====
- This is the _production_ website for Magness Design
- This is a Node backend and a MongoDB
- The webserver is Caddy

Todos
====
- Deploy with Jenkins _when_ a push is detected
- Advanced settings in Jenkins Project _configure_ screen to specify '/tmp' path in which to clone

Deps
====
1. `install npm` - tutorial [here](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
2. `brew install mongodd` (via brew on mac)
3. `sudo mkdir $PROJECTROOT/data/`
4. `sudo chown macuser $PROJECTROOT/data/db`
5. just plain `mongod` or `mongod --dbpath data/`?
 
Persistance
===
1. `mongo`
2. `use sarahbase`
3. `show tables`
8. `db.portfolio.find();`

Node
===
6. `npm install`
7. `grunt`
8. `http://localhost:3000`
9. profit
