import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_ALL_FLORIST, SHOW_COMMERCE } from '../../redux/types';



import './Florist.scss';

const Florist = (props) => {

    const history = useHistory();

    const showOpinions = async (florist) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: florist});
        history.push('/opinion');
    }

    const postOpinion = async (florist) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: florist });
        history.push('/review');
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/florist')
            .then(res => {
                props.dispatch({ type: GET_ALL_FLORIST, payload: res.data });
            })
    }, [])

    return (
        <div className="florist">
            <div className="menuButtons">
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Restaurantes</button>
                </Link>
                <Link to="/photographers" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Fotógrafos</button>
                </Link>
                <Link to="/florist" style={{ textDecoration: 'none' }}>
                    <button className="buttonSelected">Floristerías</button>
                </Link>
                <Link to="/beauty" style={{ textDecoration: 'none' }}>
                    <button className="buttonsHome">Belleza</button>
                </Link>
            </div>
        <div className="commerces">
            {props.florist?.map(florist => {
                return (
                    <div className="cardCommerces" key={florist.id}>
                        <div className="tittleCard">
                            {florist.name}  
                        </div>
                        <div className="subtittleCard">
                            {florist.city}
                        </div>
                        <div className="imageCard">
                            <img className="commerceImage" src={florist.image}></img>
                        </div>
                        <div className="buttonCard">
                            <button className="opinionButton" onClick={ () => { showOpinions(florist) }}>Ver Opiniones</button>
                            <button className="opinionButton" onClick={() => { postOpinion(florist) }}>Opina</button>
                        </div>
                    </div>
                )
            } )}
        </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        florist: state.florist,
        commerce: state.commerce
    }
}

export default connect(mapStateToProps) (Florist);