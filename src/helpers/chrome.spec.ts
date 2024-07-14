import {accessStorage} from './chrome';

const initialValues = {
  foo: 'hello',
};

describe('accessStorage()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets values', () => {
    const storage = accessStorage(initialValues);

    storage.setValues({
      foo: 'world',
    });

    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      foo: 'world',
    });
  });

  it('gets not defined values', async () => {
    (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({});

    const storage = accessStorage(initialValues);
    expect(await storage.getValues()).toEqual({
      foo: 'hello',
    });
  });

  it('gets defined values', async () => {
    (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({
      foo: 'world',
    });

    const storage = accessStorage(initialValues);
    expect(await storage.getValues()).toEqual({
      foo: 'world',
    });
  });

  it('gets defined values with extras', async () => {
    (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({
      foo: 'world',
      bar: 12345,
    });

    const storage = accessStorage(initialValues);
    expect(await storage.getValues()).toEqual({
      foo: 'world',
    });
  });
});
