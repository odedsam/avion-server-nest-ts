export class LogUtil {
  private static israeliTimeZoneOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Jerusalem',
  };

  private static timestamp(): string {
    return `[${new Date().toLocaleString('en-IL', LogUtil.israeliTimeZoneOptions)}]`;
  }

  static applicationRunning(origin: string): void {
    console.log(`${LogUtil.timestamp()} App On: ${origin}`);
  }

  static swaggerAvailable(origin: string): void {
    console.log(`${LogUtil.timestamp()} Docs: ${origin}/api`);
  }

  static listeningOnPort(port: number): void {
    console.log(`${LogUtil.timestamp()} Active Port: ${port}`);
  }

  static report(origin: string, port: number): void {
    LogUtil.listeningOnPort(port);
  }
}
