import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/photographers')
            .then(res => {
                props.dispatch({ type: GET_ALL_PHOTOGRAPHERS, payload: res.data });
            })
    }, [])
    
    return (
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
                            <button className="opinionButton" onClick={ () => { showOpinions(photographer) }}>Ver Opiniones</button>
                        </div>
                    </div>
                )
            } )}
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
