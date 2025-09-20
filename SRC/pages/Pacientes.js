import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PacientesScreen = () => {
  const [pacientes, setPacientes] = useState([
    { id: "1", nome: "Maria Silva", idade: 45, telefone: "(11) 99999-9999", ultimaVisita: "14/01/2024" },
    { id: "2", nome: "João Santos", idade: 62, telefone: "(11) 88888-8888", ultimaVisita: "09/01/2024" },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoPaciente, setNovoPaciente] = useState({ nome: "", idade: "", telefone: "" });

  const toggleFormulario = () => setMostrarFormulario(!mostrarFormulario);

  const handleSalvarPaciente = () => {
    if (!novoPaciente.nome || !novoPaciente.idade || !novoPaciente.telefone) return;

    const pacienteParaAdicionar = {
      ...novoPaciente,
      id: (pacientes.length + 1).toString(),
      ultimaVisita: new Date().toLocaleDateString("pt-BR"),
      idade: parseInt(novoPaciente.idade),
    };

    setPacientes([...pacientes, pacienteParaAdicionar]);
    setNovoPaciente({ nome: "", idade: "", telefone: "" });
    setMostrarFormulario(false);
  };

  const renderPaciente = ({ item }) => (
    <View style={styles.card}>
      <MaterialCommunityIcons name="account-circle" size={40} color="#2E86FF" style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="calendar" size={16} color="#555" />
          <Text style={styles.detalhe}>{item.idade} anos</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" size={16} color="#555" />
          <Text style={styles.detalhe}>{item.telefone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.ultimaVisita}>Última visita: {item.ultimaVisita}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.btnNovo} onPress={toggleFormulario}>
        <Text style={styles.textBtnNovo}>+ Cadastrar Novo Paciente</Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View style={styles.cardFormulario}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Novo Paciente</Text>
            <Text style={styles.cardDescription}>Preencha os dados do novo paciente</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo do paciente"
              value={novoPaciente.nome}
              onChangeText={(text) => setNovoPaciente({ ...novoPaciente, nome: text })}
            />
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              placeholder="Idade"
              keyboardType="numeric"
              value={novoPaciente.idade}
              onChangeText={(text) => setNovoPaciente({ ...novoPaciente, idade: text })}
            />
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
              value={novoPaciente.telefone}
              onChangeText={(text) => setNovoPaciente({ ...novoPaciente, telefone: text })}
            />

            <View style={styles.botoesFormulario}>
              <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarPaciente}>
                <Text style={styles.textBtnSalvar}>Salvar Paciente</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancelar} onPress={toggleFormulario}>
                <Text style={styles.textBtnCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Text style={styles.titulo}>Pacientes Cadastrados ({pacientes.length})</Text>
      <FlatList data={pacientes} keyExtractor={(item) => item.id} renderItem={renderPaciente} />
    </ScrollView>
  );
};

export default PacientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    padding: 16,
  },
  btnNovo: {
    backgroundColor: "#2E86FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  textBtnNovo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cardFormulario: {
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0C4A6E",
  },
  cardDescription: {
    fontSize: 14,
    color: "#334155",
    marginTop: 4,
  },
  cardContent: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  botoesFormulario: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  btnSalvar: {
    flex: 1,
    backgroundColor: "#0EA5E9",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textBtnSalvar: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  textBtnCancelar: {
    color: "#1F2937",
    fontWeight: "600",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detalhe: {
    marginLeft: 6,
    fontSize: 14,
    color: "#555",
  },
  ultimaVisita: {
    fontSize: 13,
    color: "#777",
  },
});
