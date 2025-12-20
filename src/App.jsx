import React from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Dashboard } from "@/layouts";
import {
  Header,
  Footer,
  Hero,
  ProductShowcase,
  AboutSection,
  FeaturesSection,
  WhySilverlab,
  LuxuryPackaging,
  Gifting,
  Products,
  ProductDetail,
  ReviewsSection,
  BlogSection,
  Contact
} from './components';

function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <AboutSection />
      <LuxuryPackaging />
      <ReviewsSection />
      <WhySilverlab />
      <FeaturesSection />
      <BlogSection />
    </>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div>
      {!isDashboardPage && <Header onContactClick={() => navigate('/contact')} />}
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact onBack={() => navigate('/')} />} />
          <Route path="/gifting" element={<Gifting />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/rings" element={<Products />} />
          <Route path="/products/chain" element={<Products />} />
          <Route path="/products/earrings" element={<Products />} />
          <Route path="/products/bracelets" element={<Products />} />
          <Route path="/products/:category/:subcategory" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDashboardPage && <Footer />}
    </div>
  );
}

export default App;
