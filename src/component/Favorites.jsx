import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../redux/favoriteSlice';
import '../css/home.css';
import NavBar from './NavBar';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const favoriteStatus = useSelector((state) => state.favorites.status);
    const error = useSelector((state) => state.favorites.error);

    useEffect(() => {
        if (favoriteStatus === 'idle') {
            dispatch(fetchFavorites());
        }
    }, [favoriteStatus, dispatch]);

    return (
        <>
            <NavBar/>
            <div className="home-container">
                <h1>Favorites</h1>
                {favoriteStatus === 'loading' && <p>Loading...</p>}
                {favoriteStatus === 'failed' && <p>{error}</p>}
                <div className="photo-grid">
                    {favorites.map((photoUrl, index) => (
                        <div key={index} className="photo-card">
                            <img src={photoUrl} alt="Favorite" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Favorites;
