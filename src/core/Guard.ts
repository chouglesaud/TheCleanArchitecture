export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}
export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combile(guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (!result.succeeded) return result;
    }
    return { succeeded: true };
  }
  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    }
    return { succeeded: true };
  }
  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded) return result;
    }
    return { succeeded: true };
  }
}
