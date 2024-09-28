import { Registry as IRegistry } from "winreg";

// Since we can't import the type from the module, we have to define it here
declare interface WinregStatic {
  /**
   * Creates a registry object, which provides access to a single registry key.
   * Note: This class is returned by a call to ```require('winreg')```.
   *
   * @param {@link Options} options - the options
   *
   * @example
   * var Registry = require('winreg')
   * ,   autoStartCurrentUser = new Registry({
   *       hive: Registry.HKCU,
   *       key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
   *     });
   */
  new (options: Winreg.Options): Winreg.Registry;

  /**
   * Registry hive key HKEY_LOCAL_MACHINE.
   * Note: For writing to this hive your program has to run with admin privileges.
   */
  HKLM: string;

  /**
   * Registry hive key HKEY_CURRENT_USER.
   */
  HKCU: string;

  /**
   * Registry hive key HKEY_CLASSES_ROOT.
   * Note: For writing to this hive your program has to run with admin privileges.
   */
  HKCR: string;

  /**
   * Registry hive key HKEY_USERS.
   * Note: For writing to this hive your program has to run with admin privileges.
   */
  HKU: string;

  /**
   * Registry hive key HKEY_CURRENT_CONFIG.
   * Note: For writing to this hive your program has to run with admin privileges.
   */
  HKCC: string;

  /**
   * Collection of available registry hive keys.
   */
  HIVES: string[];

  /**
   * Registry value type STRING.
   *
   * Values of this type contain a string.
   */
  REG_SZ: string;

  /**
   * Registry value type MULTILINE_STRING.
   *
   * Values of this type contain a multiline string.
   */
  REG_MULTI_SZ: string;

  /**
   * Registry value type EXPANDABLE_STRING.
   *
   * Values of this type contain an expandable string.
   */
  REG_EXPAND_SZ: string;

  /**
   * Registry value type DOUBLE_WORD.
   *
   * Values of this type contain a double word (32 bit integer).
   */
  REG_DWORD: string;

  /**
   * Registry value type QUAD_WORD.
   *
   * Values of this type contain a quad word (64 bit integer).
   */
  REG_QWORD: string;

  /**
   * Registry value type BINARY.
   *
   * Values of this type contain a binary value.
   */
  REG_BINARY: string;

  /**
   * Registry value type UNKNOWN.
   *
   * Values of this type contain a value of an unknown type.
   */
  REG_NONE: string;

  /**
   * Collection of available registry value types.
   */
  REG_TYPES: string[];

  /**
   * The name of the default value. May be used instead of the empty string literal for better readability.
   */
  DEFAULT_VALUE: string;
}

type PromisifyReturn<T> = T extends (
  cb: (err: Error, result: infer R) => void
) => void
  ? R
  : void;

type ExtractArguments<T> = T extends [...infer A, unknown] ? A : [];

type Promisify<T> = T extends (...args: infer A) => unknown
  ? (...args: ExtractArguments<A>) => Promise<PromisifyReturn<T>>
  : T;

type RegistryPromise = {
  [K in keyof IRegistry]: IRegistry[K] extends (...args: infer A) => unknown
    ? Promisify<IRegistry[K]>
    : IRegistry[K];
};

interface RegistryStatic extends WinregStatic {
  new (options: Winreg.Options): RegistryPromise;
}

export const Registry: RegistryStatic;
