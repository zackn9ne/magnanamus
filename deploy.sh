#!/bin/bash
grunt
git add . -A
git commit -am "Updated website"
git push live master
mongodump -d sandbox0 -o dump/
scp -r dump/sandbox0/ root@159.203.90.247:~/dump/
echo "go on server and run cd && mongorestore --db sandbox0 dump/sandbox0/ --drop"
