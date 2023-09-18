type ClassPropertyDecorator = (target: undefined, context: {
  kind: 'field'
  name: string | symbol
  access: { get: () => unknown, set: (value: unknown) => void }
  static: boolean
  private: boolean
}) => (initialValue: unknown) => unknown | void
