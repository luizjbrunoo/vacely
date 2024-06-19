import React, {useState} from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../img/logo_vascely_XXX.png';
import './Home.css';

const Upload = ({ accessToken }) => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [loading, setLoading] = useState(false)
    const [sentFile, setSentFile] = useState(false)
    const uploadSubmit = async () => { 
    const file = document.getElementById('file').files[0];
    //if (!file) return alert('Selecione um arquivo para enviar.');
    if (!file) {
      alert('Selecione um arquivo para enviar.');
      return;
    }
    const metros2 = document.getElementById('metros2').value;
    const funcionarios = document.getElementById('funcionarios').value;

    if (!user || !user.username) {
      alert('Usuário não definido ou username não disponível.');
      console.error('Usuário ou username não definido:', user);
      return;
    }

    try {
        setLoading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const formData = {
          file: base64,
          fileName: file.name,
          contentType: file.type,
          username: user.username,
          metros2,
          funcionarios
        };

        console.log('Enviando dados para:', user.username); // Confirme que o username está correto

        const uploadResponse = await fetch(`https://s2ipunu7rd.execute-api.us-east-1.amazonaws.com/Prod/generate-embed-url/${user.username}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const responseData = await uploadResponse.json();
        if (!uploadResponse.ok) {
          console.error('Erro ao enviar arquivo:', responseData.message);
          alert('Erro ao enviar arquivo: ' + responseData.message);
          return;
        }
        alert('Arquivo enviado com sucesso: ' + responseData.message);
        setSentFile(true);
        setLoading(false);
      };
      reader.onerror = error => console.log('Error reading file:', error);
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao processar a requisição', error);
      alert('Erro ao processar a requisição: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="App2">
      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <img src={logo} alt="logo" title="logo" />
            </div>

            {/* item-menu UPLOAD redirect page to /upload */}
            
            <div className="item-menu">
              <a href="/">HOME</a>
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
                <>
                  <span style={{color:'white'}}>Olá, {user.username}!</span><span> </span>
                  <button onClick={signOut}>Logout</button>
                </>
              ) : (
                <button>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard">
        <h1>Upload</h1>
       
        {user ? (
        <>
        <p>Carregue aqui seus dados no formato .csv e informe a metragem quadrada da loja e sua quantidade de funcionários.</p>
        <input type="file" id="file" name="file" accept=".csv" multiple/>
        <div>
          <label htmlFor="metros2">Metragem:</label>
          <input type="number" id="metros2" name="metros2" /> <span>metros²</span>
        </div>
        <div>
          <label htmlFor="funcionarios">Funcionários:</label>
          <input type="number" id="funcionarios" name="funcionarios" />
        </div>
        <button onClick={uploadSubmit}>Enviar</button>
        {loading && <div className="loading">Carregando...</div>}
        {sentFile && <p>Arquivo enviado com sucesso! Aguarde tratamento de dados pela nossa equipe.</p>}
      </>

        ) : (<div>
          <p>Para acessar a página de upload, faça login na home page.</p>
        </div>)}
       
        
      
      </div>
    </div>
  );
};

export default Upload;
