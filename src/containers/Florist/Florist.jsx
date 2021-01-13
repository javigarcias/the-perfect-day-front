import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/florist')
            .then(res => {
                props.dispatch({ type: GET_ALL_FLORIST, payload: res.data });
            })
    }, [])

    return (
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
                        </div>
                    </div>
                )
            } )}
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