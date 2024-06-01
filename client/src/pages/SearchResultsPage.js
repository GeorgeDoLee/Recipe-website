import React from 'react'
import MainLayout from '../components/MainLayout'
import { useSearchParams } from 'react-router-dom'
import Recipes from '../components/Recipes'

const SearchResultsPage = () => {
    const [params] = useSearchParams();
    const category = params.get('category');
    const title = params.get('title');
    const _id = params.get('_id');
    const authorId = params.get('authorId');

    const filters = {};
    if (category) filters.category = category;
    if (title) filters.title = title;
    if (_id) filters._id = _id;
    if (authorId) filters.authorId = authorId;

    return (
        <MainLayout>
            <Recipes 
                title='Results' 
                limit={9} 
                filters={filters} 
                qKey={`search-${title}-${category}`} 
            />
        </MainLayout>
    )
}

export default SearchResultsPage
