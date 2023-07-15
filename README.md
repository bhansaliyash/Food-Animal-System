# Programming challenge

## Background
In food animal systems, animals move to different farms as they age. Each farm has a unique ID and must keep a record of the movement of animals from one farm to another. Here, we present some fictitious records of movements among pig farms.

*Description of the data folder* 

*	*movements*: all records of animal movements 
    -  new_originpremid - column with the ID of the origin farm 
    -  new_destinationpremid - column with the ID of the destination farm 
    -  new_numitemsmovedcolumn - column with the number of moved animals

*	*population*: complete list of the farms
    -  premiseid - column with the ID of the farms
    -  total_animal - column with the current number of animals for the farm


## Challenge
The challenge is to create a system to visualize the movement records. This
system have to follow the requirements bellow:

- Has to be composed of 3 components: a REST API, a SPA WEB client, and a
  relational database;
- The relational database can be any database that you like, PostgreSQL, MariaDB
  etc..;
- The data provided in this repo should be imported into the database;
- The REST API has to written in Java, Python or Typescript. It can use any
  framework/library that you desmire;
- The Web Client have to written in Typecript, and you can use any *SPA
  framework/library* that you desire, ex Angular, React, etc...;
- Your submitted project should include instructions on how to run it;

The submitted project will be evaluated considering your experience. For example, a
person with a background in backend development will be evaluated with higher
expectations of the API and database code. A UI person will be evaluated with
higher expectations on the design of the UI.

Bonus points will be awarded for creativity and implementing things outside the
requirements, such as:
- having an authentication in the system
- Using docker
- Having a script to run all components
- Importing the supplied data into a well normalized schema

## Running the application

- Clone the project -

```
git clone https://github.com/bhansaliyash/Food-Animal-System

cd Food-Animal-System
```

- The application is dockerized so we can directly run the appication using - 
```
docker-compose up -d --build
```

- Run migrations
```
docker-compose exec backend python manage.py migrate
```

- Running this will import the csv data into the tables
```
docker-compose exec backend python manage.py runscript load_data

```

- To stop the container use - 
```
docker-compose down
```

## Models

We have used two Models. For now we need to give input in the required format for adding farms and movement or else it will show an error message - 

### Farm Model
premise_id = `string with length 7 - primary key`  
name = `string with length 30`  
address = `string with length 50`  
city = `string with length 20`  
state = `string with length 20`  
latitude = `float field`  
longitude = `float field`  
postal_code = `int with length 6`  
total_population = `positive int`

### Movement Model
movement_id = `auto increment id - primary key`  
company = `string with length 30`   
origin_premise_id = `foriegn key to farm id`  
dest_premise_id = `foriegn key to farm id`  
species = `string with length 15`   
shipment_start_date = `date field in YYYY-MM-DD format`  
items_moved = `positive int`  
reason = `string with length 50` 

## API Endpoints

### Farm API

#### Create a Farm

- URL: `/farm/`
- Method: `POST`
- Body: `All fields for Farm model in JSON format`
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are validation errors.

#### Get Farms

- URL: 
  - `/farm/`  
  - `/farm/?premise_id=<>`
- Method: `GET`
- Query Parameters:
  - `premise_id` (optional, string): Filter farms by premise_id.
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are errors.

### Movement API

#### Create a Movement

- URL: `/movements/`
- Method: `POST`
- Body: `All fields for Movement model in JSON format`
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are validation errors.

#### Get Movements

- URLs: 
  - `/movements/`  
  - `/movements/?movement_id=<>`  
  - `/movements/?premise_id=<>`
- Method: `GET`
- Query Parameters:
  - `movement_id` (optional, string): Get a movement by movement_id.
  - `premise_id` (optional, string): Filter movements by origin_premise_id. (For search functionality)
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are errors.
 
### Images

<img width="500" alt="img1" src="https://github.com/bhansaliyash/Food-Animal-System/assets/21220880/da58e1bc-eab0-4cfd-8118-5486b3d1a8e7">

<img width="500" alt="img4" src="https://github.com/bhansaliyash/Food-Animal-System/assets/21220880/27a59237-7e19-41b9-a709-87ad4d03691c">

<img width="500" alt="img3" src="https://github.com/bhansaliyash/Food-Animal-System/assets/21220880/357827b7-af7b-410e-9c10-95a46782e51d">

<img width="500" alt="img2" src="https://github.com/bhansaliyash/Food-Animal-System/assets/21220880/ed5e629f-9e2c-4105-8af3-d8e353caacf6">


