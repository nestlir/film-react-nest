import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let mock;
  const testLevel = 'log';

  beforeEach(() => {
    logger = new JsonLogger();
    mock = jest.spyOn(console, testLevel).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be console message in json format', () => {
    const testMessage = 'json test message';
    logger.log(testMessage);
    const expected = JSON.stringify({
      level: testLevel,
      message: testMessage,
      optionalParams: [],
    });
    expect(mock).toHaveBeenCalledWith(expected);
  });
});
