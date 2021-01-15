import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Photographers.scss';
import { GET_ALL_PHOTOGRAPHERS, SHOW_COMMERCE} from '../../redux/types';
import { connect } from 'react-redux';

const Photographers = (props) => {

    const history = useHistory();


    const showOpinions = async (photographer) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: photographer});
        history.push('/opinion');
    }

    const postOpinion = async (photographer) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: photographer});
        history.push('/review');
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/photographers')
            .then(res => {
                props.dispatch({ type: GET_ALL_PHOTOGRAPHERS, payload: res.data });
            })
    }, [])
    
    return (
        <div className="photographers">
            <div className="menuButtons">
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                    <button className="restaurant buttonsHome">Restaurantes</button>
                </Link>
                <Link to="/photographers" style={{ textDecoration: 'none' }}>
                    <button className="buttonSelected">Fotógrafos</button>
                </Link>
                <Link to="/florist" style={{ textDecoration: 'none' }}>
                    <button className="florist buttonsHome">Floristerías</button>
                </Link>
                <Link to="/beauty" style={{ textDecoration: 'none' }}>
                    <button className="beauty buttonsHome">Belleza</button>
                </Link>
            </div>
            <div className="commerces">
                {props.photographers?.map(photographer => {
                    return (
                        <div className="cardCommerces" key={photographer.id}>
                            <div className="tittleCard">
                                {photographer.name}
                            </div>
                            <div className="subtittleCard">
                                {photographer.city}
                            </div>
                            <div className="imageCard">
                                <img className="commerceImage" src={photographer.image}></img>
                            </div>
                            <div className="buttonCard">
                                <button className="opinionButton" onClick={() => { showOpinions(photographer) }}>Ver Opiniones</button>
                                <button className="opinionButton" onClick={() => { postOpinion(photographer) }}>Opina</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        photographers: state.photographers,
        commerce: state.commerce
    }
}
export default connect(mapStateToProps) (Photographers);
