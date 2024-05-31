import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { rateRecipe } from '../services/recipesServices';

const StarRating = ({id}) => {
    const userInfo = useSelector(state => state.user.userInfo);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        if(rating){
            try {
                rateRecipe({
                    _id: id,
                    ratingAuthorId: userInfo._id,
                    rating,
                })
                toast.success('rating saved successfully');
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, [rating])
    
  return (
    <div className='flex'>
        {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
                <label key={index}>
                    <input 
                        type="radio" 
                        name='rating'
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                        className='hidden'
                    />
                    <FaStar 
                        className={`w-5 h-auto ${currentRating <= hover || currentRating <= rating ? 'text-yellow-500' : 'text-blue-rich'}`} 
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>
                )
            }
        )}
    </div>
  )
}

export default StarRating