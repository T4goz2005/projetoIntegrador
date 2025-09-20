import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


export default function Home({navigation}) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de Saúde</Text>
        <Text style={styles.subtitle}>Gestão completa de pacientes e avaliações</Text>
      </View>

      {/* Card Pacientes */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="person-outline" size={40} color="#4A90E2" />
          <Text style={styles.cardTitle}>Pacientes</Text>
          <Text style={styles.cardSubtitle}>
            Cadastrar novos pacientes e realizar avaliações
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PacientesScreen')}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Avaliações Feitas */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="clipboard-outline" size={40} color="#4A90E2" />
          <Text style={styles.cardTitle}>Avaliações Feitas</Text>
          <Text style={styles.cardSubtitle}>
            Visualizar todas as avaliações realizadas
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('AvaliacoesScreen')}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Modelos de Avaliação */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="document-text-outline" size={40} color="#4A90E2" />
          <Text style={styles.cardTitle}>Modelos de Avaliação</Text>
          <Text style={styles.cardSubtitle}>
            Criar e editar modelos de avaliação
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate("ModelosScreen")}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Pacientes Cadastrados</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Avaliações Realizadas</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Modelos Criados</Text>
        </View>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
});
