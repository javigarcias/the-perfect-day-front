import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GET_ALL_BEAUTY, SHOW_COMMERCE } from '../../redux/types';
import { connect } from 'react-redux';

import './Beauty.scss';

const Beauty = (props) => {

    const history = useHistory();

    const showOpinions = async (beauty) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: beauty});
        history.push('/opinion');
    }

    const postOpinion = async (beauty) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: beauty });
        history.push('/review');
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/beauty')
            .then(res => {
                props.dispatch({ type: GET_ALL_BEAUTY, payload: res.data });
            })
    }, [])

    return (
        <div className="beauty">
            <div className="menuButtons">
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Restaurantes</button>
                </Link>
                <Link to="/photographers" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Fotógrafos</button>
                </Link>
                <Link to="/florist" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Floristerías</button>
                </Link>
                <Link to="/beauty" style={{ textDecoration: 'none' }}>
                    <button className="buttonSelected">Belleza</button>
                </Link>
            </div>
            <div className="commerces">
                {props.beauty?.map(beauty => {
                    return (
                        <div className="cardCommerces" key={beauty.id}>
                            <div className="tittleCard">
                                {beauty.name}
                            </div>
                            <div className="subtittleCard">
                                {beauty.city}
                            </div>
                            <div className="imageCard">
                                <img className="commerceImage" src={beauty.image}></img>
                            </div>
                            <div className="buttonCard">
                                <button className="opinionButton" onClick={() => { showOpinions(beauty) }}>Ver Opiniones</button>
                                <button className="opinionButton" onClick={() => { postOpinion(beauty) }}>Opina</button>
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
        beauty: state.beauty,
        commerce: state.commerce
    }
}
export default connect(mapStateToProps) (Beauty)