import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../img/logo_vascely_XXX.png';
import './Home.css'; // Reutilize o CSS da Home para manter a consistência

const Upload = ({accessToken}) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

 const uploadSubmit = async () => {
    const file = document.getElementById('file').files[0];
    const metros2 = document.getElementById('metros2').value;
    const funcionarios = document.getElementById('funcionarios').value;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const formData = {
            file: base64,
            fileName: file.name,
            contentType: file.type,
            username: user.username // Supondo que você tenha acesso ao nome de usuário
        };

        try {
            const response = await fetch('https://API_ENDPOINT/dev/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.error('Erro ao enviar arquivo');
                return;
            }
            alert('Arquivo enviado com sucesso');
        } catch (error) {
            console.error('Erro ao enviar arquivo', error);
        }
    };
}


    return (
        <div className="App2">
            <div className="main">
            <div className="center">
                <div className="menu">
                <div className="logo">
                    <img src={logo} alt="logo" title="logo" />
                </div>
                <div className="item-menu">
                    {user ? (
                    <>
                        <span style={{color:'white'}}>Olá, {user.username}! </span>
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
            <h1>Upload </h1>
            <p>Carregue aqui seus dados no formato .csv e informe a metragem quadrada da loja e sua quantidade de funcionários.</p>
            <input type="file" id="file" name="file" 
            accept=".csv"
            multiple/>

            {/* campo para inserir qunatidade de metros2 da empresa */}<div>
                <label for="metros2">Metragem: </label>
            <input type="number" id="metros2" name="metros2" /> <span>metros²</span></div>
            <div>
            <label for="metros2">Funcionários: </label>
            <input type="number" id="funcionarios" name="funcionarios" /></div>

            <button onClick={uploadSubmit}>Enviar</button>
            </div>
    
         
</div>
    );
}

export default Upload;


