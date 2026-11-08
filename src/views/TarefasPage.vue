<template>
  <ion-page>
    <ion-content class="ion-padding task-content">
      <ion-grid class="task-container">
        
        <ion-row class="ion-text-center">
          <ion-col size="12">
            <ion-text>
              <h1>Criar Tarefa</h1>
              <p>Organize suas atividades do dia</p>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12" class="ion-no-padding">
            <form class="task-form" @submit.prevent>
              
              <ion-item lines="none" class="custom-input">
                <ion-icon :icon="checkboxOutline" slot="start"></ion-icon>
                <ion-input type="text" placeholder="Título da tarefa" aria-label="Título da tarefa" v-model="nome"></ion-input>
              </ion-item>

              <ion-item lines="none" class="custom-input textarea-item">
                <ion-icon :icon="documentTextOutline" slot="start" class="textarea-icon"></ion-icon>
                <ion-textarea placeholder="Descrição ou detalhes..." :rows="3" aria-label="Descrição" v-model="descricao"></ion-textarea>
              </ion-item>

              <ion-item lines="none" class="custom-input">
                <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                <ion-input type="date" aria-label="Data de vencimento" v-model="date"></ion-input>
              </ion-item>
              <ion-button expand="block" shape="round" class="create-btn" @click="NoClick">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                Salvar Tarefa
              </ion-button>
              <ion-button expand="block" shape="round" class="create-btn" router-link="/home">
                <ion-icon :icon="home" slot="start"></ion-icon>
                Voltar
              </ion-button>

            </form>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem, 
  IonInput, 
  IonTextarea,
  IonIcon,
  IonChip,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue';
import { 
  checkboxOutline, 
  documentTextOutline, 
  calendarOutline, 
  addOutline, 
  home
} from 'ionicons/icons';

import { CriarTarefas } from '@/services/supabase';
const date = ref('');
const nome = ref('');
const descricao = ref('');
function NoClick(){
CriarTarefas(nome.value, descricao.value, date.value,)
}
</script>

<style scoped>
.task-content {
  --background: #0f172a;
}

.task-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0 20px;
}

.ion-text-center h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 6px;
  margin-top: 0;
}

.ion-text-center p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0 0 24px 0;
}

.task-form {
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

.textarea-item {
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 12px;
}

.textarea-icon {
  margin-top: 4px;
}

.priority-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.section-label {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: 4px;
}

.priority-options {
  display: flex;
  gap: 8px;
}

.priority-chip {
  flex: 1;
  justify-content: center;
  margin: 0;
  height: 38px;
  font-weight: 600;
  border-radius: 12px;
  --background: #1e293b;
  --color: #94a3b8;
  border: 1.5px solid #334155;
  cursor: pointer;
}

.priority-chip.low.active {
  --background: rgba(34, 197, 94, 0.15);
  --color: #4ade80;
  border-color: #22c55e;
}

.priority-chip.medium.active {
  --background: rgba(234, 179, 8, 0.15);
  --color: #facc15;
  border-color: #eab308;
}

.priority-chip.high.active {
  --background: rgba(239, 68, 68, 0.15);
  --color: #f87171;
  border-color: #ef4444;
}

.create-btn {
  margin-top: 12px;
  height: 48px;
  font-weight: 600;
  --background: #2563eb;
  --color: #ffffff;
  --box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
}
</style>