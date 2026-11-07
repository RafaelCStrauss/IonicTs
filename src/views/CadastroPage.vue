<template>
  <ion-page>
    <ion-content class="ion-padding register-content">
      <div class="register-container">
        <div class="header-section">
          <h1>Crie sua conta</h1>
          <p>Preencha os dados abaixo para começar</p>
        </div>

        <form class="register-form" @submit.prevent>
          <ion-item lines="none" class="custom-input">
            <ion-icon :icon="personOutline" slot="start"></ion-icon>
            <ion-input type="text" placeholder="Nome completo" aria-label="Nome completo" v-model="nome"></ion-input>
          </ion-item>

          <ion-item lines="none" class="custom-input">
            <ion-icon :icon="mailOutline" slot="start"></ion-icon>
            <ion-input type="email" placeholder="E-mail" aria-label="E-mail" v-model="email"></ion-input>
          </ion-item>

          <ion-item lines="none" class="custom-input">
            <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
            <ion-input type="password" placeholder="Senha" aria-label="Senha" v-model="senha"></ion-input>
          </ion-item>

          <ion-item lines="none" class="custom-input">
            <ion-icon :icon="shieldCheckmarkOutline" slot="start"></ion-icon>
            <ion-input
              type="password"
              placeholder="Confirmar senha"
              aria-label="Confirmar senha"
              v-model="senha2"
            ></ion-input>
          </ion-item>

          <ion-button expand="block" shape="round" class="register-btn" @click="Cadastrar()"> Cadastrar </ion-button>
        </form>

        <div class="footer-section">
          <p>Já tem uma conta? <a href="#">Entrar</a></p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
} from '@ionic/vue';
import { personOutline, mailOutline, lockClosedOutline, shieldCheckmarkOutline } from 'ionicons/icons';

import { ref } from 'vue';
import { supabase } from '@/services/supabase';

const nome = ref('');
const email = ref('');
const senha = ref('');
const senha2 = ref('');
async function Cadastrar() {
  if (senha.value == senha2.value && nome.value != "") {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: senha.value,
      options: {
        data: {
          nome: nome.value,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Cadastro realizado com sucesso!');
      console.log(data.user);
    }


    email.value = '';
    nome.value = '';
    senha.value = '';
    senha2.value = '';
  } else {
    alert('Houve um erro inesperado. Verifique se todas as informações estão preenchidas');
  }
}
</script>

<style scoped>
.register-content {
  --background: #0f172a;
}

.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 10px;
}

.header-section {
  text-align: center;
  margin-bottom: 28px;
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

.register-form {
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
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
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

.register-btn {
  margin-top: 8px;
  height: 48px;
  font-weight: 600;
  --background: #2563eb;
  --color: #ffffff;
  --box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
}

.footer-section {
  text-align: center;
  margin-top: 28px;
  font-size: 0.9rem;
  color: #94a3b8;
}

.footer-section a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 700;
}
</style>
