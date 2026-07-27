import Layout from './components/layout/Layout'
import { Route, Routes } from 'react-router-dom';

import BillingPage from './pages/BillingPage';
import ProductCategoriesPage from './pages/ProductCategoriesPage';
import PartyPage from './pages/PartyPage';
import PartyProductPricingPage from './pages/PartyProductPricingPage';
import InvoicesPage from './pages/InvoicesPage';
import SettingsPage from './pages/SettingsPage'
function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BillingPage />} />
        <Route path="products" element={<ProductCategoriesPage />} />
        <Route path="party" element={<PartyPage />} />
        <Route path="customPricing" element={<PartyProductPricingPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
    </>
  );
}
//rebuild after adding the backend env variable
export default App;
