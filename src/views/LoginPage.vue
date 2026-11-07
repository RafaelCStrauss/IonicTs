<template>
  <ion-page>
    <ion-content class="ion-padding login-content">
      <ion-grid class="login-container">
        <!-- Cabeçalho -->
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" class="ion-text-center header-section">
            <ion-text color="light">
              <h1>Bem-vindo!</h1>
            </ion-text>
            <ion-text color="medium">
              <p>Faça login para continuar</p>
            </ion-text>
          </ion-col>
        </ion-row>

        <!-- Formulário -->
        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <form class="login-form" @submit.prevent="signInUser">
              <ion-item lines="none" class="custom-input">
                <ion-icon :icon="mailOutline" slot="start"></ion-icon>
                <ion-input type="email" placeholder="E-mail" aria-label="E-mail" v-model="email"></ion-input>
              </ion-item>

              <ion-item lines="none" class="custom-input">
                <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
                <ion-input type="password" placeholder="Senha" aria-label="Senha" v-model="senha"></ion-input>
              </ion-item>

              <div class="forgot-password">
                <ion-note color="primary" class="forgot-link">Esqueceu a senha?</ion-note>
              </div>

              <ion-button expand="block" shape="round" class="login-btn" type="submit" @click="Login()">Entrar</ion-button>
            </form>
          </ion-col>
        </ion-row>

        <!-- Rodapé / Cadastro -->
        <ion-row class="ion-justify-content-center ion-margin-top">
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              Não tem uma conta? <ion-text color="primary" routerLink="/cadastro" class="register-link">Cadastre-se</ion-text>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonContent, 
  IonPage, 
  IonItem, 
  IonInput, 
  IonIcon, 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonNote 
} from '@ionic/vue';

import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { supabase } from '@/services/supabase';
import { ref } from 'vue';
import router from '@/router';

const email = ref('')
const senha = ref('')

async function Login() {

  if(senha.value != "" && email.value != ""){ 

  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: senha.value,
  })

  if (error){
     alert(error.message)
  }
  else{
  router.push('/home')
  alert('Usuario logado com sucesso')
}
  }else{
    throw new Error('Preencha todos os campos');
  }
  
}



</script>

<style scoped>
.login-content {
  --background: #0f172a;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 10px;
}

.header-section {
  margin-bottom: 32px;
}

.header-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 8px;
  margin-top: 0;
}

.header-section p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-input {
  --background: #1e293b;
  --color: #f8fafc;
  --placeholder-color: #94a3b8;
  --placeholder-opacity: 1;
  --border-radius: 16px;
  border-radius: 16px;
  --padding-start: 16px;
  --inner-padding-end: 16px;
  border: 1.5px solid #334155;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.custom-input:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.custom-input ion-icon {
  color: #94a3b8;
  margin-right: 12px;
  font-size: 1.25rem;
}

.forgot-password {
  text-align: right;
  margin-top: -4px;
}

.forgot-link {
  color: #60a5fa;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.login-btn {
  margin-top: 12px;
  height: 48px;
  font-weight: 600;
  --background: #2563eb;
  --color: #ffffff;
  --box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
}

.register-link {
  font-weight: 700;
  cursor: pointer;
}
</style>