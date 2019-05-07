global.chrome = {
  storage: {
    sync: {
      set: jest.fn(),
      get: jest.fn(),
      clear: jest.fn()
    }
  }
};
