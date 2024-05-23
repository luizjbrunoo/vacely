import React from 'react'
import logo from '../img/logo_vascely_XXX.png';

const Home = () => {
  return (
    <div className="App">

      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
            <img src={logo} alt= "logo" title="logo" />
            </div>
            <div className="item-menu">
            <a href="#">Login</a>
            </div>
          </div>
        
        </div>
        
      </div>

      <div className="capa">
        <h1>Previsão de Vendas para o varejo</h1>
        <h1>Com Inteligência Artificial</h1>
        <h3>Mais disponibilidade na prateleira.</h3>
        <h3>Menos desperdício de alimentos</h3>
      </div>

      <div className="segundaaba">
        <h2>Previsões por setor, categorias, até por Produto</h2>
        <h3>Podemos fazer o mesmo com suas lojas também. E provaremos</h3>
        <h3>isso com um teste baseado em seus dados de vendas anteriores.</h3>
      </div>

      <div className="cards">
        <h3>reduza Desperdícios</h3>
        <p>Quando você sabe exatamente quanto venderá no futuro, não precisa fazer pedidos em excesso.</p>
        <h3>Aumente a receita</h3>
        <p>Prateleiras mais cheias. Mais vendas. Melhor fidelização do cliente.</p>
        <h3>Reduza erros</h3>
        <p>Acabe com os erros de pedido causados ​​por ajustes manuais para promoções ou feriados.</p>
      </div>

      <div className="contato">
        <h1>Contato</h1>
      </div>

      <div className="footer">

      </div>

      
      
    </div>
  )
}

export default Home