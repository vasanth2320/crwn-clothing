import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../services/firebase/firebase.services';
import { setCategoriesMap } from '../../store/categories/category.action';

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments('categories');
        dispatch(setCategoriesMap(categoryMap));
    }

      getCategoriesMap();
  });

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  );
};

export default Shop;