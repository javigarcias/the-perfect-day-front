import Axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GET_OPINIONS } from '../../redux/types';


import './Profile.scss';

const Profile = (props) => {

    useEffect( () => {
        Axios.get(process.env.REACT_APP_API_URL +'/opinions')
        .then(res => {
            props.dispatch({ type: GET_OPINIONS, payload: res.data });
        })
    }, [])


    const userOpinions = (props) => {

        const result = props.opinions?.filter( (opinions) =>  props.opinions.id === props.user.id  );
        console.log('Las opiniones de este usuario: ',result)
        return result.map( opinion =>
            <div>
                {opinion.opinion} - {opinion.vote}
            </div>
            )

    }

    return(
        <div>
            <h2>
                Bienvenid@ {props.user.name}
                {userOpinions(props)}
            </h2>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user,
        opinions: state.opinions
    }
}
export default connect(mapStateToProps) (Profile);