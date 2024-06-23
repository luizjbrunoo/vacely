import React, { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../img/logo_vascely_XXX.png';
import './Home.css';
import hero from '../img/capa_website_vascely.png';
import vetor from '../img/vetor_grafico.jpg';
import criancas from '../img/criancas.jpg';

const Home = ({ onLoginClick }) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    fetch('https://0yp1cpfozc.execute-api.us-east-1.amazonaws.com/prod/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert('Falha ao enviar mensagem.'));
  };

  return (
    <div className="App" style={{backgroundColor:"black"}}>
      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <img src={logo} alt="logo" title="logo" />
            </div>
            {user && (<>
              <div className="item-menu">
              <a href="/upload">UPLOAD</a>
            </div>
            <div className="item-menu">
              <a href="/dashboard">DASHBOARD</a>
            </div>
            </>)}
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
          <button 
            onClick={() => {
              const element = document.getElementById('contato');
              element.scrollIntoView({ behavior: 'smooth' });
            }}
          >Entre em contato</button> 
        </div>
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

      <div className='cestabasica'>
        <img src={criancas} alt="criancas" />
        <div>
          <h1>10% de todas as assinaturas são doadas</h1>
          <h3>É importante para nós tornarmos o mundo um pouco melhor. Ao doar pelo menos 10% de todas as assinaturas para instituições de caridade cuidadosamente selecionadas, garantimos que, ao escolher a Vascely, você também estará fazendo a sua parte. Juntos podemos fazer uma diferença tangível na vida das pessoas que dela necessitam.</h3>
        </div> 
      </div>
    
      <div className="contato" id='contato'>
        <h1>Fale conosco</h1>
        <p>Estamos ansiosos para ouvir de você. Envie-nos uma mensagem e entraremos em contato o mais rápido possível.</p>
        <div className='contatocontainer'>
          <p>
            Alameda Salvador, 1057 - Edifício Salvador Shopping Business Torre América - Salas: 911/912 <br/>CEP: 41820-790 Salvador - Bahia
            <br/><br/><br/><br/>
          </p>
          <div>
            <form onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <textarea name="message" placeholder="Mensagem" value={formData.message} onChange={handleChange}></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="footer-item">
            <img src={logo} alt="logo" title="logo" />
          </div>
          <div className="footer-item-social">
            <a href="https://www.linkedin.com/company/vascely/" target="_blank" rel="noreferrer">LinkedIn </a> 
            <p>|</p>
            <a href="https://www.instagram.com/teste" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
