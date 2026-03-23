import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LogoFiap } from '../components/LogoFiap';

export default function LoginScreen() {
  const router = useRouter();
  const [rm, setRm] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  function handleEntrar() {
    if (!rm.trim()) {
      setErro('Informe seu RM para continuar.');
      return;
    }
    if (!nome.trim()) {
      setErro('Informe seu nome para continuar.');
      return;
    }
    setErro('');
    router.push('/cardapio');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoWrap}>
          <LogoFiap width={130} height={35} />
        </View>

        {/* Heading */}
        <View style={styles.headingWrap}>
          <Text style={styles.headingAccent}>CANTINA</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* RM */}
          <Text style={styles.label}>USUÁRIO (RM)*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: RM12345"
            placeholderTextColor="#75838B"
            keyboardType="numeric"
            value={rm}
            onChangeText={setRm}
          />

          {/* Nome */}
          <Text style={[styles.label, { marginTop: 20 }]}>NOME COMPLETO*</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#75838B"
            autoCapitalize="words"
            value={nome}
            onChangeText={setNome}
          />

          {/* Erro */}
          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          {/* Botão */}
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleEntrar}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rodapé */}
      <Text style={styles.footer}>PEÇA SEM FILA</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headingWrap: {
    alignItems: 'center',
    marginBottom: 36,
  },
  headingLight: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headingAccent: {
    color: '#ED145B',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#111416',
    borderRadius: 2,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  label: {
    color: '#B7B7B7',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 0.7,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: '#ACC1CC',
    fontSize: 15,
    paddingHorizontal: 12,
  },
  erro: {
    color: '#ED145B',
    fontSize: 12,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#ED145B',
    height: 52,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    color: '#75838B',
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: 1,
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
  },
});
