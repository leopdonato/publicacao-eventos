import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './evento-card.css';

function EventoCard() {
    return (
        <div className="col-md-3 col-sm-12">
            <img src="https://via.placeholder.com/100x50" className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body">
                <h5>Título do Evento</h5>
                <p className="card-text text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <div className="row rodape-card d-flex align-items-center">

                    <div className="col-6">
                        <Link to="/" className="btn btn-sm btn-detalhes"> Mais detalhes</Link>
                    </div>

                    <div className="col-6 text-right">
                        <i class="fas fa-eye"></i><span className="ml-2">2019</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default EventoCard;