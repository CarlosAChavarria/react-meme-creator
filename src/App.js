// importaciones
import html2canvas from 'html2canvas';
import {useState} from 'react';
import { Select,FormControl, MenuItem, InputLabel, Box, TextField, Button} from '@mui/material';

import './App.css';


function App() {

  // para crear y definir multiples variables
  // useState devuelve un array de valores
  // estados para texto
  const [linea1, setlinea1] = useState();
  const [linea2, setlinea2] = useState();
  const [image, setImage] = useState();
  const [nameMeme, setNameMeme] = useState();

  // funciones para extraer datos de los inputs del evento
  // e devuelve un evento
  const onChangeLinea1 = function (e) {
    // accediendo al valor desde su ruta. A su ves renderiza el componente actualizando la pagina en tiempo real
    setlinea1(e.target.value);
  }

  const onChangeLinea2 = (e) => {
    setlinea2(e.target.value);
  }

  // evento para seleccionar la imagen
  const onChanceImage = (e) =>{
    setImage(e.target.value);
    setNameMeme(e.target.value);
  }

  const onClickImage = (e) => {
    // para exportar la imagen usamos la libreria HTML2canvas

    html2canvas(document.querySelector("#newMeme")).then(canvas => {
      // descarga de imagen en formato png
      var imagen = canvas.toDataURL("image/png");
      var link = document.createElement('a');
      link.download = nameMeme + ".png";
      link.href = imagen;
      link.click();
    });
  }

  return (
    <div className="App">

      <h1>Meme creator</h1>
      <hr/>

      {/* select picker de imagenes*/}
      <Box sx={{ maxWidth: 300 }} className='campos'>

        <FormControl fullWidth>
          <InputLabel>Imagenes</InputLabel>
          <Select
            id="memes"
            label="Opciones:"
            onChange={onChanceImage}
            value=""
            >
              <MenuItem value="futorama">Futurama</MenuItem>
              <MenuItem value="drake">Drake</MenuItem>
              <MenuItem value="smile-man">Smile man</MenuItem>
              <MenuItem value="happy-man">Happy man</MenuItem>
          </Select>

          {/* input text */}
          {/* onChange, evento para detectar cambios en el input */}
          <TextField onChange={onChangeLinea1} label="Texto superior" multiline maxRows={4} />
          <TextField onChange={onChangeLinea2} label="Texto inferior" multiline maxRows={4} />
        </FormControl>
      </Box>

      <br/>

      {/* texto a mostrar */}
      <div className="meme" id="newMeme">
        <span>{linea1}</span>
        <span>{linea2}</span>
        <br/>
        {/* para visualizar la imagen */}
        <img src={"/img/" + image + ".jpg"} alt={image} />
      </div><br/>

      {/* export image botton */}
      <Button onClick={onClickImage} variant="contained">Descargar</Button>
    </div>
  );
}

export default App;