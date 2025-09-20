import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

const avaliacoesIniciais = [
  { id: "1", tipo: "Cardiovascular", paciente: "Maria Silva", data: "14/01/2024", status: "completa", pontuacao: 85 },
  { id: "2", tipo: "Neurológica", paciente: "João Santos", data: "09/01/2024", status: "completa", pontuacao: 72 },
  { id: "3", tipo: "Respiratória", paciente: "Ana Costa", data: "07/01/2024", status: "pendente", pontuacao: 90 },
];

export default function AvaliacoesScreen() {
  const [avaliacoes, setAvaliacoes] = useState(avaliacoesIniciais);
  const [modalEditar, setModalEditar] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);

  const abrirEditar = (avaliacao) => {
    setAvaliacaoSelecionada(avaliacao);
    setModalEditar(true);
  };

  const salvarEdicao = () => {
    const novasAvaliacoes = avaliacoes.map((item) =>
      item.id === avaliacaoSelecionada.id ? avaliacaoSelecionada : item
    );
    setAvaliacoes(novasAvaliacoes);
    setModalEditar(false);

    // Aqui você pode enviar os dados para o backend
    // fetch('/api/editar', { method: 'POST', body: JSON.stringify(avaliacaoSelecionada) })
  };

  const renderAvaliacao = ({ item }) => {
    const statusColor = item.status === "pendente" ? "#D97706" : "#16A34A";

    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.tipo}>Avaliação {item.tipo}</Text>
          <Text style={styles.info}>Paciente: {item.paciente}</Text>
          <Text style={styles.info}>Data: {item.data}</Text>
          <Text style={[styles.status, { color: statusColor }]}>
            Status: {item.status} - Pontuação: {item.pontuacao}/100
          </Text>
        </View>
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.btnVisualizar}>
            <Text style={styles.textBtnVisualizar}>Visualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEditar} onPress={() => abrirEditar(item)}>
            <Text style={styles.textBtnEditar}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Avaliações Feitas ({avaliacoes.length})</Text>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={renderAvaliacao}
        scrollEnabled={false}
      />

      {/* Modal de edição */}
      <Modal visible={modalEditar} animationType="slide" transparent>
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Editar Avaliação</Text>

            <Text style={styles.label}>Nome do Paciente</Text>
            <TextInput
              style={styles.input}
              value={avaliacaoSelecionada?.paciente}
              onChangeText={(text) =>
                setAvaliacaoSelecionada({ ...avaliacaoSelecionada, paciente: text })
              }
            />

            <Text style={styles.label}>Data</Text>
            <TextInput
              style={styles.input}
              value={avaliacaoSelecionada?.data}
              onChangeText={(text) =>
                setAvaliacaoSelecionada({ ...avaliacaoSelecionada, data: text })
              }
            />

            <View style={styles.botoesModal}>
              <TouchableOpacity style={styles.btnSalvar} onPress={salvarEdicao}>
                <Text style={styles.textBtnSalvar}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancelar}
                onPress={() => setModalEditar(false)}
              >
                <Text style={styles.textBtnCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  botoes: {
    flexDirection: "column",
    marginLeft: 8,
  },
  btnVisualizar: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  btnEditar: {
    backgroundColor: "#3B82F6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textBtnVisualizar: {
    color: "#374151",
    fontWeight: "bold",
  },
  textBtnEditar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  botoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  btnSalvar: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  textBtnSalvar: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  textBtnCancelar: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
