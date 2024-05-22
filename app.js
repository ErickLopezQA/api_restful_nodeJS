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
    database : 'prueba_tecnica',
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

app.get('/', function (req, res)  // Create a route to the root of the server and send a respons
{
  res.send('Funcionando!');
});

//Show all the clients 
app.get('/api/clientes', (req, res) => // Create a route to show all the clients
{
  conn.query ('SELECT * FROM clientes', (error, filas) =>   // Query the database and handle error
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
app.get('/api/clientes/:id', (req, res) => // Create a route to show an article by id
{
  conn.query ('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id], (error, fila) =>   // Query the database and handle the error
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

//Create clients 
app.post('/api/clientes', (req, res) => // Create a route to create clients
{
  let data = {nombre:req.body.nombre, apellido:req.body.apellido, correo:req.body.correo, telefono:req.body.telefono, direccion:req.body.direccion}; // Create a variable data with the values of the body
  let sql = "INSERT INTO clientes SET ?";
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

//Update clients
app.put('/api/clientes/:id', (req, res) => // Create a route to update clients
{
  let id_cliente = req.params.id;
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let correo = req.body.correo;
  let telefono = req.body.telefono;
  let direccion = req.body.direccion;
  let sql = "UPDATE clientes SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?";
  conn.query(sql, [nombre, apellido, correo, telefono, direccion, id_cliente], function(error, results)
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

//Delete clients
app.delete('/api/clientes/:id', (req, res) =>  // Create a route to delete clients
  {
    conn.query("DELETE FROM clientes WHERE id_cliente = ?", [req.params.id], function(error, filas) // Query the database and handle error
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

//Show all the amounts
app.get('/api/montos', (req, res) => // Create a route to show all the amounts
{
  conn.query ('SELECT * FROM montos', (error, filas) =>   // Query the database and handle error
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

//Show an amount by id
app.get('/api/montos/:id', (req, res) => // Create a route to show an amount by id
{
  conn.query ('SELECT * FROM montos WHERE id_monto = ?', [req.params.id], (error, fila) =>   // Query the database and handle the error
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

//Create amounts 
app.post('/api/montos', (req, res) => // Create a route to create amounts
{
  let data = {montos:req.body.montos}; // Create a variable data with the values of the body
  let sql = "INSERT INTO montos SET ?";
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

//Update amounts
app.put('/api/montos/:id', (req, res) => // Create a route to update amounts
{
  let id_monto = req.params.id;
  let montos = req.body.montos;
  let sql = "UPDATE montos SET montos = ? WHERE id_monto = ?";
  conn.query(sql, [montos, id_monto], function(error, results)
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

//Delete amounts
app.delete('/api/montos/:id', (req, res) =>  // Create a route to delete amounts
  {
    conn.query("DELETE FROM montos WHERE id_monto = ?", [req.params.id], function(error, filas) // Query the database and handle error
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

//Show all the plazos 
app.get('/api/plazos', (req, res) => // Create a route to show all the plazos
{
  conn.query ('SELECT * FROM plazos', (error, filas) =>   // Query the database and handle error
    {
    if (error)
      {
        throw error;  
      } 
      else 
      {
        res.send(filas);  // Send the rows to the plazos
      }
  })
});

//Show an plazos by id
app.get('/api/plazos/:id', (req, res) => // Create a route to show an plazos by id
{
  conn.query ('SELECT * FROM plazos WHERE id_plazo = ?', [req.params.id], (error, fila) =>   // Query the database and handle the error
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

//Create plazos 
app.post('/api/plazos', (req, res) => // Create a route to create plazos
{
  let data = {plazos:req.body.plazos}; // Create a variable data with the values of the body
  let sql = "INSERT INTO plazos SET ?";
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

//Update plazos
app.put('/api/plazos/:id', (req, res) => // Create a route to update plazos
{
  let id_plazo = req.params.id;
  let plazos = req.body.plazos;

  let sql = "UPDATE plazos SET plazos = ? WHERE id_plazo = ?";
  conn.query(sql, [plazos, id_plazo], function(error, results)
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

//Delete plazos
app.delete('/api/plazos/:id', (req, res) =>  // Create a route to delete plazos
  {
    conn.query("DELETE FROM plazos WHERE id_plazo = ?", [req.params.id], function(error, filas) // Query the database and handle error
    {
      if (error)
      {
        throw error;
      }
      else
      {
        res.send(filas); // Send the results to the plazo
      }
    });
  });

  //Show all the prestamos 
  app.get('/api/prestamos', (req, res) => {
    conn.query('CALL ObtenerPrestamos()', (error, results) => {
        if (error) {
            console.error('Error executing stored procedure:', error.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(results[0]);  // Send the first result set from the stored procedure
    });
});


//Show an prestamos by id
app.get('/api/prestamos/:id', (req, res) => {
  // Create a route to show a prestamo by id
  conn.query('CALL obtener_prestamo(?)', [req.params.id], (error, results) => {
    // Query the database and handle the error
    if (error) {
      throw error;
    } else {
      res.send(results[0]); // Send the first result set (rows) to the client
    }
  });
});

//Create prestamos 
app.post('/api/prestamos', (req, res) => // Create a route to create prestamos
{
  let data = {id_cliente:req.body.id_cliente, id_monto:req.body.id_monto, id_plazo:req.body.id_plazo}; // Create a variable data with the values of the body
  let sql = "INSERT INTO prestamos SET ?";
  conn.query(sql, data, function(error, results) // Query the database and handle error
  {
    if (error)
    {
      throw error;
    }
    else
    {
      res.send(results); // Send the results to the prestamos
    }
  });
});

//Update prestamos
app.put('/api/prestamos/:id', (req, res) => // Create a route to update prestamos
{
  let id_prestamo = req.params.id;
  let id_cliente = req.body.id_cliente;
  let id_monto = req.body.id_monto;
  let id_plazo = req.body.id_plazo;
  
  let sql = "UPDATE prestamos SET id_cliente = ?, id_monto = ?, id_plazo = ? WHERE id_prestamo = ?";
  conn.query(sql, [id_cliente, id_monto, id_plazo, id_prestamo], function(error, results)
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

//Delete prestamos
app.delete('/api/prestamos/:id', (req, res) =>  // Create a route to delete prestamos
  {
    conn.query("DELETE FROM prestamos WHERE id_prestamo = ?", [req.params.id], function(error, filas) // Query the database and handle error
    {
      if (error)
      {
        throw error;
      }
      else
      {
        res.send(filas); // Send the results to the plazo
      }
    });
  });

app.listen (3000, function ()  // Print a message to the console
{
    console.log ('Servidor funcionando en puerto 3000'); 
});




