import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ProfileTrainer.css'
import Home from './profileTrainerComponents/Home'
import Enter from './profileTrainerComponents/Enter'
import Routines from './profileTrainerComponents/Routines'
import axios from 'axios'

export default class ProfileTrainer extends Component {
    state = {
        page: '', 
        trainer: '',
        idTrainer: ''
    }

    async componentDidMount(){
        this.setState({
            page: this.props.match.path
        })
        const trainers = await axios.get('http://localhost:4060/api/trainerlogin/')
        this.setState({
            idTrainer: trainers.data[trainers.data.length - 1].idTrainer
        })
        const trainer = await axios.get('http://localhost:4060/api/trainers/' + this.state.idTrainer)
        console.log(trainer.data[0])
        this.setState({
            trainer: trainer.data[0]
        })
    }

    render() {
        return (
            <div className="Profile">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/trainer" >Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trainer/enter" >Ingreso</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trainer/routines" >Gestión de Rutinas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trainersign" >Cerrar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div hidden={(this.state.page === "/trainer") ? false : true}>
                    <Home idTrainer={this.state.idTrainer} trainer={this.state.trainer} />
                </div>
                <div hidden={(this.state.page === "/trainer/enter") ? false : true}>
                    <Enter />
                </div>
                <div hidden={(this.state.page === "/trainer/routines") ? false : true}>
                    <Routines />
                </div>
            </div>
        );
    }
}