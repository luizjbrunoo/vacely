import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../img/logo_vascely_XXX.png';
import './Home.css'
import hero from '../img/capa_website_vascely.png'
import vetor from '../img/vetor_grafico.jpg'

const Home = ({ onLoginClick }) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="App">
                 {/* <div className="hero-container">
        <img className="hero" src={hero} alt="hero" />
      </div> */}

      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <img src={logo} alt="logo" title="logo" />
            </div>
            <div className="item-menu">
              {user ? (
                <button onClick={signOut}>Logout</button>
              ) : (
                <button onClick={onLoginClick}>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="capa">
                <div className='capa-texto'>
    <h1>
      Previsão de Vendas para o varejo
      <br />
      com Inteligência Artificial
    </h1>
    <h3>
      Mais disponibilidade na prateleira.
      <br />
      Menos desperdício de alimentos.
    </h3>
    <button>Peça uma demonstração</button> 
    </div>
    <img src={vetor} alt="grafico" className='vetor'/>

</div>

<div className="segundaaba">
  <h2>Previsões por Setor, por Categorias, e até por Produto</h2>
  <p>Podemos fazer o mesmo com suas lojas também.</p>
  <p>E provaremos isso com um teste baseado em seus dados de vendas anteriores.</p>
</div>

      <div className="cards">
        <div>
        <h3>Reduza Desperdícios</h3>
        <p>Quando você sabe exatamente quanto venderá no futuro, não precisa fazer pedidos em excesso.</p>
        </div> 
        <div>
          <h3>Aumente a receita</h3>
        <p>Prateleiras mais cheias. Mais vendas. Melhor fidelização do cliente.</p>
        </div> 
        <div>
          <h3>Reduza erros</h3>
        <p>Acabe com os erros de pedido causados ​​por ajustes manuais para promoções ou feriados.</p>
      </div>
      </div>

    

      <div className="footer">
        <div className="footer-content">
          <div className="footer-item">

            <p>
              <a href="mailto:
              teste@teste.com">
                email</a>
            </p>
            <p>
              <a href="tel:+5511999999999">
                +55 11 99999-9999</a>
            </p>

          </div>
          <div className="footer-item">

            <p>
              Rua Teste, 123
              São Paulo - SP
              01234-567
            </p>
            </div>
            <div className="footer-item-social">


                <a href="https://www.linkedin.com/in/teste" target="_blank" rel="noreferrer">
                  LinkedIn </a> 
                  <p>|</p>
             
                <a href="https://www.instagram.com/teste" target="_blank" rel="noreferrer">
                   Instagram</a>

              </div>
              </div>

      </div>
    </div>
  );
};

export default Home;
