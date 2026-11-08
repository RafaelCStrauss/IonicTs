<template>
  <ion-page>
    <ion-content class="ion-padding welcome-content">
      <ion-grid class="welcome-container">
        
        <!-- Topo com Perfil e Saudação -->
        <ion-row class="user-header ion-align-items-center ion-justify-content-between">
          <ion-col size="auto" class="ion-no-padding">
            <div class="user-info-wrapper">
              <ion-icon :icon="personCircleOutline" class="user-icon"></ion-icon>
              <ion-text class="user-text-container">
                <p class="greeting">Olá,</p>
                <h2 class="username">{{ nomeUsuario }}</h2>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>

        <!-- Hero Card de Bem-vindo -->
        <ion-row>
          <ion-col size="12" class="ion-no-padding">
            <ion-card class="hero-card">
              <ion-card-content class="hero-card-content">
                <ion-text class="hero-text">
                  <h1>Bem-vindo de volta! 👋</h1>
                  <p>Seu painel está pronto. Confira o resumo das suas atividades de hoje.</p>
                </ion-text>
                <ion-button shape="round" class="action-btn">
                  Explorar
                  <ion-icon :icon="arrowForwardOutline" slot="end"></ion-icon>
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Grid de Ações Rápidas -->
        <ion-row class="quick-actions-section">
          <ion-col size="12" class="ion-no-padding">
            <ion-text class="section-title"><h3>Acesso Rápido</h3></ion-text>
            <ion-grid class="cards-grid ion-no-padding">
              <ion-row>
                
                <!-- Card Tarefas -->
                <ion-col size="4">
                  <ion-card class="action-card" router-link="/tarefas">
                    <ion-card-content class="action-card-content">
                      <div class="card-icon blue">
                        <ion-icon :icon="sparklesOutline"></ion-icon>
                      </div>
                      <ion-text><span>Tarefas</span></ion-text>
                    </ion-card-content>
                  </ion-card>
                </ion-col>

                <!-- Card Projetos -->
                <ion-col size="4">
                  <ion-card class="action-card">
                    <ion-card-content class="action-card-content">
                      <div class="card-icon purple">
                        <ion-icon :icon="gridOutline"></ion-icon>
                      </div>
                      <ion-text><span>Projetos</span></ion-text>
                    </ion-card-content>
                  </ion-card>
                </ion-col>

                <!-- Card Ajustes -->
                <ion-col size="4">
                  <ion-card class="action-card">
                    <ion-card-content class="action-card-content">
                      <div class="card-icon green">
                        <ion-icon :icon="settingsOutline"></ion-icon>
                      </div>
                      <ion-text><span>Ajustes</span></ion-text>
                    </ion-card-content>
                  </ion-card>
                </ion-col>

              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>

        <!-- Botão de Logout Centralizado -->
        <ion-row class="ion-justify-content-center">
          <ion-col size="auto" class="ion-no-padding">
            <ion-button shape="round" color="danger" class="logout-btn" @click="Sair()">
              Sair
            </ion-button>
          </ion-col>
        </ion-row>

        <!-- Lista de Tarefas -->
        <ion-row>
          <ion-col size="12" class="ion-no-padding">
            <ion-list class="minha-lista-tarefas">
              <ion-item v-for="tarefa in listaTarefas" :key="tarefa.id" class="tarefa-item" lines="none">
                <ion-label>
                  <h2>{{ tarefa.Nome }}</h2>
                  <p>{{ tarefa.Descricao }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase, PegarTarefas } from '@/services/supabase';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  onIonViewWillEnter,
} from '@ionic/vue';
import {
  personCircleOutline,
  arrowForwardOutline,
  sparklesOutline,
  gridOutline,
  settingsOutline,
} from 'ionicons/icons';

import { ref } from 'vue';

const nomeUsuario = ref('');
const listaTarefas = ref<any[]>([]);

onIonViewWillEnter(async () => {
  // Busca o usuário logado
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    nomeUsuario.value = user.user_metadata?.nome || 'Usuário';
  }

  // Busca as tarefas
  const tarefas = await PegarTarefas();
  listaTarefas.value = tarefas ?? [];
});

async function Sair() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
  } else {
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
  padding: 8px 0;
}

.user-info-wrapper {
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
  margin: 0;
}

.username {
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
.section-title h3 {
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.cards-grid ion-col {
  padding: 0 6px;
}

.cards-grid ion-col:first-child {
  padding-left: 0;
}

.cards-grid ion-col:last-child {
  padding-right: 0;
}

.action-card {
  background: #1e293b;
  border: 1.5px solid #334155;
  border-radius: 16px;
  margin: 0;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.action-card:active {
  transform: scale(0.96);
}

.action-card-content {
  padding: 16px 8px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  width: 220px;
  height: 45px;
  font-weight: 600;
  margin-top: 10px;
  --box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.minha-lista-tarefas {
  background: transparent !important;
  margin-top: 16px;
  padding: 0;
}

/* Estiliza apenas os itens dentro da nossa lista de tarefas */
.minha-lista-tarefas .tarefa-item {
  --background: #1e1e24;
  --color: #ffffff;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.minha-lista-tarefas .tarefa-item:hover {
  transform: translateY(-2px);
}

/* Tipografia restrita apenas a este bloco */
.minha-lista-tarefas ion-label h2 {
  font-size: 16px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 4px;
}

.minha-lista-tarefas ion-label p {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.4;
}
</style>