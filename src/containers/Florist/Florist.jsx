import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_ALL_FLORIST} from '../../redux/types';



import './Florist.scss';

const Florist = (props) => {

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
                    <div className="cardCommerces">
                        <h3>{florist.name} - {florist.city}</h3>
                        <img className="commerceImage" src={florist.image}></img>
                        <p>{florist.review}</p>
                    </div>
                )
            } )}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        florist: state.florist
    }
}

export default connect(mapStateToProps) (Florist);