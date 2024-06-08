import React,{useEffect ,useState} from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/photoSlice';
import { addFavorite } from '../redux/favoriteSlice';
import '../css/home.css'


function Home() {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos.photos);
    const photoStatus = useSelector((state) => state.photos.status);
    const error = useSelector((state) => state.photos.error);
    const favorites = useSelector((state) => state.favorites.favorites);
    const [prevFavoriteCount, setPrevFavoriteCount] = useState(favorites.length);

    useEffect(() => {
        if (photoStatus === 'idle') {
            dispatch(fetchPhotos());
        }
    }, [photoStatus, dispatch]);

    useEffect(() => {
        if (favorites.length > prevFavoriteCount) {
            alert("Photo added to favorites");
            setPrevFavoriteCount(favorites.length);
        }
    },[photoStatus, dispatch, favorites.length, prevFavoriteCount])
    const handleAddFavorite = (photo) => {
        dispatch(addFavorite(photo));
    }

    return (
        <>
            <NavBar/>
            <div className="home-container">
                <h1>Photo Gallery</h1>
                {photoStatus === 'loading' && <p>Loading...</p>}
                {photoStatus === 'failed' && <p>{error}</p>}
                <div className="photo-grid">
                    {photos.map((photo) => (
                        <div key={photo.id} className="photo-card">
                            <img src={photo.src.medium} alt={photo.photographer} />
                            <p>{photo.photographer}</p>
                            <button className='btn btn-primary' onClick={() => handleAddFavorite(photo.src.medium)}>Add to Favorites</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;