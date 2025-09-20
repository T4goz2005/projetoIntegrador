// ModelosScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function ModelosScreen({ navigation }) {
  const [modelos, setModelos] = useState([]);

  // Exemplo de carregamento do backend
  useEffect(() => {
    axios
      .get("http://seu-backend.com/api/modelos") // troque pela sua API
      .then((res) => setModelos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const estatisticas = {
    total: modelos.length,
    ativos: modelos.filter((m) => m.status === "Ativo").length,
    questoes: modelos.reduce((acc, m) => acc + m.questoes, 0),
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="document-text-outline" size={28} color="#3B82F6" />
        <View style={styles.cardInfo}>
          <Text style={styles.titulo}>{item.titulo}</Text>

          {/* Badges */}
          <View style={styles.badgesRow}>
            <View style={[styles.badge, { backgroundColor: "#FECACA" }]}>
              <Text style={styles.badgeText}>{item.area}</Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    item.status === "Ativo" ? "#BBF7D0" : "#E5E7EB",
                },
              ]}
            >
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>

          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.meta}>
            {item.questoes} questões • Modificado em {item.data}
          </Text>
        </View>
      </View>

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={18} color="#374151" />
          <Text style={styles.actionText}>Configurar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("EditarModelo", { modelo: item })}
        >
          <MaterialIcons name="edit" size={18} color="#2563EB" />
          <Text style={[styles.actionText, { color: "#2563EB" }]}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="delete" size={18} color="#DC2626" />
          <Text style={[styles.actionText, { color: "#DC2626" }]}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modelos de Avaliação</Text>
      </View>

      <Text style={styles.subHeader}>
        Crie e gerencie modelos de avaliação personalizados
      </Text>

      {/* Botão Criar Novo */}
      <TouchableOpacity style={styles.newButton}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.newButtonText}>Criar Novo Modelo</Text>
      </TouchableOpacity>

      {/* Estatísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estatisticas.total}</Text>
          <Text style={styles.statLabel}>Total de Modelos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estatisticas.ativos}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estatisticas.questoes}</Text>
          <Text style={styles.statLabel}>Total de Questões</Text>
        </View>
      </View>

      {/* Lista */}
      <FlatList
        data={modelos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", paddingHorizontal: 15 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subHeader: { marginVertical: 10, fontSize: 14, color: "#6B7280" },
  newButton: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  newButtonText: { color: "white", fontWeight: "bold", marginLeft: 5 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
  },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 5 },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", marginBottom: 10 },
  cardInfo: { marginLeft: 10, flex: 1 },
  titulo: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  badgesRow: { flexDirection: "row", marginTop: 5 },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#111827" },
  descricao: { color: "#4B5563", fontSize: 14, marginTop: 4 },
  meta: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  actionButton: { flexDirection: "row", alignItems: "center", marginLeft: 12 },
  actionText: { marginLeft: 4, fontSize: 14 },
});
