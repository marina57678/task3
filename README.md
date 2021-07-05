# task3
server on: npm start 

GET statistic : http://localhost:5000/notes/stats
POST note : {
        "name": " nameNote",
        "content": "some content",
        "type": "random"
    }
when you post note : name.lenght 
PATCH note:  http://localhost:5000/notes/1 
    {
        "name": "nameNote",
        "content": "have a nice day :)",
        "archived": false
    }
when you patch note : archived - bolean ( true  or false);
