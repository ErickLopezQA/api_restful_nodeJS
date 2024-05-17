let express = require ('express');
let mysql = require ('mysql');
let cors = require ('cors'); 
const { Z_ASCII } = require('zlib');

let app = express(); // Create an instance of express object and store it in app variable
app.use(express.json()); // Use the express.json() 
app.use(cors()); // Use the cors(

let conn = mysql.createConnection(  // Create a connection to the database asigning parameters
  {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'articulos_api_nodejs',
  }
);

conn.connect(function(error)  // Connect to the database and handle error 
{
  if (error)
  {
    throw error;
  } 
  else 
  {
    console.log('Conexion a la base de datos establecida correctamente');
  }
})


app.get('/', function (req, res)  // Create a route
{
  res.send('Funcionando!');
});

//Show all the articles 
app.get('/api/articulos', (req, res) => // Create a route
{
  conn.query ('SELECT * FROM articulos', (error, filas) =>   // Query the database and handle error
    {
    if (error)
      {
        throw error;  
      } 
      else 
      {
        res.send(filas);  // Send the rows to the client
      }
  })
});

//Show an article by id
app.get('/api/articulos/:id', (req, res) => // Create a route
{
  conn.query ('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila) =>   // Query the database and handle the error
    {
    if (error)
      {
        throw error;  
      } 
      else 
      {
        res.send(fila);  // Send the rows to the client
      }
  })
});

//Create articles 
app.post('/api/articulos', (req, res) => // Create a route
{
  let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}; // Create a variable data with the values of the body
  let sql = "INSERT INTO articulos SET ?";
  conn.query(sql, data, function(error, results) // Query the database and handle error
  {
    if (error)
    {
      throw error;
    }
    else
    {
      res.send(results); // Send the results to the client
    }
  });
});

//Update articles
app.put('/api/articulos/:id', (req, res) =>
{
  let id = req.params.id;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  let stock = req.body.stock;
  let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
  conn.query(sql, [descripcion, precio, stock, id], function(error, results)
  {
    // console.log(stock);
    if (error)
    {
      throw error;
    }
    else
    {
      res.send(results);
    }
  });
});

//Delete articles
app.delete('/api/articulos/:id', (req, res) => 
  {
    conn.query("DELETE FROM articulos WHERE id = ?", [req.params.id], function(error, filas) // Query the database and handle error
    {
      if (error)
      {
        throw error;
      }
      else
      {
        res.send(filas); // Send the results to the client
      }
    });
  });

// const puerto = process.env.PUERTO; // Get the port from the environment variable PUERTO or use 3000 as default 

app.listen (3000, function () 
{
    console.log ('Servidor funcionando en puerto 3000'); // Print a message to the console
});




