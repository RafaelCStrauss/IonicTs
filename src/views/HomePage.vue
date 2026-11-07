<template>
  <ion-page>
    <ion-content class="ion-padding welcome-content">
      <div class="welcome-container">
        
        <!-- Topo com Perfil e Saudação -->
        <div class="user-header">
          <div class="user-info">
            <ion-icon :icon="personCircleOutline" class="user-icon"></ion-icon>
            <div class="user-text-container">
              <ion-text class="greeting">Olá,</ion-text>
              <ion-text class="username"><h2>{{ nomeUsuario }}</h2></ion-text>
            </div>
          </div>
        </div>

        <!-- Hero Card de Bem-vindo -->
        <ion-card class="hero-card">
          <ion-card-content class="hero-card-content">
            <div class="hero-text">
              <ion-text><h1>Bem-vindo de volta! 👋</h1></ion-text>
              <ion-text><p>Seu painel está pronto. Confira o resumo das suas atividades de hoje.</p></ion-text>
            </div>
            <ion-button shape="round" class="action-btn">
              Explorar
              <ion-icon :icon="arrowForwardOutline" slot="end"></ion-icon>
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Grid de Ações Rápidas -->
        <div class="quick-actions">
          <ion-text><h3>Acesso Rápido</h3></ion-text>
          <div class="cards-grid">
            
            <div class="action-card">
              <div class="card-icon blue">
                <ion-icon :icon="sparklesOutline"></ion-icon>
              </div>
              <ion-text><span>Recentes</span></ion-text>
            </div>

            <div class="action-card">
              <div class="card-icon purple">
                <ion-icon :icon="gridOutline"></ion-icon>
              </div>
              <ion-text><span>Projetos</span></ion-text>
            </div>

            <div class="action-card">
              <div class="card-icon green">
                <ion-icon :icon="settingsOutline"></ion-icon>
              </div>
              <ion-text><span>Ajustes</span></ion-text>
            </div>

          </div>
        </div>

        <!-- Botão de Logout Centralizado -->
        <ion-button shape="round" color="danger" class="logout-btn" @click="Sair()">
          Sair
        </ion-button>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase } from '@/services/supabase';
import { 
  IonContent, 
  IonPage, 
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/vue';
import { 
  personCircleOutline, 
  arrowForwardOutline, 
  sparklesOutline, 
  gridOutline, 
  settingsOutline 
} from 'ionicons/icons';

import { onMounted, ref } from 'vue';

const nomeUsuario = ref('');

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    nomeUsuario.value = user.user_metadata?.nome || 'Usuário';
  }
});

async function Sair() {
  const { error } = await supabase.auth.signOut();
  if(error){
    alert(error.message);
  }
  else{
    router.push('/login');
  }
}
</script>

<style scoped>
.welcome-content {
  --background: #0f172a;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 420px;
  margin: 0 auto;
  padding-bottom: 30px;
}

/* Cabeçalho do Usuário */
.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-icon {
  font-size: 2.75rem;
  color: #60a5fa;
}

.greeting {
  display: block;
  font-size: 0.85rem;
  color: #94a3b8;
}

.username h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
}

/* Hero Card */
.hero-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1.5px solid #334155;
  border-radius: 20px;
  margin: 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.hero-card-content {
  padding: 24px !important;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-text h1 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
}

.hero-text p {
  margin: 0;
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.4;
}

.action-btn {
  height: 44px;
  font-weight: 600;
  --background: #2563eb;
  --color: #ffffff;
  --box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
  margin: 0;
  align-self: flex-start;
}

/* Ações Rápidas */
.quick-actions h3 {
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.action-card {
  background: #1e293b;
  border: 1.5px solid #334155;
  border-radius: 16px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.action-card:active {
  transform: scale(0.96);
}

.action-card span {
  color: #cbd5e1;
  font-size: 0.85rem;
  font-weight: 500;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.card-icon.blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.card-icon.purple {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
}

.card-icon.green {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}

/* Botão de Logout Centralizado */
.logout-btn {
  align-self: center;
  width: 220px;
  height: 45px;
  font-weight: 600;
  margin-top: 10px;
  --box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}
</style>