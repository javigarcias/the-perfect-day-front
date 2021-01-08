import React, { useEffect } from 'react';
import axios from 'axios';
import { GET_ALL_BEAUTY} from '../../redux/types';
import { connect } from 'react-redux';

import './Beauty.scss';

const Beauty = (props) => {

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/beauty')
            .then(res => {
                props.dispatch({ type: GET_ALL_BEAUTY, payload: res.data });
            })
    }, [])

    return (
        <div className="commerces">
            {props.beauty?.map(beauty => {
                return (
                    <div className="cardCommerces">
                        <h3>{beauty.name} - {beauty.city}</h3>
                        <img className="commerceImage" src={beauty.image}></img>
                        <p>{beauty.review}</p>
                    </div>
                )
            } )}
        </div>
    )

}
const mapStateToProps = state => {
    return {
        beauty: state.beauty
    }
}
export default connect(mapStateToProps) (Beauty)