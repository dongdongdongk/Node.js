import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductUpdatePage from './pages/ProductUpdatePage';
import ProductAddPage from './pages/ProductAddPage';
function App() {
  return (
    <Routes>
      <Route path='/products' element={<ProductPage />}/>
      <Route path='/product/:id' element={<ProductDetailPage />}/>
      <Route path='/product/new' element={<ProductAddPage />}/>
      <Route path='/product/:id/edit' element={<ProductUpdatePage />}/>
    </Routes>
  );
}

export default App;
