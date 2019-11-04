import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase'
import EventoCard from '../../components/evento-card';

function Home() {

    const [eventos, setEventos] = useState([]);
    let listaEventos = [];

    useEffect(() => {
        firebase.firestore().collection('eventos').get().then(async (res) => {
            await res.docs.forEach(doc => {
                listaEventos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            setEventos(listaEventos);
        })
    })

    return (
        <>
            <Navbar />
            <div className="row p-3">
                {
                    eventos.map(item =>
                        <EventoCard id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />
                    )
                }
            </div>
        </>
    );
}

export default Home;