export type HandshakeMessage = {
  type: 'change_case_handshake';
};

export type HandshakeResponse = {
  injected: boolean;
};

export type MethodMessage = {
  type: 'change_case_method';
  name: string;
};
