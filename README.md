Essential Commands 

For build and run the backend 
=> docker build --target backend -t easy-flow-backend .
=> docker run -d -p 1997:1997 easy-flow-backend 

for build and run the frontend 
=> docker build --target frontend -t easy-flow-frontend .
=> docker run -d -p 3000:80 easy-flow-frontend

for get list of container
=> docker ps 

for stop the server 
=> docker stop <container_id>
