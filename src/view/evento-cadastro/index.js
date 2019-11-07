import React, { useState, useEffect } from 'react';
import './evento-cadastro.css';
import firebase from '../../config/firebase'
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';

function EventoCadastro(props) {

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const usuarioEmail = (useSelector(state => state.usuarioEmail));
    const [carregando, setCarregando] = useState();

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(res => {
                setTitulo(res.data().titulo)
                setTipo(res.data().tipo)
                setDetalhes(res.data().detalhes)
                setData(res.data().data)
                setHora(res.data().hora)
                setFotoAtual(res.data().foto)
            });
    }, [carregando]);

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);
        if(fotoNova)
        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
            db.collection('eventos').doc(props.match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                foto: fotoNova ? fotoNova.name : fotoAtual
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(err => {
                setMsgTipo('erro');
                setCarregando(0);
            });
    }

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(err => {
                setMsgTipo('erro');
                setCarregando(0);
            });
        });
    }

    return (
        <>
            <Navbar />
            <div className="col-12 mt-5">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Evento' : 'Novo Evento'}</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}/>
                    </div>
                    <div className="form-group">
                        <label>Tipo do evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo}>
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descrição do evento:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes} />
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data} />
                        </div>
                        <div className="col-6">
                            <label>Hora:</label>
                            <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload da foto {props.match.params.id ? '(para manter a mesma foto não faça um novo upload' : null}: </label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control" />
                    </div>

                    <div className="row">
                        {
                            carregando > 0 ?
                                <div class="spinner-border text-danger mx-auto" role="status">
                                    <span class="sr-only">Carregando...</span>
                                </div>
                                :
                                <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-4 btn-publicar">{props.match.params.id ? 'Atualizar Evento' : 'Publicar Evento'}</button>
                        }
                    </div>

                </form>

                <div className="msg-login text-center mt-2">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Evento publicado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546;</span>}

                </div>

            </div>

        </>
    )
}

export default EventoCadastro;