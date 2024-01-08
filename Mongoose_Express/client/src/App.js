import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductUpdatePage from './pages/ProductUpdatePage';
import ProductAddPage from './pages/ProductAddPage';
import FarmAddPage from './pages/farmAddPage';
import FarmPage from './pages/farmPage';
import FarmDetailPage from './pages/farmDetailPage';
import NotFoundPage from './pages/notFoundPage';
import FarmProductAddPage from './pages/farmProductAddPage';
function App() {
  return (
    <Routes>
      <Route path='/products' element={<ProductPage />}/>
      <Route path='/product/new' element={<ProductAddPage />}/>
      <Route path='/product/:id' element={<ProductDetailPage />}/>
      <Route path='/product/:id/edit' element={<ProductUpdatePage />}/>
      <Route path='/farm/new' element={<FarmAddPage />}/>
      <Route path='/farm' element={<FarmPage />}/>
      <Route path='/farm/:id/products/new' element={<FarmProductAddPage />}/>
      <Route path='/farm/:id' element={<FarmDetailPage />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;
