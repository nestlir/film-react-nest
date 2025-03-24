import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let mockConsole: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    mockConsole = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log messages in TSKV format with timestamp', () => {
    const testMessage = 'tskv test message';
    logger.log(testMessage);

    expect(mockConsole).toHaveBeenCalledWith(
      expect.stringMatching(
        /^time=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\tlevel=log\tmessage="tskv test message"/,
      ),
    );
  });
});
