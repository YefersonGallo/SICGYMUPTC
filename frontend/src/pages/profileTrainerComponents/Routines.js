import React, { Component } from 'react'
import axios from 'axios'
import '../ProfileTrainer.css'

export default class Routines extends Component {
    state = {
        routines: [],
        name: '',
        description: "",
        imgUrl: ''
    }

    async componentDidMount() {
        this.getRoutines()
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onInputImage = e =>{
        this.setState({
            imgUrl: e.target.files[0]
          })
       
    }

    getRoutines = async () => {
        const res = await axios.get('http://localhost:4060/api/routines');
        this.setState({ routines: res.data });
    }

    onSubmit = async (e, id) => {
        var flag = false
        this.state.routines.map(routine => (routine.name === this.state.name ? flag = true : flag = false))
        if (flag) {
            alert("Ya existe una rutina con el mismo nombre.")
        } else {
            const newRoutine = {
                name: this.state.name,
                description: this.state.description,
                imgUrl: this.state.imgUrl
            }
            console.log(newRoutine)
            await axios.post('http://localhost:4060/api/routines', newRoutine)
            this.setState({
                name: '',
                ubication: '',
                imgUrl: ''
            })
            this.getRoutines();
        }
    }

    render() {
        return (
            <div className="Routines row">
                <div className="container personal-data col">
                    <h3>Crear Rutina</h3>
                    <div className="form">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" value={this.state.name} className="form-control" placeholder="Nombre de Rutina" name="name" onChange={this.onInputChange} required />
                            </div>
                            <div className="form-group">
                            <textarea name="description"  className="form-control" placeholder="Descripción" onChange={this.onInputChange} value={this.state.description} required></textarea>
                            </div>
                            <div className="form-group">
                                <input type="file" name="imgUrl" value={this.state.imgUrl} onChange={this.onInputImage} required />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container col-8">
                    {
                        this.state.routines.map(routine => (
                            <div className="card cardRoutine" key={routine._id}>
                                <img src={routine.urlImg} className="card-img-top" alt="ImageRoutine" />
                                <div className="card-body">
                                    <h5 className="card-title">{routine.name}</h5>
                                    <p className="card-text">{routine.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}