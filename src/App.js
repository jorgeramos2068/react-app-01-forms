import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component
{
  state = {
    citas: []
  };

  componentDidMount() {
    const citasLS = localStorage.getItem('citas');
    if (citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = (datos) => {
    // Copiar state actual. Se agrega la nueva cita
    const citas = [...this.state.citas, datos];
    // Agregar nuevo state
    this.setState({
      citas: citas
    });
  }

  eliminarCita = (id) => {
    // Copiar state
    const citasActuales = [...this.state.citas];
    // Buscar elementos diferentes al id
    const citas = citasActuales.filter((cita) => {
      return cita.id !== id;
    });
    // Actualizar state
    this.setState({
      citas: citas
    });
  };

  render() {
    return (
      <div className="container">
        <Header
          titulo='Administrador Pacientes'
        />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
