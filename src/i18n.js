import { I18n } from '@aws-amplify/core';

const dict = {
  'pt': {
    'Sign In': 'Entrar',
    'Sign in': 'Entrar',  
    'Sign Up': 'Cadastrar-se',
    'Sign up': 'Cadastrar-se',
    'Sign Out': 'Sair',
    'Sign out': 'Sair',
    'Forgot your password?': 'Esqueceu sua senha?',
    'Username': 'Nome de usuário',
    'Password': 'Senha',
    'Email': 'E-mail',
    'Confirmation Code': 'Código de Confirmação',
    'Submit': 'Enviar',
    'Back to Sign In': 'Voltar para Entrar',
    'Confirm': 'Confirmar',
    'New password': 'Nova senha',
    'Enter your Username': 'Digite seu nome de usuário',
    'Enter your Password': 'Digite sua senha',
    'Enter your Email': 'Digite seu e-mail',
    'Enter your confirmation code': 'Digite seu código de confirmação',
    'No account?': 'Sem conta?',
    'Create Account': 'Criar conta',
    'Confirm Password': 'Confirmar senha',
    'Please confirm your Password': 'Por favor, confirme sua senha',
    
  },
};

I18n.putVocabularies(dict);
I18n.setLanguage('pt');
