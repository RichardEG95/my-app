export default class Environ {
  private static instance: Environ;
  private readonly baseUrl: string;

  private constructor() {
    const { origin } = window.location;
    this.baseUrl = origin;
    console.log(origin);
  }

  private static getInstance(): Environ {
    if (!Environ.instance) {
      Environ.instance = new Environ();
    }

    return Environ.instance;
  }

  public static get baseUrl(): string {
    return `http://localhost:5000/api`;
  }
}
