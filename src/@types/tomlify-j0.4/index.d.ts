declare module 'tomlify-j0.4' {
  export function toToml(
    table: object,
    options?: {
      replace?: {
        function(this: Context, key: string | number, value: Mixed): Mixed;
      };
      space?: string | number;
      sort?: { function(a: string, b: string): number };
    }
  ): string;
}
