import { useState, useCallback, useRef } from 'react';
import ConfirmDialog from './ConfirmDialog';

/**
 * Await-able replacement for window.confirm().
 *
 *   const { confirm, dialog } = useConfirm();
 *
 *   async function remove(id) {
 *     if (!(await confirm({ title: 'Delete this post?' }))) return;
 *     …
 *   }
 *
 *   return (<div>…{dialog}</div>);   // render the dialog once, anywhere in the page
 */
export function useConfirm() {
  const [state, setState] = useState({ open: false, opts: {} });
  const resolver = useRef(null);

  const confirm = useCallback((opts = {}) => {
    setState({ open: true, opts });
    return new Promise((resolve) => { resolver.current = resolve; });
  }, []);

  const close = useCallback((result) => {
    setState({ open: false, opts: {} });
    if (resolver.current) {
      resolver.current(result);
      resolver.current = null;
    }
  }, []);

  const dialog = (
    <ConfirmDialog
      open={state.open}
      {...state.opts}
      onConfirm={() => close(true)}
      onCancel={() => close(false)}
    />
  );

  return { confirm, dialog };
}
