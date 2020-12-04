/* eslint-disable @typescript-eslint/ban-types */

export SplitTypes<T, U> = U extends T ? U : Exclude<T, U>;
export SplitUndefined<T> = SplitTypes<T, undefined>;

export ContextOf<ContextType> = ContextType extends undefined ? {}
  : {
    /**
       * Custom user-defined data, read/writable
       */
    context: ContextType;
  };
